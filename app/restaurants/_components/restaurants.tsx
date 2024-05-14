'use client'
import Header from '@/app/_components/header'
import RestaurantItem from '@/app/_components/restaurant-item'
import { Restaurant, UserFavoriteRestaurant } from '@prisma/client'
import { notFound, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SearchForRestaurants } from '../_actions/search'

interface RestaurantsProps {
  useFavoriteRestaurants: UserFavoriteRestaurant[]
}

export default function Restaurants({
  useFavoriteRestaurants,
}: RestaurantsProps) {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const searchParams = useSearchParams()

  const searchFor = searchParams.get('search')

  useEffect(() => {
    async function fetchRestaurants() {
      if (!searchFor) return notFound()
      const data = await SearchForRestaurants(searchFor)
      setRestaurants(data)
    }
    fetchRestaurants()
  }, [searchFor])

  if (!searchFor) return notFound()

  return (
    <div>
      <Header />
      {restaurants.length > 0 ? (
        <div className=" px-5 py-6">
          <h2 className="mb-6 text-lg font-semibold">
            Restaurantes encontrados
          </h2>
          <div className="grid w-full grid-cols-2 gap-6">
            {restaurants?.map((restaurant) => (
              <RestaurantItem
                restaurant={restaurant}
                key={restaurant.id}
                className="min-w-full "
                userFavorites={useFavoriteRestaurants}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex min-h-dvh items-center justify-center">
          <p>Nenhum resultado encontrado</p>
        </div>
      )}
    </div>
  )
}
