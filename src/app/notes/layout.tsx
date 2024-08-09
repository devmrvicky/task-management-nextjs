import React from 'react'

const NoteLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <section className="p-5 overflow-auto ml-[250px] max-[700px]:items-center max-[700px]:ml-0 max-[800px]:ml-[180px] mt-20 max-[700px]:pb-20">
      {children}
    </section>
  )
}

export default NoteLayout
