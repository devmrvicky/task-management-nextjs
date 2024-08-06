"use client"
import { useTheme } from "next-themes";
import { MagicCard } from "@/components/magicui/magic-card";
import { CheckBoxList } from "./CheckBox";
import { useEffect, useState } from "react";
import { getAllData } from "@/indexDB/indexDB";
import { useTodoContext } from "../../context/TodoContext";
import {formatDistance} from "date-fns"
import { PopoverDemo as MenuPopoverBtn } from "./Popover";
import { MdOutlineWatchLater } from "react-icons/md";
import { HiOutlineDotsVertical } from "react-icons/hi";

export function Card({id, todoCardTitle, createdAt}: TodoCard): JSX.Element {
  const [localTodos, setLocalTodos] = useState<Todo[]>([])
  const { theme } = useTheme();
  
  const color = theme === "dark" ? "#262626" : "#D9D9D955"
  const {todos} = useTodoContext()

  useEffect(() => {
    (async () => {
      const allTodos = await getAllData({storeName: 'todos'})
      const targetTodos = allTodos.filter((todo) => todo.todoCardId === id)
      // console.log(targetTodos)
      setLocalTodos(targetTodos)
    })()
  }, [todos.length, id])

  return (
    <div
      className={
        `flex h-[190px] max-w-[300px] min-w-[200px] w-full flex-col gap-4 lg:flex-row grow flex-1 resize-y`
      }
    >
      <MagicCard
        className="cursor-pointer flex flex-col shadow-md whitespace-nowrap overflow-hidden p-3 h-full"
        gradientColor={color}
      >
        <div className="card-head flex mb-2">
          <div className="flex flex-col">
            <h4 className="text-xl font-semibold tracking-wide">{todoCardTitle ? todoCardTitle : 'untitled'}</h4>
            <div className="text-zinc-600 text-xs flex items-center gap-1"><MdOutlineWatchLater/> <span>{formatDistance(createdAt, new Date())}</span></div>
          </div>
          <MenuPopoverBtn className="right-[-3px] absolute top-[-35px] w-[180px]" todoCardId={id} todoIds={localTodos.map((todo: Todo) => todo.id)}>
          <button type="button" title="menu" className="w-10 h-10 flex items-center justify-center active:bg-white active:border rounded-full">
            <HiOutlineDotsVertical className="w-5 h-5"/>
          </button>
          </MenuPopoverBtn>
        </div>
        {Boolean(localTodos.length) && <ol className="list- p-2 ml-2 flex flex-col gap-1 h-full overflow-y-auto pb-[50px]">
          {localTodos.map((todo: Todo) => <li key={todo.id}>
          <CheckBoxList todo={todo}/>
          </li>)}
        </ol>}
      </MagicCard>
    </div>
  );
}
