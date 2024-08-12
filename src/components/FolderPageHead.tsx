"use client"

import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { useParams } from 'next/navigation'
import React from 'react'
import BackButton from './BackButton'
import FolderCreateButton from './FolderCreateButton'

const FolderPageHead = () => {
  const {folder: slug}: {folder?: string} = useParams<Params>()

  return (
    <header className='flex items-center gap-1 pb-2'>
        <BackButton/>
        <p>{slug}</p>
        <div className="ml-auto">
          <FolderCreateButton/>
        </div>
      </header>
  )
}

export default FolderPageHead
