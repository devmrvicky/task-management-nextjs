"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { updateData } from "@/indexDB/indexDB"
import { CheckedState } from "@radix-ui/react-checkbox"
import { useState } from "react"

export function CheckBoxList({todo}: {todo: Todo}) {
  const [checked, setChecked] = useState<CheckedState>(todo?.isCompleted)
  const handleCheckChange = async (checked: CheckedState): Promise<void> => {
    await updateData({data: {...todo, isCompleted: checked}, storeName: "todos"})
    setChecked(checked)
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
