import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import CategoryList from './_components/category-list'
import Header from './_components/header'
import ProductList from './_components/product-list'
import PromoBanner from './_components/promo-banner'
import RestaurantList from './_components/restaurant-list'
import Search from './_components/search'
import { Button } from './_components/ui/button'
import { db } from './_lib/prisma'

export default async function Home() {
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
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="px-5 pt-3">
        <Link href="/products/recomended">
          <PromoBanner src="/promo-banner-01.png" alt="Até 30% de descontos" />
        </Link>
      </div>
      <div className="space-y-2 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/products/recomended">
              Ver Todos
              <ChevronRightIcon size={16} className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <ProductList products={products} />
      </div>
      <div className="px-5 pt-3">
        <PromoBanner
          src="/promo-banner-02.png"
          alt="A Partir de R$17,90 em lanches"
        />
      </div>
      <div className="space-y-2 py-6 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
            asChild
          >
            <Link href="/restaurants/recommended">
              Ver Todos
              <ChevronRightIcon size={16} className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  )
}
