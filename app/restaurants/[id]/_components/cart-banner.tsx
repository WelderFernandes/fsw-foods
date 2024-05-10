'use client'
import { Cart } from '@/app/_components/cart'
import { Button } from '@/app/_components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/app/_components/ui/sheet'
import { CardContext } from '@/app/_context/cart'
import { formatCurrency } from '@/app/_helpers/price'
import { Restaurant } from '@prisma/client'
import { ShoppingBagIcon } from 'lucide-react'
import { useContext } from 'react'

interface CartBannerProps {
  restaurant: Pick<Restaurant, 'id'>
}

export default function CartBanner({ restaurant }: CartBannerProps) {
  const { products, totalPrice, totalQuantity } = useContext(CardContext)

  const RestaurantHasProducts = products.some(
    (product) => product.restaurantId === restaurant.id,
  )

  if (!RestaurantHasProducts) return null
  return (
    <div className="min-h-24">
      <div className="fixed bottom-0 left-0 z-50 w-full border-t  border-solid border-muted-foreground bg-white p-5 pt-3 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <span className="text-sx text-muted-foreground">
              Total sem entrega
            </span>
            <h3 className="font-semibold">
              {formatCurrency(totalPrice)}{' '}
              <span className="text-xs font-normal text-muted-foreground">
                /{' '}
                {totalQuantity === 1
                  ? `${totalQuantity} item`
                  : `${totalQuantity} itens`}
              </span>
            </h3>
          </div>
          <Sheet>
            <SheetTrigger>
              <Button>
                <div className="flex items-center justify-center gap-2">
                  <ShoppingBagIcon />
                  <span>Sacola</span>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[90vw]">
              <SheetHeader className="text-left">
                <SheetTitle>Sacola</SheetTitle>
              </SheetHeader>
              <Cart />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
