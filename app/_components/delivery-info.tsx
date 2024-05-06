import { Restaurant } from '@prisma/client'
import { BikeIcon, TimerIcon } from 'lucide-react'
import { formatCurrency } from '../_helpers/price'
import { Card } from './ui/card'

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, 'deliveryFee' | 'deliveryTimeMinutes'>
}
export default function DeliveryInfo({ restaurant }: DeliveryInfoProps) {
  return (
    <Card className="mt-5 flex justify-around py-5">
      <div className="flex flex-col items-center">
        <div className="flex gap-1 text-muted-foreground">
          <span className="text-xs">Entrega</span>
          <BikeIcon size={14} />
        </div>
        {Number(restaurant.deliveryFee) > 0 ? (
          <p className="text-xs font-semibold">
            {formatCurrency(Number(restaurant.deliveryFee))}
          </p>
        ) : (
          <p className="text-xs font-semibold">Entrega gráças</p>
        )}
      </div>
      <div className="flex flex-col items-center">
        <div className="flex gap-1 text-muted-foreground">
          <span className="text-xs">Entrega</span>
          <TimerIcon size={14} />
        </div>

        <p className="text-xs font-semibold">
          {restaurant.deliveryTimeMinutes} min
        </p>
      </div>
    </Card>
  )
}
