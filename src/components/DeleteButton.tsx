import React, { useState } from 'react'
import { Button } from './ui/button'
import { VscLoading, VscTrash } from 'react-icons/vsc'
import { deleteData } from '@/indexDB/indexDB'
import { useTodoContext } from '@/context/TodoContext'
import { HiOutlineTrash } from 'react-icons/hi'
import { useRouter } from 'next/navigation'

const DeleteButton = ({id, storeName, todoIds,nestedIds}: {id: string, storeName: storeName, todoIds?: string[], nestedIds?: string[]}): JSX.Element => {
  const [deleting, setDeleting] = useState<boolean>(false)
  const {removeNote, removeTodoCard, removeFolder} = useTodoContext()
  const {push} = useRouter()
  const handleDelete = async (): Promise<void> => {
    try {
      setDeleting(true)
      await deleteData({id, storeName})
      if(todoIds){
        for(let id of todoIds){
          await deleteData({id, storeName: "todos"})
        }
      }
      if(nestedIds){
        for(let id of nestedIds){
          await deleteData({id, storeName: "folders"})
          await deleteData({id, storeName: "notes"})
        }
      }
      if(storeName === "notes"){
        removeNote(id)
        push("/notes")
      } else if(storeName === 'todo_cards'){
        removeTodoCard(id)
      } else if(storeName === "folders"){
        removeFolder(id)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setDeleting(false)
    }
  }
  return (
    <Button variant="destructive" className='flex gap-2 w-full justify-start' disabled={deleting} onClick={handleDelete}>
      {deleting ? <VscLoading className="animate-spin w-4 h-4"/> : <HiOutlineTrash className="w-4 h-4"/>}
      <span className="text-xs">Delete</span>
    </Button>
  )
}

export default DeleteButton
