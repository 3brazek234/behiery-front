'use client'

import { useCart } from '@/store/cartStore'
import useUserStore from '@/store/user'
import { ShoppingBag } from 'lucide-react'

export function CartIcon() {
  const {user} = useUserStore()
  const { items } = useCart()
  const itemCount = items.length
  return (
    <div className="relative">
      <ShoppingBag className="h-6 w-6" />
      {user && itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </div>
  )
}

