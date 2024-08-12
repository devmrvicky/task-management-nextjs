"use client"

import { useTodoContext } from '@/context/TodoContext';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react'
import { MagicCard } from './magicui/magic-card';
import { FcFolder } from 'react-icons/fc';
import { Input } from './ui/input';
import {updateData, getAllData} from "../indexDB/indexDB"

const CreateFolderInput = ({parentFolderId}: {parentFolderId?: string}): JSX.Element => {
  const [folderId, setFolderId] = useState<string>("")
  const [folderName, setFolderName] = useState<string>("")
  const { theme } = useTheme();

  const {createFolder, setCreateFolder, addFolder, setFolders} = useTodoContext()
  
  const color = theme === "dark" ? "#262626" : "#D9D9D955"

  const handleCreateFolder = async () => {
    if(!folderName) return;
    let id = folderId;
    if(!id){
      id = String(Date.now());
      setFolderId(id);
    }
    const folderData: Folder = {
      id,
      folderName,
      createdAt: new Date(),
      parentFolderId: parentFolderId ? parentFolderId : "",
      slug: folderName.split(" ").join("-") + "-" + id
    }
    await updateData({data: folderData, storeName: "folders"})
    addFolder(folderData)
  }
  
  const handleInputBlur = async () => {
    if(folderName){
      await handleCreateFolder()
    }
    const folders = await getAllData({storeName: 'folders'})
    setFolders(folders)
    setCreateFolder(false)
    setFolderName("")
    setFolderId("")
  }

  useEffect(() => {
    let timeoutId;

    if(timeoutId){
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(async () => {
      await handleCreateFolder()
    }, 500)

    return () => {
      clearTimeout(timeoutId)
    }
  },[folderName])

  useEffect(() => {
    return () => {
      console.log('input closed')
      setFolderName("")
      setFolderId("")
    }
  }, [])

  return (<>
    {createFolder && <MagicCard
      className="cursor-pointer flex flex-row shadow-md whitespace-nowrap overflow-hidden p-3 h-[82px] w-full"
      gradientColor={color}
    
    >
      <form className="flex gap-2 w-full h-full items-center" onSubmit={e => {
        e.preventDefault()
        handleInputBlur()
      }}>
        <FcFolder className="w-[70px] h-[70px]"/>
        <Input autoFocus className='w-full h-10 focus-visible:ring-0' onBlur={handleInputBlur} value={folderName} onChange={e => setFolderName(e.target.value)}/>
      </form>
    </MagicCard>}</>
  )
}

export default CreateFolderInput
