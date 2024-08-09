import Cards from "@/components/Cards"
import { TodoEditor } from "@/components/shadcn-ui/TodoEditor"
import WriteButton from "@/components/WriteButton"

const page = () => {
  return (
    <section className="p-5 overflow-auto ml-[250px] max-[700px]:items-center max-[700px]:ml-0 max-[800px]:ml-[180px] mt-20">
      <h2 className="text-2xl text-zinc-700 dark:text-zinc-200 font-semibold pb-5">Todos</h2>
      <Cards/>
      <div className="fixed bottom-4 right-4 z-30 max-[700px]:bottom-[95px]">
        <TodoEditor>
          <WriteButton/>
        </TodoEditor>
      </div>
    </section>
  )
}

export default page
