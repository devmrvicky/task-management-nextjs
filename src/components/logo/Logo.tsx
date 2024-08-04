import Image from "next/image"
import logoPng from "../../../public/logo.png"

const Logo = (): JSX.Element => {
  return (
    <div className="flex items-center gap-2">
      <div className="logo-img w-10 h-auto">
        <Image src={logoPng} alt="logo" className="w-full h-full"/>
      </div>
      <p className="text-xl font-semibold dark:text-zinc-200 text-zinc-800">Manage tasks</p>
    </div>
  )
}

export default Logo
