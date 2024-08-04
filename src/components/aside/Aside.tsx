'use client'
import Image, { StaticImageData } from 'next/image'
import todoImg from "../../../public/todo.png"
import noteImg from "../../../public/note.png"
import homeImg from "../../../public/home.ico"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface menu {
  path: string,
  img: StaticImageData,
  name: string
}

const Aside: React.FC = () => {

  const pathname = usePathname()
  
  const menus: menu[] = [
    {
      path: "/",
      img: homeImg,
      name: 'Home',
    },
    {
      path: "/todos",
      img: todoImg,
      name: 'Todos'
    },
    {
      path: "/notes",
      img: noteImg,
      name: 'Notes'
    },
  ]

  return (
    <aside className='w-[250px] max-[800px]:w-[180px] h-full dark:bg-zinc-950 bg-zinc-100 shadow-md p-2 fixed z-20 mt-20 max-[500px]:h-16 max-[500px]:bottom-2 max-[500px]:w-[90%] max-[500px]:left-1/2 max-[500px]:-translate-x-1/2 max-[500px]:mx-auto max-[500px]:rounded-full max-[500px]:items-center max-[500px]:justify-center max-[500px]:mt-0'>
      <ul className="flex flex-col gap-2 max-[400px]:gap-4 w-full h-full flex-1 overflow-auto my-5 max-[500px]:flex-row max-[500px]:my-0 max-[500px]:items-center max-[500px]:justify-center">
        
        {menus.map(menu => (
          <li key={menu.name}>
          <Link href={menu.path} className={`w-full h-10 max-[400px]:w-12 max-[400px]:h-12 dark:active:bg-zinc-800 active:bg-zinc-300 dark:hover:bg-zinc-600 hover:bg-zinc-200  dark:text-zinc-300 text-zinc-600 flex gap-2 items-center px-3 rounded-sm cursor-pointer  max-[500px]:rounded-full ${pathname === menu.path ? "bg-zinc-200 dark:bg-zinc-600" : "dark:bg-slate-50/10 bg-slate-300/30"}`}>
          <Image src={menu.img} alt={menu.name} className="w-5 max-[400px]:w-7 h-auto"/>
          <span className="max-[400px]:hidden">{menu.name}</span>
        </Link>
        </li>
        ))}
        
      </ul>
    </aside>
  )
}

export default Aside
