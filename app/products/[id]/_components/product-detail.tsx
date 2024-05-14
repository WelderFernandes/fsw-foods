'use client'
import { Cart } from '@/app/_components/cart'
import DeliveryInfo from '@/app/_components/delivery-info'
import DiscountBedge from '@/app/_components/discount-badge'
import ProductList from '@/app/_components/product-list'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/_components/ui/alert-dialog'
import { Button } from '@/app/_components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet'
import { CardContext } from '@/app/_context/cart'
import {
  calculateProductTotalPrice,
  formatCurrency,
} from '@/app/_helpers/price'
import { Prisma } from '@prisma/client'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import { useContext, useState } from 'react'
interface ProductDetailProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>
  complementaryProduct: Prisma.ProductGetPayload<{
    include: {
      restaurant: true
    }
  }>[]
}
export default function ProductDetail({
  product,
  complementaryProduct,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false)

  const { addProductToCart, products } = useContext(CardContext)

  function AddToCart({ emptyCart }: { emptyCart?: boolean }) {
    setIsConfirmationDialogOpen(false)
    addProductToCart({ product: { ...product, quantity }, emptyCart })
    setIsCartOpen(true)
  }

  function handleAddToCartClick() {
    const hasDiferentRestaurantProducts = products.some(
      (cardProduct) => cardProduct.restaurantId !== product.restaurantId,
    )
    if (hasDiferentRestaurantProducts) {
      return setIsConfirmationDialogOpen(true)
    }
    AddToCart({ emptyCart: false })
  }

  function handleIncreaseQuantityClick() {
    setQuantity((currentState) => currentState + 1)
  }

  function handleDecreaseQuantityClick() {
    setQuantity((currentState) => {
      if (currentState === 0) return 0
      return currentState - 1
    })
  }

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-t-2xl bg-white py-5">
      <div className="flex items-center gap-[0.375rem] px-5">
        <div className="relative h-5 w-5">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
      <h1 className="mb-2 mt-1 px-5 text-xl font-semibold">{product.name}</h1>
      <div className="flex justify-between px-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className=" text-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage && <DiscountBedge product={product} />}
          </div>
          {product.discountPercentage && (
            <p className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3 text-center">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuantityClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quantity}</span>
          <Button
            size="icon"
            className="border border-solid border-muted-foreground"
            onClick={handleIncreaseQuantityClick}
          >
            <ChevronRightIcon />
          </Button>
        </div>
      </div>
      <div className="px-5">
        <DeliveryInfo restaurant={product.restaurant} />
      </div>
      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold ">Sobre</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </div>
      <div className="mt-6 space-y-3">
        <h3 className="px-5 font-semibold">Sucos</h3>
        <ProductList key={product.id} products={complementaryProduct} />
      </div>
      <div className="px-5 pt-6">
        <Button onClick={handleAddToCartClick} className="w-full font-semibold">
          Adicionar a sacola
        </Button>
      </div>
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[90vw]">
          <SheetHeader className="text-left">
            <SheetTitle>Sacola</SheetTitle>
          </SheetHeader>
          <Cart setIsOpen={setIsCartOpen} />
        </SheetContent>
      </Sheet>
      <AlertDialog open={isConfirmationDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você só pode adicionar itens de outro restaurante por
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja mesmo adicionar esses produtos a sua sacola?
              <p>Isso farar com que a sacola do restaurante seja esvaziada</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setIsConfirmationDialogOpen(false)}
            >
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => AddToCart({ emptyCart: true })}>
              Esvaziar sacola e adicionar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
