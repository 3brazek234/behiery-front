import { notFound } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import { getProductByID } from "@/apis/products";
import { ReviewsView } from "@/components/Reviews";
import { AddToCart } from "@/components/AddToCart";

export const dynamic = "force-dynamic"

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

  return (
    <div className="container mx-auto py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square relative">
          <Image
            src={product.images[0] || "/placeholder.png"}
            alt={product.name.ar}
            fill
            className="object-cover w-full h-full rounded-lg shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {product.name.ar}
          </h1>

          <p className="text-2xl font-semibold text-gray-700">
            {product.options[0]?.price
              ? parseFloat(product.options[0].price).toFixed(2)
              : "غير متاح"}
          </p>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(averageRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              ({product.reviews_count} تقييم)
            </span>
          </div>

        
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              الفئات
            </h2>
            <p className="text-gray-600">
              {product.categories.map((cat) => cat.name.ar).join(", ") ||
                "غير متاح"}
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              الأنواع
            </h2>
            <p className="text-gray-600">
              {product.types.map((type) => type.type.ar).join(", ") ||
                "غير متاح"}
            </p>
          </div>

          <div className="space-y-2">
            <p>
              <span className="font-semibold text-gray-700">الجنس: </span>
              {product.gender.charAt(0).toUpperCase() +
                product.gender.slice(1) || "غير متاح"}
            </p>
            <p>
              <span className="font-semibold text-gray-700">الفئة العمرية: </span>
              {product.age_group.charAt(0).toUpperCase() +
                product.age_group.slice(1) || "غير متاح"}
            </p>
          </div>
          <AddToCart product={product} />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          الوصف
        </h2>
        <div
          className="text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={descriptionHtml}
        />
      </div>
      <ReviewsView reviews={product.reviews} />
    </div>
  );
}
