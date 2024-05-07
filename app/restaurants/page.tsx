'use client'
import { Restaurant } from '@prisma/client'
import { notFound, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '../_components/header'
import RestaurantItem from '../_components/restaurant-item'
import { SearchForRestaurants } from './_actions.search'

export default function RestaurantsPage() {
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
