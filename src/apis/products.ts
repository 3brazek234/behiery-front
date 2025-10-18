import axiosApp from "@/lib/axios"
import { Product, ProductSales } from '@/types/product'

export const getProducts = async (url?: string) : Promise<Product[]> => {
  try {
    const res = await axiosApp.get(`${url || "/products"}`)

    return res?.data
  }
  catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export const getProductsSearch = async (searchParams: { [key: string]: string | undefined } = {}): Promise<Product[]> => {
  try {
    // تحويل searchParams إلى query string
    
    const params = new URLSearchParams()
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        params.append(key, value)
      }
    })

    // إرسال طلب GET مع المعايير
    const res = await axiosApp.get('/products/search', { params })
    
    return res?.data?.data?.products?.data || []
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}



export const getProductByID = async (id: number|string) : Promise<Product|null> => {
  try {
    const res = await axiosApp.get(`/products/get/${id}`)
    return res?.data?.data
  }
  catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export const getProductsSales = async () : Promise<ProductSales> => {
  try {
    const res = await axiosApp.get(`/products/sales`)
    return res?.data
  }
  catch (error) {
    console.error('Error fetching product:', error)
    return {
      message: 'Error fetching product',
      data: []
    }
  }
}