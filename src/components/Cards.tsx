"use client"

import { useTodoContext } from "@/context/TodoContext"
import { Card } from "@/components/shadcn-ui/MagicCard"
import { getAllData } from "@/indexDB/indexDB"
import { useEffect } from "react"

const Cards = (): JSX.Element => {
  // const [todoCards, setTodoCards] = useState([])
  const {todoCards, setTodoCards} = useTodoContext()
  useEffect(() => {
  ( async () => {
    const cards = await getAllData({storeName: "todo_cards"})
    setTodoCards(cards)
  })()
  }, [setTodoCards, todoCards.length])
  return (
      <div className="cards flex gap-2 flex-wrap justify-start max-[700px]:pb-20">
      {todoCards.map((card) => <Card key={card.id} {...card}/>)}
      {/* <Card/> */}
      </div>
  )
}

export default Cards
