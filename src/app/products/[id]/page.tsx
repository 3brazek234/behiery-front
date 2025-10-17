import { notFound } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import { getProductByID } from "@/apis/products";
import { ReviewsView } from "@/components/Reviews";
import { AddToCart } from "@/components/AddToCart";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const product = await getProductByID(id);

  if (!product) {
    notFound();
  }

  const descriptionHtml = { __html: product.description.ar };
  const averageRating = parseFloat(product.rate);
  console.log(product);
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/10 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="aspect-square relative bg-gray-50 rounded-xl overflow-hidden group">
              <Image
                src={product.images[0] || "/placeholder.png"}
                alt={product.name.ar}
                fill
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {product.name.ar}
                </h1>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.round(averageRating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground mr-2">
                    ({product.reviews_count} تقييم)
                  </span>
                </div>

                <p className="text-3xl font-bold text-primary">
                  {product.options[0]?.price
                    ? `${parseFloat(product.options[0].price).toFixed(2)} ر.س`
                    : "غير متاح"}
                </p>
              </div>

              {/* Product Meta */}
              <div className="space-y-6">
                {/* Categories */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[150px]">
                    <h3 className="text-sm font-medium text-gray-500 mb-1.5">
                      الفئات
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.categories.length > 0 ? (
                        product.categories.map((cat) => (
                          <span
                            key={cat.id}
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-primary/10 text-primary"
                          >
                            {cat.name.ar}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">غير متاح</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Types */}
                <div className="flex flex-wrap gap-4">
                  <div className="flex-1 min-w-[150px]">
                    <h3 className="text-sm font-medium text-gray-500 mb-1.5">
                      الأنواع
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.types.length > 0 ? (
                        product.types.map((type) => (
                          <span
                            key={type.id}
                            className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700"
                          >
                            {type.type.ar}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">غير متاح</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="flex flex-wrap gap-4">
                  <div className="bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      الجنس
                    </h3>
                    <p className="text-gray-800 font-medium">
                      {product.gender ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                          {product.gender.charAt(0).toUpperCase() +
                            product.gender.slice(1)}
                        </span>
                      ) : (
                        <span className="text-gray-500">غير محدد</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="rounded-lg flex flex-col gap-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    الفئة العمرية
                  </h3>
                  <p className="text-gray-800 font-medium">
                    {product.age_group ? (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                        {product.age_group.charAt(0).toUpperCase() +
                          product.age_group.slice(1)}
                      </span>
                    ) : (
                      <span className="text-gray-500">غير محددة</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Add to Cart */}
              <div>
                <AddToCart product={product} />
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="p-8 border-t border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
              وصف المنتج
            </h2>
            <div
              className="product-description-content text-gray-700 dark:text-gray-300 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={descriptionHtml}
            />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              آراء العملاء
            </h2>
            <ReviewsView reviews={product.reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
