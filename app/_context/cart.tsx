'use client'
import { Product } from '@prisma/client'
import { ReactNode, createContext, useState } from 'react'

interface CardProduct extends Product {
  quantity: number
}
interface ICardContextProps {
  products: CardProduct[]
  addProductToCart: (product: Product) => void
}

export const CardContext = createContext<ICardContextProps>({
  products: [],
  addProductToCart: () => {},
})

export function CardProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<CardProduct[]>([])

  function addProductToCart(product: Product) {
    setProducts((prev) => [...prev, { ...product, quantity: 0 }])
  }

  return (
    <CardContext.Provider value={{ products, addProductToCart }}>
      {children}
    </CardContext.Provider>
  )
}
