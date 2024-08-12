"use client"
import BackButton from '@/components/BackButton'
import FolderCreateButton from '@/components/FolderCreateButton'
import { NoteEditor } from '@/components/NoteEditor'
import Notes from '@/components/Notes'
import { Button } from '@/components/ui/button'
import WriteButton from '@/components/WriteButton'
import { useTodoContext } from '@/context/TodoContext'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React from 'react'
import penPng from "../../../../../public/pen.png"

const page = () => {
  // const {folders, notes} = useTodoContext()
  const {folder: slug}: {folder?: string} = useParams<Params>()
  const folderId = slug?.split("-").at(-1)
  return (
    <div>
      <header className='flex items-center gap-1 pb-2'>
        <BackButton/>
        <p>{slug}</p>
        <div className="ml-auto">
          <FolderCreateButton/>
        </div>
      </header>
      <Notes parentFolderId={folderId}/>
      <div className="fixed bottom-4 right-4 z-30 max-[700px]:bottom-[95px]">
        <NoteEditor parentFolderId={folderId}>
        <Button variant="ghost" className='rounded-full bg-white dark:bg-zinc-950 w-14 h-14 p-0 shadow-md'>
      <Image src={penPng} alt='pen' className='w-10 h-auto active:scale-75 transition-all'/>
    </Button>
        </NoteEditor>
      </div>
    </div>
  )
}

export default page
