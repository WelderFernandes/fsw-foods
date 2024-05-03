import { db } from '../_lib/prisma'
import CategoryItem from './category-item'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

export default async function CategoryList() {
  const categories = await db.category.findMany()

  return (
    <ScrollArea className="w-min-[200px] whitespace-nowrap backdrop-blur-3xl">
      <div className="flex w-max gap-3 pb-4">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="px-5" />
    </ScrollArea>
  )
}
