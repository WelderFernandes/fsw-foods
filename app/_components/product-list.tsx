import { db } from '../_lib/prisma'
import ProductItem from './product-item'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

export default async function ProductList() {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
    take: 10,
  })
  return (
    <ScrollArea className="w-min-[200px] whitespace-nowrap px-5 backdrop-blur-3xl">
      <div className="flex w-max gap-3 pb-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
