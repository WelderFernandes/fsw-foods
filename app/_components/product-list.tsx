import { Prisma } from '@prisma/client'
import ProductItem from './product-item'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

interface ProductListProps {
  products: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>[]
}
export default function ProductList({ products }: ProductListProps) {
  return (
    <ScrollArea className="w-min-[200px] whitespace-nowrap pl-5 backdrop-blur-3xl">
      <div className="flex w-max gap-3 pb-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="mx-5" />
    </ScrollArea>
  )
}
