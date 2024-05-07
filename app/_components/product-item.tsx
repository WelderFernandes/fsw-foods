import { Prisma } from '@prisma/client'
import { ArrowDownIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { calculateProductTotalPrice, formatCurrency } from '../_helpers/price'
import { cn } from '../_lib/utils'

interface ProductItemProps extends ComponentProps<'div'> {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true
        }
      }
    }
  }>
}
export default function ProductItem({ product, className }: ProductItemProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className={cn('w-[150px] min-w-[150px] space-y-2', className)}
    >
      <div className="relative aspect-square w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />
        {product.discountPercentage && (
          <div className="absolute left-2 top-2 flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-xs font-semibold text-white">
            <ArrowDownIcon size={12} />
            <span>{product.discountPercentage}%</span>
          </div>
        )}
      </div>
      <div>
        <h2 className="truncate text-sm">{product.name}</h2>
        <div className="flex items-center gap-1">
          <h3 className="font-semibold">
            {formatCurrency(calculateProductTotalPrice(product))}
          </h3>
          {product.discountPercentage > 0 && (
            <h4 className="text-xs text-muted-foreground line-through">
              {formatCurrency(Number(product.price))}
            </h4>
          )}
        </div>
        <span className="block text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
    </Link>
  )
}
