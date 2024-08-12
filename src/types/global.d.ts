import { CheckedState } from "@radix-ui/react-checkbox"

export {}

declare global {
  interface Todo {
    id: string,
    todo: string,
    todoCardId: string,
    isCompleted: boolean,
  }

  interface TodoCard {
    id: string,
    todoCardTitle?: string,
    createdAt: Date
  }

  type storeName = 'todos' | "todo_cards" | "notes" | "folders"

  type Data  = {
    id: string,
    todo?: string,
    todoCardId?: string,
    isCompleted?: boolean | CheckedState,
    todoCardTitle?: string,
    createdAt?: Date
  } | Note | Folder

  interface Note {
    id: string,
    title?: string,
    body?: string,
    isNew?: boolean,
    createdAt: Date,
    parentFolderId?: string,
    slug: string
  }

  interface Folder {
    id: string,
    folderName: string,
    createdAt: Date,
    parentFolderId?: string,
    slug: string
  }

  interface combineData {
    id: string,
    title?: string,
    body?: string,
    isNew?: boolean,
    folderName?: string,
    createdAt: Date,
    parentFolderId?: string,
    slug: string
  }
}