'use client'
import { Button } from '@/app/_components/ui/button'
import { Restaurant } from '@prisma/client'
import { ChevronLeftIcon, HeartIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
interface RestaurantImageProps {
  restaurant: Pick<Restaurant, 'name' | 'imageUrl'>
}

export default function RestaurantImage({ restaurant }: RestaurantImageProps) {
  const router = useRouter()

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
        className="absolute right-4 top-4 rounded-full bg-zinc-200/50"
      >
        <HeartIcon className="h-fit w-fit fill-white " size={20} />
      </Button>
    </div>
  )
}