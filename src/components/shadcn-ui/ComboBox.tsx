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

export function ComboboxDemo({title, slug, filteredNotes} : {title?: string, slug: string, filteredNotes: Note[]}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState<string>("")
  // const {notes} = useTodoContext()
  // const filteredNotes: Note[] = notes.filter(note => note.parentFolderId === folderSlug?.split("-").at(-1))
  const {push} = useRouter()
  const handleOpenNote = (currentValue: string) => {
    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)
    push(currentValue)
  }
  React.useEffect(() => {
    if(slug){
      setValue(slug)
    }
  }, [slug])

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
            ? filteredNotes.find((note) => note.slug === value)?.title
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
              {filteredNotes.map((note) => (
                <CommandItem
                  key={note.title}
                  value={note.slug}
                  onSelect={handleOpenNote}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === note.slug ? "opacity-100" : "opacity-0"
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
