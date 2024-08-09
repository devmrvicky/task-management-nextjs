"use client"
import Image from 'next/image'
import { useTheme } from 'next-themes'
import sunImg from "../../public/sun.png"
import moonImg from "../../public/moon.png"
import { useEffect } from 'react'

const ThemeButton = () => {
  const {theme, setTheme} = useTheme()
  
  useEffect(() => {
    if(!theme) return;
    document.querySelector("html")?.setAttribute("data-theme", theme)
    document.querySelector("html")?.setAttribute("class", theme)

  }, [theme])
  return (
    <button type='button' title={theme} onClick={() => setTheme(theme === 'dark' ? "light" : "dark")}>
      <div className='w-8 h-8'>
        <Image src={sunImg} alt="sun" className='dark:hidden w-full h-full'/>
        <Image src={moonImg} alt="moon" className='dark:block hidden w-full h-full'/>
      </div>
    </button>
  )
}

export default ThemeButton
