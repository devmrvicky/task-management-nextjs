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

  type storeName = 'todos' | "todo_cards" | "notes"

  type Data  = {
    id: string,
    todo?: string,
    todoCardId?: string,
    isCompleted?: boolean,
    todoCardTitle?: string,
    createdAt?: Date
  } | Note

  interface Note {
    id: string,
    title?: string,
    body?: string,
    isNew?: boolean,
    createdAt: Date,
  }
}