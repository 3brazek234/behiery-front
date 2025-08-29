import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Product {
  id: number
  name_en: string
  name_ar: string
  images: string[]
  price_gm: string
  gm_ml: string
  gender: string
  age_group: string
  rate: string
  in_wishlist: boolean
}

interface Option {
  id: number
  size: string
  price: string
  sale_price: string | null
  quantity: number | null
}

interface CartItem {
  id?: number // معرف العنصر في السلة (يأتي من الباك اند)
  user_id?: number // معرف المستخدم (اختياري)
  product: Product
  mix: null
  package: null
  book: null
  option: Option
  quantity: number
  is_gift: 0 | 1
  gift_price: number | null
  price: number // السعر الإجمالي للعنصر
}

interface CartState {
  items: CartItem[]
  total: number
  fetch: boolean
  toggleFetch: () => void
  setCart: (items: CartItem[]) => void
  setTotal: (total: number) => void
  clearCart: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      total: 0,
      fetch: false,
      toggleFetch: () => set((state) => ({ fetch: !state.fetch })),
      setCart: (items: CartItem[]) => set({ items }),
      setTotal: (total: number) => set({ total }),
      clearCart: () => set({ items: [] })
  }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)