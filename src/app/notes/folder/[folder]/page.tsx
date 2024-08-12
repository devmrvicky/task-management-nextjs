import { NoteEditor } from '@/components/NoteEditor'
import Notes from '@/components/Notes'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import penPng from "../../../../../public/pen.png"
import FolderPageHead from '@/components/FolderPageHead'

const page = () => {
  return (
    <div>
      <FolderPageHead/>
      <Notes/>
      <div className="fixed bottom-4 right-4 z-30 max-[700px]:bottom-[95px]">
        <NoteEditor>
        <Button variant="ghost" className='rounded-full bg-white dark:bg-zinc-950 w-14 h-14 p-0 shadow-md'>
      <Image src={penPng} alt='pen' className='w-10 h-auto active:scale-75 transition-all'/>
    </Button>
        </NoteEditor>
      </div>
    </div>
  )
}

export default page
