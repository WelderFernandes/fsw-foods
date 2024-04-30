import { Category } from '@prisma/client'
import Image from 'next/image'

interface CategoryItemProps {
  category: Category
}

export default function CategoryItem({ category }: CategoryItemProps) {
  return (
    <div className="flex  w-fit touch-auto items-center gap-3 rounded-full bg-white px-3 py-2 shadow-md ">
      <Image
        src={category.imageUrl}
        width={30}
        height={30}
        alt={category.name}
      />
      <span className="text-sm font-semibold">{category.name}</span>
    </div>
  )
}
