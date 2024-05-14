import { getServerSession } from 'next-auth'
import { Suspense } from 'react'
import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'
import Restaurants from './_components/restaurants'

export default async function RestaurantsPage() {
  const session = await getServerSession(authOptions)

  const userFavoriterestaurants = await db.userFavoriteRestaurant.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      restaurant: true,
    },
  })

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Restaurants useFavoriteRestaurants={userFavoriterestaurants} />
    </Suspense>
  )
}
