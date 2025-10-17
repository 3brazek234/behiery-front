import axiosApp from "@/lib/axios"
import { Product } from '@/types/product'



type Category = {
  id: number
  name: {
    en: string
    ar: string
  }
  description: any
  picture: string
  created_at: string
  updated_at: string
}
export const getCategories = async (url?: string) : Promise<Category[]> => {
  try {
    const res = await axiosApp.get(`${url || "/categories"}`)
    console.log(res?.data?.data)
    return res?.data?.data 
  }
  catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}
