import { Category, Description, Name, Option, Review, Type } from "./product"

export interface ProductDetails {
  id: number
  name: Name
  description: Description
  is_active: number
  images: string[]
  price_gm: string
  gm_ml: string
  qr_code: string
  video: any
  gender: string
  age_group: string
  rate: string
  brand: number
  free_shipping: number
  created_at: string
  updated_at: string
  in_wishlist: boolean
  reviews_count: number
  in_cart: boolean
  types: Type[]
  jobs: any[]
  options: Option[]
  categories: Category[]
  reviews: Review[]
}

export interface Type2 {
  en: string
  ar: string
}
