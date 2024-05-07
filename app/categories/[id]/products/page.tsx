import Header from '@/app/_components/header'
import ProductItem from '@/app/_components/product-item'
import { db } from '@/app/_lib/prisma'

interface CategoriesPageProps {
  params: {
    id: string
  }
}

export default async function CategoriesPage({ params }: CategoriesPageProps) {
  const category = await db.category.findUnique({
    where: {
      id: params.id,
    },
    include: {
      products: {
        include: {
          restaurant: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  })
  console.log({ params })

  // if (!category) return notFound()

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">{category?.name}</h2>
        <div className="grid w-full grid-cols-2  gap-6">
          {category?.products.map((product) => (
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
