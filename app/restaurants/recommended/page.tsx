import Header from '@/app/_components/header'
import RestaurantItem from '@/app/_components/restaurant-item'
import { authOptions } from '@/app/_lib/auth'
import { db } from '@/app/_lib/prisma'
import { getServerSession } from 'next-auth'

export default async function RecommendedRestaurants() {
  const session = await getServerSession(authOptions)
  const restaurants = await db.restaurant.findMany({})

  const userFavoriterestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      restaurant: true,
    },
  })

  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="mb-6 text-lg font-semibold">
          Restaurantes Recomendados
        </h2>
        <div className="flex w-full flex-col gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              restaurant={restaurant}
              key={restaurant.id}
              className="min-w-full max-w-full"
              userFavorites={userFavoriterestaurants}
            />
          ))}
        </div>
      </div>
    </>
  )
}
