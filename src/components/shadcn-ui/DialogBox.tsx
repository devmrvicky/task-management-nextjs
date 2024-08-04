"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEvent, ReactNode, useEffect, useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { CheckBoxList } from "./CheckBox"
import {updateData} from "../../indexDB/indexDB"
import { useTodoContext } from "../context/TodoContext"

export interface TodoCard {
  id: String,
  todoCardTitle?: String,
  createdAt: Date
}

export interface Todo {
  id: String,
  todo: String,
  todoCardId: String,
  isCompleted: Boolean,
}


export function DialogBox({children}: Readonly<{children: ReactNode}>) {
  const [localTodos, setLocalTodos] = useState([])
  const [todoValue, setTodoValue] = useState("")
  const [todoTitleValue, setTodoTitleValue] = useState("")
  const [cardId, setCardId] = useState("")

  const {addTodoCard, todos, addTodo, setTodos } = useTodoContext()

  const handleAddTodo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!todoValue) return;
    let id = cardId;
    if(!cardId){
      id = String(Date.now())
      setCardId(id)
      const data: TodoCard = {todoCardTitle: todoTitleValue, id, createdAt: new Date()}
      await updateData({data, storeName: "todo_cards"})
      addTodoCard(data)
    }
    const data: Todo = {id: String(Date.now()), todo: todoValue, todoCardId: id, isCompleted: false}
    await updateData({data, storeName: "todos"})
    setLocalTodos(prev => [data, ...prev])
    setTodoValue("")
  }

  const handleSaveTodoCard = async () => {
    if(todoTitleValue){
      if(cardId) return
      const id = String(Date.now())
      setCardId(id)
      const data: TodoCard = {todoCardTitle: todoTitleValue, id, createdAt: new Date()}
      await updateData({data, storeName: "todo_cards"})
      addTodoCard(data)
    } else {
      console.log('Todo title is not set.')
    }
  }

  const handleOpenChangeDialog = (e) => {
    if(e) {
setTodos([])
      setLocalTodos([])
    }
if(!e) {
  setTodos(localTodos)
  setCardId("")
  setTodoTitleValue("")
}
// addTodo
  }

  useEffect(() => {
    return () => {
      console.log('dialog closed')
    }
  }, [])

  return (
    <Dialog onOpenChange={handleOpenChangeDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[500px] overflow-auto space-y-0">
        <DialogHeader className="space-y-0">
          <div className="border-b">
            <Input type="text" placeholder="todo title" className="p-0 border-none border-b outline-none focus:outline-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 text-[1.2rem]"
            value={todoTitleValue}
            onChange={e => setTodoTitleValue(e.target.value)}
            onBlur={handleSaveTodoCard}
            />
          </div>
        </DialogHeader>
        <div className="grid gap-4">
          <form className="flex items-center gap-4 border-b" onSubmit={handleAddTodo}>
            <Label htmlFor="name">
              <Checkbox/>
            </Label>
            <Input
              id="name"
              placeholder="I have to attain this meeting"
              className="p-0 border-none border-b outline-none focus:outline-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0"
              value={todoValue}
              onChange={(e) => setTodoValue(e.target.value)}
            />
          </form>
          {/* created todo list */}
          <div className="flex flex-col h-full flex-1 gap-3 overflow-auto">

          {localTodos.map((todo: Todo) => <CheckBoxList key={todo.id} todo={todo}/>)}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
