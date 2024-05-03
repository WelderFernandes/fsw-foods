import { Product } from '@prisma/client'
import { ArrowDownIcon } from 'lucide-react'

interface DiscountBedgeProps {
  product: Pick<Product, 'discountPercentage'>
}

export default function DiscountBedge({ product }: DiscountBedgeProps) {
  return (
    <div className="flex items-center gap-[2px] rounded-full bg-primary px-2 py-[2px] text-xs font-semibold text-white">
      <ArrowDownIcon size={12} />
      <span>{product.discountPercentage}%</span>
    </div>
  )
}
