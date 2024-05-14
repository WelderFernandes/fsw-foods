import { UserFavoriteRestaurant } from '@prisma/client'

interface UserFavoriteRestaurantProps {
  userFavoritesRestaurant: UserFavoriteRestaurant[]
  restaurantId: string
}

export function isRestaurantFavorite({
  userFavoritesRestaurant,
  restaurantId,
}: UserFavoriteRestaurantProps) {
  return userFavoritesRestaurant.some(
    (favorite) => favorite.restaurantId === restaurantId,
  )
}
