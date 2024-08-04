import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import penPng from "../../public/pen.png"

const WriteButton = () => {
  return (
    <Button variant="ghost" className='rounded-full bg-white dark:bg-zinc-950 w-14 h-14 p-0 shadow-md'>
      <Image src={penPng} alt='pen' className='w-10 h-auto active:scale-75 transition-all'/>
    </Button>
  )
}

export default WriteButton
