"use client"

import Image from 'next/image'
import textPng from "../../public/text.png"
import { MagicCard } from './magicui/magic-card'
import { useTheme } from 'next-themes';
import { useTodoContext } from '@/context/TodoContext';
import { useRouter } from 'next/navigation';
import Markdown from 'markdown-to-jsx';
import Folder from './Folder';
import CreateFolderInput from './CreateFolderInput';

const Notes = ({parentFolderId}: {parentFolderId?: string}): JSX.Element => {
  const { theme } = useTheme();

  const {notes, folders,} = useTodoContext()
  const combineData: combineData[] = [...notes, ...folders].filter(data => parentFolderId ? data.parentFolderId === parentFolderId : !data.parentFolderId)
  
  const color = theme === "dark" ? "#262626" : "#D9D9D955"

  const {push} = useRouter()

  const handleOpenNote = (note: Note) => {
    if(parentFolderId){
      const slug = folders.find(folder => folder.id === parentFolderId)?.slug
      push(`/notes/folder/${slug}/${note.slug}`)
    } else{
      push(`/notes/${note.slug}`)
    }
  }

  return (
    <div className='w-full border flex flex-col gap-2 max-[700px]:pb-20'>
      <CreateFolderInput parentFolderId={parentFolderId}/>
      {combineData.map(note => (
        note.folderName ? <Folder folder={note} totalInsideItems={[...notes, ...folders].filter(data => data.parentFolderId === note.id)}/>  :(
        <MagicCard 
          key={note.id}
          className="cursor-pointer flex flex-row shadow-md whitespace-nowrap overflow-hidden p-3 h-[82px]"
          gradientColor={color}
      
      >
        <div className='w-full h-full flex gap-2 overflow-hidden max-[500px]:text-[0.8rem]'
        onClick={() => handleOpenNote(note)}>
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
      </MagicCard>)))}
    </div>
  )
}

export default Notes
