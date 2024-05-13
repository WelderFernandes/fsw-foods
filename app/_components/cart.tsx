import { OrderStatus } from '@prisma/client'
import { Loader2Icon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useContext, useState } from 'react'
import { toast } from 'sonner'
import CreateOrder from '../_actions/order'
import { CardContext } from '../_context/cart'
import { formatCurrency } from '../_helpers/price'
import { CartItem } from './cart-item'

import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Separator } from './ui/separator'

interface CartProps {
  setIsOpen: (isOpen: boolean) => void
}

export function Cart({ setIsOpen }: CartProps) {
  const { data } = useSession()
  const { products, subTotalPrice, totalDiscount, totalPrice, clearCart } =
    useContext(CardContext)
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false)

  const router = useRouter()

  async function HandleFinishOrderClick() {
    if (!data) return
    const restaurant = products?.[0].restaurant

    try {
      setIsSubmitLoading(true)
      await CreateOrder({
        subTotalPrice,
        totalDiscount,
        totalPrice,
        deliveryFee: restaurant?.deliveryFee,
        deliveryTimeMinutes: restaurant?.deliveryTimeMinutes,
        restaurant: {
          connect: {
            id: restaurant?.id,
          },
        },
        status: OrderStatus.CREATED,
        user: {
          connect: {
            id: data.user.id,
          },
        },
        orderProducts: {
          createMany: {
            data: products.map((product) => ({
              productId: product.id,
              quantity: product.quantity,
            })),
          },
        },
      })
      clearCart()
      setIsOpen(false)
      toast('Pedido realizado com sucesso', {
        style: {
          color: 'text-primary',
          backgroundColor: 'primary',
        },
        description:
          'Voce pode acompanhar o status do seu pedido na tela de seus pedidos pedidos.',
        action: {
          label: 'Meus pedidos',
          onClick: () => router.push('/my-orders'),
        },
      })
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmitLoading(false)
    }
  }

  return (
    <>
      <div className="flex h-full flex-col py-5">
        {products.length > 0 ? (
          <>
            <div className="flex-auto space-y-4">
              {products.map((product) => (
                <CartItem key={product.id} cartProduct={product} />
              ))}
            </div>
            <div className="mt-6">
              <Card>
                <CardContent className="space-y-2 p-5">
                  <div className="item-center flex  justify-between text-xs">
                    <h3 className="text-muted-foreground">Subtotal</h3>
                    <span>{formatCurrency(subTotalPrice)}</span>
                  </div>

                  <Separator />

                  <div className="item-center flex  justify-between text-xs">
                    <h3 className="text-muted-foreground">Entrega</h3>
                    {Number(products?.[0].restaurant.deliveryFee) === 0 ? (
                      <span className="font-semibold uppercase text-primary">
                        Grátis
                      </span>
                    ) : (
                      formatCurrency(
                        Number(products?.[0].restaurant.deliveryFee),
                      )
                    )}
                  </div>
                  <Separator />

                  <div className="item-center flex  justify-between text-xs">
                    <h3 className="text-muted-foreground">Descontos</h3>
                    <span>- {formatCurrency(totalDiscount)}</span>
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
            <Button
              className="mt-6 w-full"
              onClick={() => setIsConfirmationDialogOpen(true)}
              disabled={isSubmitLoading}
            >
              <span>Finalizar pedido</span>
            </Button>
          </>
        ) : (
          <h2 className="flex h-full flex-col justify-center text-center text-lg text-muted-foreground">
            Sacola vazia
          </h2>
        )}
      </div>
      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Deseja finalizar o pedido?</AlertDialogTitle>
            <AlertDialogDescription>
              Ao finalizar o pedido, os itens do carrinho não poderão mais ser
              alterados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitLoading}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={isSubmitLoading}
              onClick={HandleFinishOrderClick}
            >
              Finalizar pedido
              {isSubmitLoading && (
                <Loader2Icon className="ml-2 h-4 w-4 animate-spin" />
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
