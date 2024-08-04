import React from 'react'
import Logo from '../logo/Logo'
import { UserProfile } from '../shadcn-ui/UserProfile'
import ThemeButton from '../ThemeButton'

const Nav = (): JSX.Element => {
  return (
    <nav className='dark:bg-zinc-950 bg-zinc-100 shadow-md min-h-20 px-3 flex items-center fixed w-full z-30 max-[500px]:min-h-16'>
      <Logo/>
      <div className="ml-auto flex items-center gap-3">
        <ThemeButton/>
        <UserProfile/>
      </div>
    </nav>
  )
}

export default Nav
