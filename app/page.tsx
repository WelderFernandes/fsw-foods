import Image from 'next/image'
import CategoryList from './_components/category-list'
import Header from './_components/header'
import Search from './_components/search'

export default function Home() {
  return (
    <>
      <Header />
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 py-6">
        <CategoryList />
      </div>
      <div className="px-5 py-6">
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
    </>
  )
}
