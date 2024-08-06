"use client"

import Image from 'next/image'
import textPng from "../../public/text.png"
import { MagicCard } from './magicui/magic-card'
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { getAllData } from '@/indexDB/indexDB';
import { useTodoContext } from '@/context/TodoContext';

const Notes = (): JSX.Element => {
  const [localNotes, setLocalNotes] = useState<Note[]>([])
  const { theme } = useTheme();

  const {notes} = useTodoContext()
  
  const color = theme === "dark" ? "#262626" : "#D9D9D955"

  // useEffect(() => {
  //   (async () => {
  //     const notes = await getAllData({storeName: 'notes'})
  //     setLocalNotes(notes)
  //   })()
  // }, [notes.length])

  return (
    <div className='w-full border  flex flex-col gap-2'>
      {notes.map(note => <MagicCard key={note.id}
      className="cursor-pointer flex flex-row shadow-md whitespace-nowrap overflow-hidden p-3 h-full"
      gradientColor={color}
      >
        <div className='w-full h-full flex gap-2'>
          <div className='w-12 h-auto'>
            <Image src={textPng} alt="note" className='w-full h-full'/>
          </div>
          <div>
            <div className="note-head flex items-center gap-2">
              <h3 className='text-xl font-medium'>{note.title}</h3>
              <span className='text-zinc-700 text-sm'>{note.createdAt.getFullYear()}</span>
            </div>
            <p className='text-sm'>{note.body}</p>
          </div>
        </div>
      </MagicCard>)}
    </div>
  )
}

export default Notes
