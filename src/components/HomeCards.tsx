"use client";
import { Product } from "@/types/product";
import { Check, ShoppingBag, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { AddToCart } from "./AddToCart";

function HomeCards({ product }: { product: Product }) {
  const averageRating = parseFloat(product.rate);
  const [isAdded, setIsAdded] = useState(false);
  const [open, setOpen] = useState(false);
  const handleAddToCard = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  return (
    <div key={product.id} className="group relative">
      <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300 group-hover:duration-200"></div>

      <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden flex flex-col">
        {/* Image Section */}
        <Link href={`/products/${product.id}`}>
          <div className="relative w-full aspect-[4/3] overflow-hidden ">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Image
              src={product.images[0] || "/placeholder-perfume.png"}
              alt={product.name.ar || product.name.en || "منتج خصم"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Discount Badge */}
            {product.options &&
              product.options.length > 0 &&
              product.options[0].discount_percentage && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-10 flex items-center gap-1">
                  <span>خصم</span>
                  <span>
                    {product.options &&
                      product.options.length > 0 &&
                      product.options[0].discount_percentage?.toString()}
                    %
                  </span>
                </div>
              )}
          </div>
        </Link>

        {/* Content Section */}
        <div className="p-5 flex flex-col flex-grow gap-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-orange-500 transition-colors">
            {product.name.ar || product.name.en}
          </h3>
          {/* Category */}
          <p className="text-sm text-muted-foreground line-clamp-1">
            {product?.categories
              ?.map((cat) => cat.name.ar ?? cat.name.en)
              .join(", ")}
          </p>
          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`size-2 md:size-4 ${
                  i < Math.round(averageRating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1 hidden md:block">
              ({product.reviews_count} تقييم)
            </span>
          </div>
          {/* Types */}
          <div className="hidden md:flex gap-2">
            {product.types?.slice(0, 3).map((type) => (
              <Badge
                key={type.id}
                variant="outline"
                className="text-xs border-orange-300 bg-orange-50 text-orange-700 rounded-full px-2 py-0.5"
              >
                {type.type.ar ?? type.type.en}
              </Badge>
            ))}
          </div>
          {/* Price Display */}
          <div className="mt-auto border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-baseline justify-between">
              <div>
                {/* appear when product on sale */}
                {product.options[0].sale_price && (
                  <p className="text-gray-400 dark:text-gray-500 line-through text-sm mb-0.5">
                    {product.options[0].original_price}جنيه
                  </p>
                )}
                <p className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  {product.options[0].sale_price || product.options[0].price}{" "}
                  جنيه
                </p>
              </div>
            </div>
          </div>
          {/* Add to Cart */}
          <Button
            className="md:w-full font-semibold transition-all duration-300 bg-primary hover:bg-primary/90"
            disabled={isAdded}
          >
            {isAdded ? (
              <>
                <Check className="md:me-2 size-3 md:size-4" />{" "}
                <span className="hidden md:block">تمت الإضافة</span>
              </>
            ) : (
              <>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger className="flex items-center">
                    <ShoppingCart className="md:me-2 size-3 md:size-4" />{" "}
                    <span className="text-xs md:text-base">أضف إلى السلة</span>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="flex justify-between items-center pt-3">
                      <h1 className="text-3xl font-bold text-gray-900">
                        {product.name.ar}
                      </h1>
                      <p className="text-2xl font-semibold text-gray-700">
                        {product.options[0]?.price
                          ? parseFloat(product.options[0].price).toFixed(2)
                          : "غير متاح"}
                      </p>
                    </div>
                    <AddToCart setAdded={setOpen} product={product} />
                  </DialogContent>
                </Dialog>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomeCards;
