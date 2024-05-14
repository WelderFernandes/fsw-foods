'use client'
import { Button } from '@/app/_components/ui/button'
import { isRestaurantFavorite } from '@/app/_helpers/restaurant'
import { useToogleFavoriteRestaurant } from '@/app/_hooks/use-toggle-favorite-restairant'
import { Restaurant, UserFavoriteRestaurant } from '@prisma/client'
import { ChevronLeftIcon, HeartIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
interface RestaurantImageProps {
  restaurant: Pick<Restaurant, 'name' | 'imageUrl' | 'id'>
  userFavoritesRestaurant: UserFavoriteRestaurant[]
}

export default function RestaurantImage({
  restaurant,
  userFavoritesRestaurant,
}: RestaurantImageProps) {
  const { data } = useSession()
  const router = useRouter()

  const isFavorite = isRestaurantFavorite({
    restaurantId: restaurant.id,
    userFavoritesRestaurant,
  })

  const { handleFavoriteClick } = useToogleFavoriteRestaurant({
    restaurantId: restaurant.id,
    userId: data?.user?.id,
    restaurantIsCurrentFavorite: isFavorite,
  })

  function handleBackClick() {
    router.back()
  }
  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant?.imageUrl}
        alt={restaurant?.name}
        fill
        className="object-cover"
      />
      <Button
        className="absolute left-4 top-3 rounded-full bg-white text-foreground hover:text-white"
        size="icon"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        size="icon"
        className={`absolute right-4 top-4 rounded-full bg-zinc-200/50 
        ${isFavorite && 'bg-primary hover:bg-zinc-200/50 '}
        `}
        onClick={handleFavoriteClick}
      >
        <HeartIcon className="h-fit w-fit fill-white " size={20} />
      </Button>
    </div>
  )
}
