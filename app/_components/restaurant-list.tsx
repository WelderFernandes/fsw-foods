import { getServerSession } from 'next-auth'
import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'
import RestaurantItem from './restaurant-item'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

export default async function RestaurantList() {
  const session = await getServerSession(authOptions)
  const restaurants = await db.restaurant.findMany({ take: 10 })

  const userFavorites = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
  })
  return (
    <ScrollArea className="w-min-[200px] whitespace-nowrap px-5 backdrop-blur-3xl">
      <div className="flex w-max gap-3 pb-4">
        {restaurants.map((restaurant) => (
          <RestaurantItem
            key={restaurant.id}
            restaurant={restaurant}
            userId={session?.user?.id}
            userFavorites={userFavorites}
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" className="mx-5" />
    </ScrollArea>
  )
}
