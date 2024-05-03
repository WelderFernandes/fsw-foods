import { ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import CategoryList from './_components/category-list'
import Header from './_components/header'
import ProductList from './_components/product-list'
import Search from './_components/search'
import { Button } from './_components/ui/button'

export default function Home() {
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
        <Image
          src="/promo-banner-01.png"
          alt="Até 30% de descontos"
          width={0}
          height={0}
          className="h-auto w-full object-contain"
          sizes="( max-width: 768px ) 100vw, 768px"
          quality={100}
          priority={true}
        />
      </div>
      <div className="space-y-2 pt-6">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Button
            variant="ghost"
            className="h-fit p-0 text-primary hover:bg-transparent"
          >
            Ver Todos
            <ChevronRightIcon size={16} className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <ProductList />
      </div>
    </>
  )
}
