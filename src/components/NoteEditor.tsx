"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ReactNode, Suspense, useEffect, useRef, useState } from "react"
import {getAllData, updateData} from "../indexDB/indexDB"
import { ForwardRefEditor } from "./markdown/ForwardRefEditor"
import { type MDXEditorMethods } from "@mdxeditor/editor"
import { useTodoContext } from "@/context/TodoContext"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useParams } from "next/navigation"
import { Params } from "next/dist/shared/lib/router/utils/route-matcher"

export function NoteEditor({children, prevNote}: Readonly<{children: ReactNode, prevNote?: Note}>) {
  const [modelClose, setModelClose] = useState<boolean>(false)
  const [noteTitleValue, setNoteTitleValue] = useState<string>("")
  const [noteBodyValue, setNoteBodyValue] = useState<string>("")
  const [noteId, setNoteId] = useState<string>("")
  const mdxEditorRef = useRef<MDXEditorMethods>(null)

  const {setNotes} = useTodoContext()
  const {folder: folderSlug}: {folder?: string} = useParams<Params>()

  const handleSaveAndUpdateNote = async (): Promise<void> => {
      if(!noteTitleValue && !noteBodyValue) return
      let id: string = noteId;
      if(!noteId) {
        id = String(Date.now());
        setNoteId(id)
      }
      const data: Note = {
        id,
        title: noteTitleValue,
        body: noteBodyValue,
        isNew: true,
        createdAt: new Date(),
        slug: noteTitleValue.split(" ").join("-") + "-" + id,
        parentFolderId: folderSlug ? folderSlug.split("-").at(-1) : "",
      }
      await updateData({
        data,
        storeName: "notes"
      })
    }
  

  const handleOpenChangeDialog = async (open: boolean) => {
    setModelClose(open)
    if(!open){
      setNoteTitleValue("")
      setNoteBodyValue("")
      setNoteId("")
      const notes = await getAllData({storeName: 'notes'})
      setNotes(notes)
    }
  }

  useEffect(() => {
    let timeoutId;

    if(timeoutId){
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(async () => {
      await handleSaveAndUpdateNote()
      // console.log({noteTitleValue, noteBodyValue})
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  },[noteBodyValue, noteTitleValue, handleSaveAndUpdateNote])

  useEffect(() => {
    if(!prevNote) return;
    setNoteTitleValue(prevNote.title ? prevNote.title : "")
    setNoteBodyValue(prevNote.body ? prevNote.body : "")
    setNoteId(prevNote.id)
  }, [prevNote, modelClose])

  return (
    <Dialog onOpenChange={handleOpenChangeDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[500px] overflow-auto space-y-0">
        <DialogHeader className="space-y-0">
          <DialogTitle className="hidden">"note editor"</DialogTitle>
          <div className="border-b">
            <Input type="text" placeholder="todo title" className="p-0 border-none border-b outline-none focus:outline-none focus-visible:ring-0 focus-visible:outline-none focus-visible:ring-offset-0 text-[1.2rem]"
            value={noteTitleValue}
            onChange={e => setNoteTitleValue(e.target.value)}
            />
          </div>
        </DialogHeader>
          <div className="border h-[500px]">
            <Suspense fallback={"loading..."}>
              <ForwardRefEditor markdown={noteBodyValue} ref={mdxEditorRef} onChange={(markdown: string) => setNoteBodyValue(markdown)}/>
            </Suspense>
        </div>
      </DialogContent>
    </Dialog>
  )
}
