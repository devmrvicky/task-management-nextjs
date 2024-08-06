import { NoteEditor } from '@/components/NoteEditor'
import Notes from '@/components/Notes'
import WriteButton from '@/components/WriteButton'
import React from 'react'

const page = () => {
  return (
    <section className="p-5 overflow-auto ml-[250px] max-[500px]:items-center max-[500px]:ml-0 max-[800px]:ml-[180px] mt-20">
      <h2 className="text-2xl text-zinc-700 dark:text-zinc-200 font-semibold pb-5">Notes</h2>
      <Notes/>
      <div className="fixed bottom-4 right-4 z-30 max-[500px]:bottom-[95px]">
        <NoteEditor>
          <WriteButton/>
        </NoteEditor>
      </div>
    </section>
  )
}

export default page
