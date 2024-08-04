import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { deleteData } from "@/indexDB/indexDB"
import React, { useState } from "react"
import { HiOutlineTrash, HiTrash } from "react-icons/hi"
import { VscLoading } from "react-icons/vsc";
import { useTodoContext } from "../context/TodoContext"

export function PopoverDemo({children, todoCardId, todoIds, className}: Readonly<{children: React.ReactNode, className?: String, todoCardId: String, todoIds: Array<string>}>) {
  const [deleting, setDeleting] = useState(false)
  const {removeTodoCard} = useTodoContext()
  const handleDeleteTodoCard = async () => {
    try {
      setDeleting(true)
      await deleteData({id: todoCardId, storeName: "todo_cards"})
      for(let id of todoIds){
        await deleteData({id, storeName: "todos"})
      }
      removeTodoCard(todoCardId)
    } catch (error) {
      console.log(error)
    } finally {
      setDeleting(false)
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild className="ml-auto">
        {children}
      </PopoverTrigger>
      <PopoverContent className={`${className}`}>
        <span className="text-sm text-zinc-600">Menu</span>
        <Button variant="destructive" className="flex items-center gap-2 w-full justify-start" disabled={deleting} onClick={handleDeleteTodoCard}>
          {deleting ? <VscLoading className="animate-spin w-4 h-4"/> : <HiOutlineTrash className="w-4 h-4"/>}
          <span className="text-xs">Delete</span>
        </Button>
      </PopoverContent>
    </Popover>
  )
}
