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
import { useTodoContext } from "../../context/TodoContext"
import DeleteButton from "../DeleteButton"

export function PopoverDemo({children, todoCardId, todoIds, className}: Readonly<{children: React.ReactNode, className?: string, todoCardId: string, todoIds: Array<string>}>) {
  return (
    <Popover>
      <PopoverTrigger asChild className="ml-auto">
        {children}
      </PopoverTrigger>
      <PopoverContent className={`${className}`}>
        <span className="text-sm text-zinc-600">Menu</span>
        <DeleteButton id={todoCardId} todoIds={todoIds} storeName="todo_cards"/>
      </PopoverContent>
    </Popover>
  )
}
