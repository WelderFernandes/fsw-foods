import { Category } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { cn } from '../_lib/utils'

interface CategoryItemProps extends ComponentProps<'div'> {
  category: Category
}

export default function CategoryItem({
  category,
  className,
}: CategoryItemProps) {
  return (
    <Link
      href={`categories/${category.id}/products`}
      className={cn(
        'flex w-fit touch-auto items-center gap-3 rounded-full bg-white px-3 py-2 shadow-md',
        className,
      )}
    >
      <Image
        src={category.imageUrl}
        width={30}
        height={30}
        alt={category.name}
      />
      <span className="text-sm font-semibold">{category.name}</span>
    </Link>
  )
}
