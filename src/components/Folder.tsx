import React from 'react'
import { MagicCard } from './magicui/magic-card'
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { FcFolder } from 'react-icons/fc';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { HiDotsVertical } from 'react-icons/hi';
import DeleteButton from './DeleteButton';
import MoveFolderButton from './MoveFolderButton';

const Folder = ({folder, totalInsideItems}: {folder?: combineData, totalInsideItems: combineData[]}): JSX.Element => {
  const { theme } = useTheme();
  
  const color = theme === "dark" ? "#262626" : "#D9D9D955"

  const {push} = useRouter()

  const handleOpenFolder = (): void => {
    push(`/notes/folder/${folder?.slug}`)
  }
  
  return (
    <MagicCard
        className="cursor-pointer flex flex-row shadow-md whitespace-nowrap overflow-hidden p-3 h-[82px] w-full"
        gradientColor={color}
        contentClassName='w-full flex'
      >
        <div className="flex gap-2 w-full h-full items-center" onClick={() => handleOpenFolder()}>
          <FcFolder className="w-[70px] h-[70px] shrink-0"/>
          <div className='flex flex-col'>
            {folder && <p className='w-full text-xl'>{folder.folderName}</p>}
            {Boolean(totalInsideItems.length) && <span className="text-xs text-zinc-500">items({totalInsideItems.length})</span>}
          </div>
        </div>
        <Popover>
          <PopoverTrigger>
            <button type="button" title='menu' className='ml-auto'>
              <HiDotsVertical className='w-4 h-4'/>
            </button>
          </PopoverTrigger>
          <PopoverContent className={`right-[-3px] absolute top-[-43px] w-[180px] flex flex-col gap-2`}>
            <span className='text-sm text-zinc-500 pb-3'>menus</span>
            {folder && <MoveFolderButton storeName='folders' targetItem={folder}/>}
            {folder && <DeleteButton id={folder.id} storeName="folders" nestedIds={totalInsideItems?.map(item => item.id)}/>}
          </PopoverContent>
        </Popover>
      </MagicCard>
  )
}

export default Folder
