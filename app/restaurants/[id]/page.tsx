import DeliveryInfo from '@/app/_components/delivery-info'
import ProductList from '@/app/_components/product-list'
import { ScrollArea, ScrollBar } from '@/app/_components/ui/scroll-area'
import { db } from '@/app/_lib/prisma'
import { StarIcon } from 'lucide-react'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import RestaurantImage from '../_components/restaurant-image'
import CartBanner from './_components/cart-banner'

interface RestaurantPageProps {
  params: {
    id: string
  }
}
export default async function RestaurantPage({
  params: { id },
}: RestaurantPageProps) {
  const restaurant = await db.restaurant.findUnique({
    where: {
      id,
    },
    include: {
      categories: {
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          products: {
            where: {
              restaurantId: id,
            },
            include: {
              restaurant: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
      products: {
        take: 10,
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
  if (!restaurant) return notFound()

  const session = await getServerSession()

  const useFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
  })

  return (
    <div className="h-screen bg-white">
      <RestaurantImage
        restaurant={restaurant}
        userFavoritesRestaurant={useFavoriteRestaurants}
      />
      <div className="relative z-50 mt-[-1.5rem] flex items-center justify-between rounded-t-2xl bg-white px-5 py-5 pt-5">
        <div className="item-center flex gap-[0.75rem]">
          <div className="relative h-8 w-8">
            <Image
              src={restaurant.imageUrl}
              alt={restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <h1 className="text-xl font-semibold">{restaurant.name}</h1>
        </div>
        <div className="left-2 top-2 flex items-center gap-[3px] rounded-full  bg-foreground px-2 py-[2px] text-xs font-semibold text-white">
          <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-semibold">5.0</span>
        </div>
      </div>
      <div className="px-5">
        <DeliveryInfo restaurant={restaurant} />
      </div>
      <ScrollArea className="whitespace-nowrap px-5 pl-5 pt-3 backdrop-blur-3xl">
        <div className="flex w-fit gap-4 pb-4 ">
          {restaurant.categories.map((category) => (
            <div
              key={category.id}
              className="min-w-[167px] rounded-md bg-[#F4F4F4] text-center"
            >
              <span className="text-xs text-muted-foreground">
                {category.name}
              </span>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="mx-5" />
      </ScrollArea>
      <div className="mt-6 space-y-4">
        {/* TODO: mostrar produtos mais pedidos */}
        <h2 className="px-5 font-semibold">Mais pedidos</h2>
        <ProductList products={restaurant.products} />
      </div>
      {restaurant.categories.map((category) => (
        <div key={category.id} className="mt-6 space-y-4">
          <h2 className="px-5 font-semibold">{category.name}</h2>
          <ProductList products={category.products} />
        </div>
      ))}
      <CartBanner restaurant={restaurant} />
    </div>
  )
}
