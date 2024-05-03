import { db } from '../_lib/prisma'
import RestaurantItem from './restaurant-item'
import { ScrollArea, ScrollBar } from './ui/scroll-area'

export default async function RestaurantList() {
  const restaurants = await db.restaurant.findMany({ take: 10 })
  return (
    <ScrollArea className="w-min-[200px] whitespace-nowrap px-5 backdrop-blur-3xl">
      <div className="flex w-max gap-3 pb-4">
        {restaurants.map((restaurant) => (
          <RestaurantItem key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
