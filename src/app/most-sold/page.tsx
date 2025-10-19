// app/page.tsx (أو الملف اللي فيه عرض الأكثر مبيعًا)

import { getMostSold } from "@/apis/products";
import { Suspense } from "react";
import HomeCards from "@/components/HomeCards";
import Link from "next/link"; // 🚨 استيراد Link
import SubTitle from "@/components/SubTitle";

async function HomePage() { // 🚨 غيرت اسم الدالة لـ HomePage عشان تكون معبرة أكتر
  const mostSoldProducts = await getMostSold(); // 🚨 غيرت اسم المتغير ليكون أكثر دلالة

  return (
    <Suspense
      fallback={
        <div className="mx-auto py-8 flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"></div>
          <p className="ml-4 text-lg text-gray-600 dark:text-gray-300">جاري تحميل المنتجات الأكثر مبيعاً...</p>
        </div>
      }
    >
      <section className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white relative">
           <SubTitle title="الأكثر مبيعا" />
          </h2>
          <Link href="/products" className="text-lg font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 transition-colors flex items-center gap-1">
            عرض كل المنتجات &rarr;
          </Link>
        </div>

        {/* Products Grid */}
        {mostSoldProducts && mostSoldProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"> {/* 🚨 lg:grid-cols-4 للـ layout على الشاشات الكبيرة */}
            {mostSoldProducts.map((product) => (
              <HomeCards key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 dark:text-gray-400 text-xl py-10">
            لا توجد منتجات الأكثر مبيعاً حالياً.
          </p>
        )}
      </section>
    </Suspense>
  );
}

export default HomePage;