import { getProducts } from "@/apis/products";
import Discounts from "@/components/Discounts";
import Hero from "@/components/hero";
// import CategoriesSection from "@/components/sections/CategoriesSection";
import ProductSection from "@/components/sections/productsSection";

export const dynamic = "force-dynamic";

export default async function Home() {
  const productsBestSeller = await getProducts("/products/best-seller");
  const products = await getProducts();

  return (
    <main>
      <Hero />

      {/* <CategoriesSection /> */}
      <div className="container mx-auto py-8">
      {productsBestSeller && productsBestSeller?.length > 0 && (
        <ProductSection
          products={productsBestSeller}
          title="الاكثر مبيعا"
          linkAll="/products?best=best-seller"         
        />
      )}
      <Discounts />

      {products && products?.length > 0 && (
        <ProductSection
          products={products}
          title="عطور بحيري"
          linkAll="/products"
          
        />
      )}
 
      </div>
    </main>
  );
}
