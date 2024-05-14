import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { tooggleFavoriteRestaurant } from '../_actions/restaurant'

interface FavoriteRestaurantProps {
  userId?: string
  restaurantId: string
  restaurantIsCurrentFavorite?: boolean
}

export function useToogleFavoriteRestaurant({
  userId,
  restaurantId,
  restaurantIsCurrentFavorite,
}: FavoriteRestaurantProps) {
  const router = useRouter()

  async function handleFavoriteClick() {
    if (!userId) return

    try {
      await tooggleFavoriteRestaurant({
        userId,
        restaurantId,
      })
      toast.success(
        restaurantIsCurrentFavorite
          ? 'Removido dos favoritos'
          : 'Adicionado aos favoritos',
      )
      toast('Pedido realizado com sucesso', {
        description: restaurantIsCurrentFavorite
          ? 'Removido dos favoritos'
          : 'Adicionado aos favoritos',
        action: {
          label: 'Ver meus pedidos',
          onClick: () => router.push('/my-orders'),
        },
      })
    } catch (error) {
      console.error('Algo deu errado', 'error')
    }
  }
  return { handleFavoriteClick }
}
