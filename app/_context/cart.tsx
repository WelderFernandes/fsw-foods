'use client'
import { Prisma } from '@prisma/client'
import { ReactNode, createContext, useMemo, useState } from 'react'
import { calculateProductTotalPrice } from '../_helpers/price'

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: { deliveryFee: true }
      }
    }
  }> {
  quantity: number
}
interface ICardContextProps {
  products: CartProduct[]
  subTotal: number
  totalPrice: number
  totalDiscounts: number
  addProductToCart: (
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: { deliveryFee: true }
        }
      }
    }>,
    quantity: number,
  ) => void
  decreeseProductQuantity: (productId: string) => void
  increeseProductQuantity: (productId: string) => void
  removeProduct: (productId: string) => void
}

export const CardContext = createContext<ICardContextProps>({
  products: [],
  subTotal: 0,
  totalPrice: 0,
  totalDiscounts: 0,
  addProductToCart: () => {},
  decreeseProductQuantity: () => {},
  increeseProductQuantity: () => {},
  removeProduct: () => {},
})

export function CardProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([])

  const subTotal = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity
    }, 0)
  }, [products])

  const totalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + calculateProductTotalPrice(product) * product.quantity
    }, 0)
  }, [products])

  const totalDiscounts = subTotal - totalPrice

  function decreeseProductQuantity(productId: string) {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === productId) {
          if (product.quantity === 1) return product
          return { ...product, quantity: product.quantity - 1 }
        }
        return product
      }),
    )
  }

  function increeseProductQuantity(productId: string) {
    setProducts((prev) =>
      prev.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 }
        }
        return product
      }),
    )
  }

  function removeProduct(productId: string) {
    setProducts((prev) => prev.filter((product) => product.id !== productId))
  }
  function addProductToCart(
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: { deliveryFee: true }
        }
      }
    }>,
    quantity: number,
  ) {
    const isProductInCart = products.some(
      (cartProduct) => cartProduct.id === product.id,
    )
    if (isProductInCart) {
      return setProducts((prev) =>
        prev.map((cartProduct) => {
          if (cartProduct.id === product.id) {
            return { ...cartProduct, quantity: cartProduct.quantity + quantity }
          }
          return cartProduct
        }),
      )
    }
    setProducts((prev) => [...prev, { ...product, quantity }])
  }

  return (
    <CardContext.Provider
      value={{
        products,
        subTotal,
        totalPrice,
        totalDiscounts,
        addProductToCart,
        decreeseProductQuantity,
        increeseProductQuantity,
        removeProduct,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}
