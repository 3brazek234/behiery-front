// src/components/Discounts.tsx
import { getProductsSales } from "@/apis/products";
import { Product } from "@/types/product";
import HomeCards from "./HomeCards";
import SubTitle from "./SubTitle";

async function Discounts() {
  const productsSales = await getProductsSales();

  if (!productsSales || productsSales.data.length === 0) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-400 py-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">عروض وخصومات</h2>
        <p>لا توجد منتجات عليها خصومات حالياً. ترقبوا عروضنا الجديدة!</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-12 px-4">
    <SubTitle title="عروض وخصومات" className="center"/>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {productsSales?.data?.map((product: Product) => (
          <HomeCards key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Discounts;
