"use client"
import { getAllData } from "@/indexDB/indexDB";
import React, { useContext, createContext, useState, useEffect } from "react";

interface TodoContextType {
  todoCards: TodoCard[];
  todos: Todo[];
  setTodoCards: React.Dispatch<React.SetStateAction<TodoCard[]>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  addTodo: (todo: Todo) => void;
  addTodoCard: (todoCard: TodoCard) => void;
  removeTodoCard: (id: string) => void; // Changed to string
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  notes: Note[],
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  createFolder: boolean;
  setCreateFolder: React.Dispatch<React.SetStateAction<boolean>>;
  folders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  addFolder: (newFolder: Folder) => void;
  removeFolder: (id: string) => void
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
  const [createFolder, setCreateFolder] = useState<boolean>(false)
  const [folders, setFolders] = useState<Folder[]>([])

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

  const removeNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id))
  }

  const addFolder = (newFolder: Folder) => {
    setFolders(folders.map(folder => folder.id === newFolder.id ? {...newFolder, ...folder} : folder))
  }

  const removeFolder = (id: string) => {
    setFolders(folders.filter(folder => folder.id !== id))
  }

  useEffect(() => {
    (async () => {
      const notes = await getAllData({storeName: 'notes'})
      setNotes(notes)
      const folders = await getAllData({storeName: 'folders'})
      console.log(folders)
      setFolders(folders)
    })()
  }, [])

  return (
    <TodoContext.Provider value={{todoCards, todos, setTodoCards, setTodos, addTodo, addTodoCard, removeTodoCard, addNote, removeNote, setNotes, notes, createFolder, setCreateFolder, folders, setFolders, addFolder, removeFolder}}>
      {children}
    </TodoContext.Provider>
  )
}

export {TodoContextProvider, useTodoContext}