import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Header from '../_components/header'
import RestaurantItem from '../_components/restaurant-item'
import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'

export default async function MyFavoriteRestaurants() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return redirect('/')
  }
  const userFavoriteRestaurants = await db.userFavoriteRestaurant.findMany({
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
        <h2 className="mb-6 text-lg font-semibold">Restaurantes favoritos</h2>
        <div className="flex w-full flex-col gap-6">
          {userFavoriteRestaurants.length > 0 ? (
            userFavoriteRestaurants.map(({ restaurant }) => (
              <RestaurantItem
                userFavorites={userFavoriteRestaurants}
                restaurant={restaurant}
                key={restaurant.id}
                className="min-w-full max-w-full"
              />
            ))
          ) : (
            <p className="text-center">
              Você não tem restaurantes como favoritos
            </p>
          )}
        </div>
      </div>
    </>
  )
}
