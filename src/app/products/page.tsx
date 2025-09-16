import { ProductCard } from '@/components/product-card'
import { getProducts, getProductsSearch } from '@/apis/products'
import { Filter } from '@/components/product-filters'
import { cn } from '@/lib/utils'

export const dynamic = "force-dynamic"

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const query = await searchParams
  const bestSeller = (query as any).best === "best-seller" ? "الاكثر مبيعا" : false
  const sales = (query as any).sales === "best-seller" ? "البيعات" : false
  const products = Object.keys(query).length != 0 ? bestSeller ? await getProducts("/products/best-seller") : await getProductsSearch(query) : await getProducts()  // تمرير searchParams إلى API

  // استخراج الفئات والأنواع الفريدة من المنتجات
  const categories = Array.from(
    new Map(products.flatMap((p) => p?.categories || []).map((c) => [c.id, c])).values()
  )
  const types = Array.from(
    new Map(products.flatMap((p) => p.types).map((t) => [t?.id, t])).values()
  )

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">{bestSeller || sales || "منتجات بحيري"}</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* قسم الفلتر */}
        {(!bestSeller || !sales) && <div className="lg:w-1/6 order-1 lg:order-none">
          <Filter categories={categories} types={types} />
        </div>}
        {/* قسم المنتجات */}
        <div className={cn("lg:w-5/6 gap-4", !bestSeller || !sales ? "columns-1 sm:columns-2 md:columns-3 lg:columns-4" : "grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 lg:!w-full")}>
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product?.id} className='mb-4 w-full'>
                <ProductCard key={product.id} product={product} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-muted-foreground">No products found.</p>
          )}
        </div>
      </div>
    </div>
  )
}