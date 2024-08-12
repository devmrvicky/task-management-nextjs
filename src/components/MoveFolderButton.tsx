import React, { useState } from 'react'
import { Button } from './ui/button'
import { VscLoading } from 'react-icons/vsc'
import { MoveRight } from 'lucide-react'
import { useTodoContext } from '@/context/TodoContext'
import { updateData } from '@/indexDB/indexDB'
import { MagicCard } from './magicui/magic-card'
import { useTheme } from 'next-themes'
import { FcFolder } from 'react-icons/fc'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'

const MoveFolderButton = ({targetItem, storeName, parentFolderId}: {targetItem: Note | Folder, storeName: storeName, parentFolderId?: string}) => {
  const [moving, setMoving] = useState<boolean>(false)
  const { folders, removeFolder, removeNote } = useTodoContext()

  const targetFolders = folders.filter(folder => ![targetItem.id, parentFolderId].includes(folder.id))

  const { theme } = useTheme();
  
  const color = theme === "dark" ? "#262626" : "#D9D9D955"

  const handleMoveFolder = async (folderId: string) => {
    try {
      setMoving(true)
      if(!folderId) return;
      await updateData({data: {...targetItem, parentFolderId: folderId ? folderId : ""}, storeName})
      if(storeName === "folders"){
        removeFolder(targetItem.id)
      } else {
        removeNote(targetItem.id)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setMoving(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className='flex gap-2 w-full justify-start' disabled={moving} >
          {moving ? <VscLoading className="animate-spin w-4 h-4"/> : <MoveRight className="w-4 h-4"/>}
          <span className="text-xs">Move</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[500px] overflow-auto space-y-0">
        <DialogHeader>
          <DialogTitle>move item to ...</DialogTitle>
        </DialogHeader>
        {targetFolders.map(folder => (
          <MagicCard
            className="cursor-pointer flex flex-row shadow-md whitespace-nowrap overflow-hidden p-3 h-[82px] w-full"
            gradientColor={color}
            contentClassName='w-full flex'
          >
          <div className="flex gap-2 w-full h-full items-center" onClick={() => handleMoveFolder(folder.id)} >
          <FcFolder className="w-[70px] h-[70px] shrink-0"/>
          <div className='flex flex-col'>
            {folder && <p className='w-full text-xl'>{folder.folderName}</p>}
          </div>
        </div>
        </MagicCard>
        ))}
      </DialogContent>
    </Dialog>
  )
}

export default MoveFolderButton
