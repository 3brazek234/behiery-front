import { getProducts } from "@/apis/products";
import Hero from "@/components/hero";
// import CategoriesSection from "@/components/sections/CategoriesSection";
import ProductSection from "@/components/sections/productsSection";

export const dynamic = "force-dynamic"

export default async function Home() {
  const productsBestSeller = await getProducts("/products/best-seller")
  const {data : productsSales} = (await getProducts("/products/sales")) as any
  const products= await getProducts()
  return (
    <main className="container mx-auto py-8">
      <Hero />
      {/* <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Welcome to Our Modern E-commerce Store
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Discover amazing products at great prices. Start shopping now!
            </p>
            <Link href="/products">
              <Button className="mt-4" size="lg">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section> */}
      {/* <CategoriesSection /> */}
      {productsBestSeller && productsBestSeller?.length > 0 && <ProductSection products={productsBestSeller} title="الاكثر مبيعا" linkAll="/products?best=best-seller"/>}
      {productsSales && productsSales?.length > 0 && <ProductSection products={productsSales} title="الاكثر مبيعا" linkAll="/products?sales=sales"/>}
      {products && products?.length > 0 && <ProductSection products={products} title="منتجات اكثر" linkAll="/products"/>}
    </main>
  );
}
