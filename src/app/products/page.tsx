// app/products/page.tsx

import { getProductNew } from "@/apis/products";
import { Suspense } from "react";
import { FilterControls } from "@/components/product-filters";
import { PaginationControls } from "@/components/PaginatedProducts";
import { ProcessedProductsResponse } from "@/types/product"; // 🚨 استيراد الـ type الجديد
import { ProductCard } from "@/components/product-card";
import SubTitle from "@/components/SubTitle";

interface ProductsPageProps {
  searchParams: {
    page?: string;
    limit?: string;
    category_id?: string;
    gender?: "men" | "women" | "unisex";
    min_price?: string;
    max_price?: string;
    sort?: string;
  };
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const searchParamsAwaited = searchParams; // 🚨 التأكد من await
  const currentPage = parseInt(searchParamsAwaited.page || "1", 10);
  const limit = parseInt(searchParamsAwaited.limit || "12", 10);

  const fetchOptions = {
    page: currentPage,
    limit: limit,
    category_id: searchParamsAwaited.category_id,
    gender: searchParamsAwaited.gender,
    min_price: searchParamsAwaited.min_price
      ? parseFloat(searchParamsAwaited.min_price)
      : undefined,
    max_price: searchParamsAwaited.max_price
      ? parseFloat(searchParamsAwaited.max_price)
      : undefined,
    sort: searchParamsAwaited.sort,
  };

  let productsData: ProcessedProductsResponse; // 🚨 الـ type الصحيح هنا
  let error: string | null = null;

  try {
    productsData = await getProductNew(fetchOptions);
    console.log(productsData, "sdhfjhsdf"); // هتلاقي الداتا منظمة هنا
  } catch (e) {
    error = (e as Error).message;
    // 🚨 لازم الـ default object يكون مطابق للـ type بتاع ProcessedProductsResponse
    productsData = {
      products: [],
      totalItems: 0,
      totalPages: 1,
      currentPage: 1,
    };
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center text-red-600">
        <h1 className="text-3xl font-bold mb-4">خطأ في جلب المنتجات</h1>
        <p>{error}</p>
        <p>يرجى المحاولة لاحقاً.</p>
      </div>
    );
  }

  return (
    <div className="mx-10 py-8">
      <div className="flex flex-col mb-12">
        <SubTitle title="كل العطور" />
      </div>

      <Suspense
        fallback={
          <div className="mx-auto py-8 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        }
      >
        <div className="flex flex-col-reverse lg:flex-row gap-6">
          <div className="order-1 lg:order-none">
            <FilterControls currentSearchParams={searchParamsAwaited} />
          </div>
          <div className="flex-1">
            {/* 🚨 هنا هتستخدم productsData.products.length */}
            {productsData.products.length === 0 ? (
              <p className="text-center text-gray-600 dark:text-gray-400">
                لا توجد منتجات مطابقة لمعايير البحث.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 🚨 هنا هتستخدم productsData.products.map */}
                {productsData.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Suspense>

      <div className="mt-10">
        <PaginationControls
          currentPage={productsData.currentPage}
          totalPages={productsData.totalPages} // 🚨 تم الإصلاح هنا
        />
      </div>
    </div>
  );
}
