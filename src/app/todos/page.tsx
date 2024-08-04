import Cards from "@/components/Cards"

const page = () => {
  return (
    <section className="p-5 overflow-auto ml-[250px] max-[500px]:items-center max-[500px]:ml-0 max-[800px]:ml-[180px] mt-20">
      <h2 className="text-2xl text-zinc-700 dark:text-zinc-200 font-semibold pb-5">Todos</h2>
      <Cards/>
    </section>
  )
}

export default page
