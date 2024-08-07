"use client"

import BackButton from '@/components/BackButton'
import DeleteButton from '@/components/DeleteButton'
import { NoteEditor } from '@/components/NoteEditor'
import { ComboboxDemo } from '@/components/shadcn-ui/ComboBox'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useTodoContext } from '@/context/TodoContext'
import { FullscreenIcon, Pen, PencilIcon } from 'lucide-react'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { MdCloseFullscreen } from 'react-icons/md'
import Markdown from 'markdown-to-jsx'

const page = () => {
  const [fullScreen, setFullScreen] = useState<boolean>(false)
  const [note, setNote] = useState<Note>()
  const {note: noteTitle} = useParams<Params>()
  const {notes} = useTodoContext()

  useEffect(() => {
    if(!noteTitle) return;
    const note =  notes.find((note: Note) =>  note.title === noteTitle.split("-").join(" "))
    if(!note) return;
    setNote(note)
  }, [noteTitle, notes.length, note?.title, note?.body])

  return (
    <div className={`dark:bg-zinc-950 bg-zinc-100 p-2 rounded-md ${fullScreen && "w-full h-full fixed top-0 left-0 z-30 overflow-auto"}`}>
      <header className='flex items-center gap-1 pb-2'>
        <BackButton/>
        {/* <h1>{note?.title}</h1> */}
        <ComboboxDemo title={note?.title}/>
        <div className="ml-auto max-[950px]:hidden">
        <NoteMenuOptions fullScreen={fullScreen} setFullScreen={setFullScreen} note={note} withText={false}/>
        </div>
        <Popover>
      <PopoverTrigger asChild className="ml-auto min-[950px]:hidden">
        <Button variant="ghost">
          <HiOutlineDotsVertical className="w-5 h-5"/>
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`right-[-3px] absolute top-[-35px] w-[180px]`}>
        <span className="text-sm text-zinc-600">Menu</span>
        <NoteMenuOptions fullScreen={fullScreen} setFullScreen={setFullScreen} note={note} withText={true}/>
      </PopoverContent>
    </Popover>
      </header>
      <div className='max-w-[900px] w-full mx-auto'>
        {note?.body && <Markdown key={note.body}>
          {note.body}
        </Markdown>}
      </div>
    </div>
  )
}

const NoteMenuOptions = ({fullScreen, setFullScreen, note, withText}: {fullScreen: boolean, setFullScreen: React.Dispatch<React.SetStateAction<boolean>>, note: Note | undefined, withText: boolean})=>{
  return (
    <div className={`button-options flex ${withText ? "flex-col gap-2" : "flex-row"} items-center gap-1"`}>
          <Button variant="ghost" type='button' title={!fullScreen ? "full screen" : "minimize" }
          onClick={()=>setFullScreen(prev => !prev)}
           className='flex items-center gap-2 w-full justify-start'
          >
            {fullScreen ? <FullscreenIcon className='w-4 h-4'/> : <MdCloseFullscreen className='w-4 h-4'/>}
            {withText && <span>{fullScreen ? "minimize" : "full screen"}</span>}
          </Button>
          <NoteEditor prevNote={note}>
            <Button variant="ghost" className='flex items-center gap-2 w-full justify-start'>
              <PencilIcon className='w-4 h-4'/>
              {withText && <span>Edit</span>}
            </Button>
          </NoteEditor>
          {note && <DeleteButton id={note?.id} storeName='notes'/>}
        </div>
  )
}

export default page
