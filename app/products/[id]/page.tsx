import { db } from '@/app/_lib/prisma'
import { notFound } from 'next/navigation'
import ProductDetail from './_components/product-detail'
import ProductImage from './_components/product-image'

interface ProductPageProps {
  params: {
    id: string
  }
}
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await db.product.findUnique({
    where: {
      id: params.id,
    },
    include: {
      restaurant: true,
    },
  })
  const juices = await db.product.findMany({
    where: {
      category: {
        name: 'Sucos',
      },
      restaurant: {
        id: product?.restaurantId,
      },
    },
    include: {
      restaurant: true,
    },
  })
  console.log({ juices })

  if (!product) return notFound()

  return (
    <>
      <ProductImage product={product} />
      <ProductDetail product={product} complementaryProduct={juices} />
    </>
  )
}
