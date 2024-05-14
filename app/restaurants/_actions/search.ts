'use server'

import { db } from '../../_lib/prisma'

export async function SearchForRestaurants(search: string) {
  const restaurants = await db.restaurant.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
    take: 10,
  })
  return restaurants
}
