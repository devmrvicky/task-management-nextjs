"use client"

import { useTodoContext } from "@/components/context/TodoContext"
import { TodoCard } from "@/components/shadcn-ui/DialogBox"
import { Card } from "@/components/shadcn-ui/MagicCard"
import { getAllData } from "@/indexDB/indexDB"
import { useEffect, useState } from "react"

const page = () => {
  // const [todoCards, setTodoCards] = useState([])
  const {todoCards, setTodoCards} = useTodoContext()
  useEffect(() => {
  ( async () => {
    const cards = await getAllData({storeName: "todo_cards"})
    setTodoCards(cards)
  })()
  }, [getAllData, todoCards.length])
  return (
    <section className="p-5 overflow-auto ml-[250px] max-[500px]:items-center max-[500px]:ml-0 max-[800px]:ml-[180px] mt-20">
      <h2 className="text-2xl text-zinc-700 dark:text-zinc-200 font-semibold pb-5">Todos</h2>
      <div className="cards flex gap-2 flex-wrap justify-center max-[500px]:pb-20">
      {todoCards.map((card: TodoCard, i: Number) => <Card key={i} {...card}/>)}
      {/* <Card/> */}
      </div>
    </section>
  )
}

export default page
