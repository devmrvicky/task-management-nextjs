"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTodoContext } from "@/context/TodoContext"
import { useRouter } from "next/navigation"

export function ComboboxDemo({title} : {title?: string}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string>("")
  const {notes} = useTodoContext()
  const {push} = useRouter()
  const handleOpenNote = (currentValue: string) => {
    setValue(currentValue === value?.split(" ").join("-") ? "" : currentValue)
    setOpen(false)
    push(currentValue)
  }
  React.useEffect(() => {
    if(title){
      setValue(title?.split(" ").join("-"))
    }
  }, [title])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex-1 text-left justify-between h-auto text-wrap"
        >
          {value
            ? notes.find((note) => note.title?.split(" ").join("-") === value)?.title
            : "Select note..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full text-wrap p-0">
        <Command>
          <CommandInput placeholder="Search note..." />
          <CommandList>
            <CommandEmpty>No note found.</CommandEmpty>
            <CommandGroup>
              {notes.map((note) => (
                <CommandItem
                  key={note.title}
                  value={note.title?.split(" ").join("-")}
                  onSelect={handleOpenNote}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === note.title?.split(" ").join("-") ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {note.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
