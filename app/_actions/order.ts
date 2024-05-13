'use server'

import { Prisma } from '@prisma/client'
import { db } from '../_lib/prisma'

export default async function CreateOrder(data: Prisma.OrderCreateInput) {
  return await db.order.create({ data })
}
