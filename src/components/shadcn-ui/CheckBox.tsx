"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Todo } from "./DialogBox"
import { updateData } from "@/indexDB/indexDB"
import { useState } from "react"

export function CheckBoxList({todo}: Todo) {
  const [checked, setChecked] = useState(todo?.isCompleted)
  const handleCheckChange = async (e) => {
    await updateData({data: {...todo, isCompleted: e}, storeName: "todos"})
    setChecked(e)
  }
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={todo?.id} onCheckedChange={handleCheckChange} checked={checked}/>
      <label
        htmlFor={todo?.id}
        className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${checked && "line-through"}`}
      >
        {todo?.todo}
      </label>
    </div>
  )
}
