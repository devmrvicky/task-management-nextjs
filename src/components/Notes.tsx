"use client"

import Image from 'next/image'
import textPng from "../../public/text.png"
import { MagicCard } from './magicui/magic-card'
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { getAllData } from '@/indexDB/indexDB';
import { useTodoContext } from '@/context/TodoContext';
import { useRouter } from 'next/navigation';
import Markdown from 'markdown-to-jsx';

const Notes = (): JSX.Element => {
  const [localNotes, setLocalNotes] = useState<Note[]>([])
  const { theme } = useTheme();

  const {notes} = useTodoContext()
  
  const color = theme === "dark" ? "#262626" : "#D9D9D955"

  const {push} = useRouter()
  // console.log(router)

  return (
    <div className='w-full border flex flex-col gap-2 max-[700px]:pb-20'>
      {notes.map(note => <MagicCard key={note.id}
      className="cursor-pointer flex flex-row shadow-md whitespace-nowrap overflow-hidden p-3 h-[82px]"
      gradientColor={color}
      
      >
        <div className='w-full h-full flex gap-2 overflow-hidden max-[500px]:text-[0.8rem]'
        onClick={() => {push(`/notes/${note.title?.split(" ").join("-")}`)}}>
          <div className='w-12 h-auto'>
            <Image src={textPng} alt="note" className='w-full h-full'/>
          </div>
          <div className='flex flex-col gap-2 text-ellipsis whitespace-nowrap'>
            <div className="note-head flex items-center gap-1">
              <h3 className='text-xl font-[600] max-[500px]:text-[1rem]'>{note.title}</h3>
              <span>.</span>
              <span className='text-zinc-400 text-sm'>{note.createdAt.getFullYear()}</span>
            </div>
            {/* <p className='text-sm text-zinc-600'>{note.body}</p> */}
            {note.body && <Markdown key={note.body}>
              {note.body}
            </Markdown>}
          </div>
        </div>
      </MagicCard>)}
    </div>
  )
}

export default Notes
