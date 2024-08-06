"use client"
import { getAllData } from "@/indexDB/indexDB";
import { useContext, createContext, useState, useEffect } from "react";

interface TodoContextType {
  todoCards: TodoCard[];
  todos: Todo[];
  setTodoCards: React.Dispatch<React.SetStateAction<TodoCard[]>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (todo: Todo) => void;
  addTodoCard: (todoCard: TodoCard) => void;
  removeTodoCard: (id: string) => void; // Changed to string
  addNote: (note: Note) => void;
  notes: Note[],
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
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
  const [notes, setNotes] = useState<Note[]>([])

  const addTodo = (todo: Todo) => {
    setTodos(prev => [todo, ...prev])
  }
  const addTodoCard = (todoCard: TodoCard) => {
    setTodoCards(prev => [todoCard, ...prev])
  }
  const removeTodoCard = (id: String) => {
    setTodoCards(prev => prev.filter((card: TodoCard) => card.id !== id))
  }

  const addNote = (newNote: Note) => {
    setNotes(notes.map(note => note.id === newNote.id ? {...newNote, ...note} : note))
  }

  useEffect(() => {
    (async () => {
      const notes = await getAllData({storeName: 'notes'})
      setNotes(notes)
    })()
  }, [])

  return (
    <TodoContext.Provider value={{todoCards, todos, setTodoCards, setTodos, addTodo, addTodoCard, removeTodoCard, addNote, setNotes, notes}}>
      {children}
    </TodoContext.Provider>
  )
}

export {TodoContextProvider, useTodoContext}