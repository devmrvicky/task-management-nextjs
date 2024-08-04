"use client"
import { useContext, createContext, useState, useEffect } from "react";
import { Todo, TodoCard } from "../shadcn-ui/DialogBox";

const TodoContext = createContext({})

const useTodoContext = () => useContext(TodoContext)

const TodoContextProvider = ({children}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [todoCards, setTodoCards] = useState([])
  const [todos, setTodos] = useState([])
  const addTodo = (todo: Todo) => {
    setTodos(prev => [todo, ...prev])
  }
  const addTodoCard = (todoCard: TodoCard) => {
    setTodoCards(prev => [todoCard, ...prev])
  }
  const removeTodoCard = (id: String) => {
    setTodoCards(prev => prev.filter((card: TodoCard) => card.id !== id))
  }
  return (
    <TodoContext.Provider value={{todoCards, todos, setTodoCards, setTodos, addTodo, addTodoCard, removeTodoCard}}>
      {children}
    </TodoContext.Provider>
  )
}

export {TodoContextProvider, useTodoContext}