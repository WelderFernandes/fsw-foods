'use server'
import { revalidatePath } from 'next/cache'
import { db } from '../_lib/prisma'

interface FavoriteRestaurantProps {
  userId: string
  restaurantId: string
}

export async function tooggleFavoriteRestaurant({
  userId,
  restaurantId,
}: FavoriteRestaurantProps) {
  const isFavorite = await db.userFavoriteRestaurant.findUnique({
    where: {
      userId_restaurantId: {
        userId,
        restaurantId,
      },
    },
  })
  if (isFavorite) {
    await db.userFavoriteRestaurant.delete({
      where: {
        userId_restaurantId: {
          userId,
          restaurantId,
        },
      },
    })
    revalidatePath('/')
    return
  }

  await db.userFavoriteRestaurant.create({
    data: {
      userId,
      restaurantId,
    },
  })
  revalidatePath('/')
}
