import { Product } from "@/types/product"

interface Filters {
  priceRange: number[];
  categories: string[];
  colors: string[];
}

export function filterProducts(products: Product[], filters: Filters): Product[] {
  return products.filter(product => {
    // const priceInRange = product. >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.categories.toString())
    // const colorMatch = filters.colors.length === 0 || filters.colors.includes(product.color)

    return  categoryMatch
  })
}

