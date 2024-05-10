import { useContext } from 'react'
import { CardContext } from '../_context/cart'
import { formatCurrency } from '../_helpers/price'
import { CartItem } from './cart-item'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Separator } from './ui/separator'

export function Cart() {
  const { products, subTotal, totalDiscounts, totalPrice } =
    useContext(CardContext)
  return (
    <div className="py-5">
      <div className="space-y-4">
        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}
      </div>
      <div className="mt-6">
        <Card>
          <CardContent className="space-y-2 p-5">
            <div className="item-center flex  justify-between text-xs">
              <h3 className="text-muted-foreground">Subtotal</h3>
              <span>{formatCurrency(subTotal)}</span>
            </div>

            <Separator />

            <div className="item-center flex  justify-between text-xs">
              <h3 className="text-muted-foreground">Entrega</h3>
              {Number(products[0].restaurant.deliveryFee) === 0 ? (
                <span className="font-semibold uppercase text-primary">
                  Grátis
                </span>
              ) : (
                formatCurrency(Number(products[0].restaurant.deliveryFee))
              )}
            </div>
            <Separator />

            <div className="item-center flex  justify-between text-xs">
              <h3 className="text-muted-foreground">Descontos</h3>
              <span>- {formatCurrency(totalDiscounts)}</span>
            </div>

            <Separator />

            <div className="item-center flex  justify-between text-xs">
              <h3 className="font-semibold">Total</h3>
              <span className="font-semibold">
                {formatCurrency(totalPrice)}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <Button className="mt-6 w-full">
        <span>Finalizar pedido</span>
      </Button>
    </div>
  )
}
