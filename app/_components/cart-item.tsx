import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from 'lucide-react'
import Image from 'next/image'
import { useContext } from 'react'
import { CardContext, CartProduct } from '../_context/cart'
import { calculateProductTotalPrice, formatCurrency } from '../_helpers/price'
import { Button } from './ui/button'

interface CartItemProps {
  cartProduct: CartProduct
}
export function CartItem({ cartProduct }: CartItemProps) {
  const { decreeseProductQuantity, increeseProductQuantity, removeProduct } =
    useContext(CardContext)

  function handleDecreaseQuantityClick() {
    decreeseProductQuantity(cartProduct.id)
  }
  function handleIncreaseQuantityClick() {
    increeseProductQuantity(cartProduct.id)
  }
  function handleRemoveProductClick() {
    removeProduct(cartProduct.id)
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20">
          <Image
            src={cartProduct.imageUrl}
            alt={cartProduct.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col space-y-1">
          <h3 className="text-xs">{cartProduct.name}</h3>

          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProduct) * cartProduct.quantity,
              )}
            </h4>
            {cartProduct.discountPercentage > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProduct.price) * cartProduct.quantity,
                )}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span className="block w-3 text-sm">{cartProduct.quantity}</span>
            <Button
              size="icon"
              className="h-7 w-7 border-muted-foreground"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>
      <Button
        size="icon"
        variant="ghost"
        className="h-8 w-8 border border-solid border-muted-foreground"
        onClick={handleRemoveProductClick}
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  )
}
