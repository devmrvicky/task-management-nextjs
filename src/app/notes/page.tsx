import { NoteEditor } from '@/components/NoteEditor'
import Notes from '@/components/Notes'
import WriteButton from '@/components/WriteButton'
import React from 'react'
import FolderCreateButton from "@/components/FolderCreateButton"

const page = () => {
  return (
    <>
      <div className='flex items-center justify-between pb-5'>
        <h2 className="text-2xl text-zinc-700 dark:text-zinc-200 font-semibold">Notes</h2>
        <FolderCreateButton/>
      </div>
      {/* <CreateFolderInput/> */}
      <Notes/>
      <div className="fixed bottom-4 right-4 z-30 max-[700px]:bottom-[95px]">
        <NoteEditor>
          <WriteButton/>
        </NoteEditor>
      </div>
    </>
  )
}

export default page
