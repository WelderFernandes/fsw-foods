'use client'

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/app/_components/ui/avatar'
import { Button } from '@/app/_components/ui/button'
import { Card, CardContent } from '@/app/_components/ui/card'
import { Separator } from '@/app/_components/ui/separator'
import { CardContext } from '@/app/_context/cart'
import { formatCurrency } from '@/app/_helpers/price'
import { OrderStatus, Prisma } from '@prisma/client'
import { ChevronRightIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: { product: true }
      }
      restaurant: true
    }
  }>
}

export default function OrderItem({ order }: OrderItemProps) {
  const { addProductToCart } = useContext(CardContext)

  const router = useRouter()

  function HandleRedoOrderClick() {
    for (const orderProduct of order.orderProducts) {
      addProductToCart({
        product: {
          ...orderProduct.product,
          restaurant: order.restaurant,
          quantity: orderProduct.quantity,
        },
      })
    }
    router.push(`/restaurants/${order.restaurantId}`)
  }
  function GetOrderStatusLabel(status: OrderStatus) {
    switch (status) {
      case 'CREATED':
        return 'Criado'
      case 'CONFIRMED':
        return 'Confirmado'
      case 'PREPARING':
        return 'Preparando'
      case 'DELIVERING':
        return 'Em Transporte'
      case 'COMPLETED':
        return 'Finalizado'
      case 'CANCELED':
        return 'Cancelado'
    }
  }

  return (
    <Card>
      <CardContent className="space-y-1 p-5">
        <div
          className={`text-muted- w-fit rounded-full bg-[#EEEEEE] px-2 py-1 ${order.status !== 'COMPLETED' && 'bg-emerald-600/60 text-white'}`}
        >
          <span className="block text-xs font-semibold uppercase">
            {GetOrderStatusLabel(order.status)}
          </span>
        </div>
        <div className="flex justify-between pt-3">
          <div className="flex items-center">
            <Avatar className="h-6 w-6">
              <AvatarImage src={order.restaurant.imageUrl} />
              <AvatarFallback>
                {order.restaurant.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="ml-2 font-semibold">{order.restaurant.name}</span>
          </div>

          <Button
            variant="link"
            size={'icon'}
            className="h-5 w-5 rounded-full"
            asChild
          >
            <Link href={`/restaurants/${order.restaurantId}`}>
              <ChevronRightIcon />
            </Link>
          </Button>
        </div>

        <div className="py-2">
          <Separator />
        </div>
        <div className="flex flex-col gap-1">
          {order.orderProducts.map((orderProduct) => (
            <div
              key={orderProduct.id}
              className="flex items-center gap-2 space-x-1"
            >
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-muted-foreground text-white">
                <span className="block text-xs">{orderProduct.quantity}</span>
              </div>
              <span className="block text-xs text-muted-foreground">
                {orderProduct.product.name}
              </span>
            </div>
          ))}
        </div>
        <div className="py-2">
          <Separator />
        </div>

        <div className=" flex items-center justify-between">
          <p className="text-sm">
            Total: {formatCurrency(Number(order.totalPrice))}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={HandleRedoOrderClick}
            className="h-fit w-fit text-xs text-primary"
            disabled={order.status !== 'COMPLETED'}
          >
            Refazer o pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
