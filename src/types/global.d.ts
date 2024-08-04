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

  interface Data {
    id: string,
    todo?: string,
    todoCardId?: string,
    isCompleted?: boolean,
    todoCardTitle?: string,
    createdAt?: Date
  }
}