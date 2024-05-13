'use client'
import { Prisma } from '@prisma/client'
import { ReactNode, createContext, useMemo, useState } from 'react'
import { calculateProductTotalPrice } from '../_helpers/price'

export interface CartProduct
  extends Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: { id: true; deliveryTimeMinutes: true; deliveryFee: true }
      }
    }
  }> {
  quantity: number
}
interface ICardContextProps {
  products: CartProduct[]
  subTotalPrice: number
  totalPrice: number
  totalDiscount: number
  totalQuantity: number
  addProductToCart: ({
    product,
    quantity,
    emptyCart,
  }: {
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: { id: true; deliveryTimeMinutes: true; deliveryFee: true }
        }
      }
    }>
    quantity: number
    emptyCart?: boolean
  }) => void
  decreeseProductQuantity: (productId: string) => void
  increeseProductQuantity: (productId: string) => void
  removeProduct: (productId: string) => void
  clearCart: () => void
}

export const CardContext = createContext<ICardContextProps>({
  products: [],
  subTotalPrice: 0,
  totalPrice: 0,
  totalDiscount: 0,
  totalQuantity: 0,
  addProductToCart: () => {},
  decreeseProductQuantity: () => {},
  increeseProductQuantity: () => {},
  removeProduct: () => {},
  clearCart: () => {},
})

export function CardProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CartProduct[]>([])

  const subTotalPrice = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + Number(product.price) * product.quantity
    }, 0)
  }, [products])

  const totalPrice = useMemo(() => {
    return (
      products.reduce((acc, product) => {
        return acc + calculateProductTotalPrice(product) * product.quantity
      }, 0) + Number(products?.[0]?.restaurant?.deliveryFee)
    )
  }, [products])

  const totalQuantity = useMemo(() => {
    return products.reduce((acc, product) => {
      return acc + product.quantity
    }, 0)
  }, [products])

  const totalDiscount =
    subTotalPrice - totalPrice + Number(products?.[0]?.restaurant?.deliveryFee)

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

  function addProductToCart({
    product,
    quantity,
    emptyCart,
  }: {
    product: Prisma.ProductGetPayload<{
      include: {
        restaurant: {
          select: { deliveryFee: true; deliveryTimeMinutes: true; id: true }
        }
      }
    }>
    quantity: number
    emptyCart?: boolean
  }) {
    if (emptyCart) {
      setProducts([])
    }

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

  function clearCart() {
    setProducts([])
  }

  return (
    <CardContext.Provider
      value={{
        products,
        subTotalPrice,
        totalPrice,
        totalQuantity,
        totalDiscount,
        addProductToCart,
        decreeseProductQuantity,
        increeseProductQuantity,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CardContext.Provider>
  )
}
