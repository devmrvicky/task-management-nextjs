"use client"
import { useContext, createContext, useState } from "react";

interface TodoContextType {
  todoCards: TodoCard[];
  todos: Todo[];
  setTodoCards: React.Dispatch<React.SetStateAction<TodoCard[]>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (todo: Todo) => void;
  addTodoCard: (todoCard: TodoCard) => void;
  removeTodoCard: (id: string) => void; // Changed to string
}

const TodoContext = createContext<TodoContextType | undefined>(undefined)

const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoContextProvider");
  }
  return context;
};

const TodoContextProvider = ({children}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element => {
  const [todoCards, setTodoCards] = useState<TodoCard[]>([])
  const [todos, setTodos] = useState<Todo[]>([])
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