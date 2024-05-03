import { Product } from '@prisma/client'

export function calculateProductTotalPrice(product: Product): number {
  if (product.discountPercentage === 0) {
    return Number(product.price)
  }
  const discount = Number(product.price) * (product.discountPercentage / 100)

  return Number(product.price) - discount
}

export function formatCurrency(value: number): string {
  return Intl.NumberFormat('pt-Br', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
