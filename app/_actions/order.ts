'use server'

import { Prisma } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { db } from '../_lib/prisma'

export default async function CreateOrder(data: Prisma.OrderCreateInput) {
  await db.order.create({ data })

  revalidatePath('/my-orders')
}
