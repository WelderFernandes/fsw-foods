import Header from '@/app/_components/header'
import ProductItem from '@/app/_components/product-item'
import { db } from '@/app/_lib/prisma'

export default async function RecomendedProductPage() {
  // TODO: pegar produtos com mais pedidos

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
    take: 20,
  })
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">Pedidos recomendados</h2>
        <div className="grid w-full grid-cols-2  gap-6">
          {products?.map((product) => (
            <ProductItem
              product={product}
              key={product.id}
              className="min-w-full "
            />
          ))}
        </div>
      </div>
    </>
  )
}
