import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Header from '../_components/header'
import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'
import OrderItem from './_components/order-item'

export default async function MyOrders() {
  const session = await getServerSession(authOptions)
  const orders = await db.order.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
      restaurant: true,
    },
  })

  if (!session?.user) {
    return redirect('/')
  }
  return (
    <>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
        <div className="space-y-3 pt-6">
          {orders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  )
}
