"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Check, Eye } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/store/cartStore";
import { AddToCart } from "./AddToCart";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
// ''''''
export function ProductCard({
  product,
  height,
}: {
  product: Product;
  height?: number;
}) {
  const [isAdded, setIsAdded] = useState(false);
  const [open, setOpen] = useState(false);
  const handleAddToCard = () => {
    // addToCart({
    //   ...product,
    //   image: product.images[0],
    //   price: parseFloat(product.options[0]?.price || '0'),
    //   name: product.name,
    // })
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };
  const [isMobile, setIsMobile] = useState(false);
  const averageRating = parseFloat(product.rate);
  const price = parseFloat(product.options[0]?.price || "0").toFixed(2);
  const salePrice = product.options[0]?.sale_price
    ? parseFloat(product.options[0].sale_price).toFixed(2)
    : null;

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);
  return (
    <Card className="flex flex-col justify-between overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-gray-800 rounded-xl">
      <CardContent className={`p-0 !h-[${height}px]`}>
        <div className="aspect-[4/3] relative overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.png"}
            alt={product.name.ar}
            fill
            className="object-cover transition-transform duration-300 h-auto group-hover:scale-105 cursor-pointer"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 !cursor-pointer">
            <Link href={`/products/${product.id}`}>
              <Button
                variant="secondary"
                size="sm"
                className="font-semibold bg-white/90 hover:bg-white text-gray-800"
              >
                <Eye className="mr-2 h-4 w-4" /> عرض{" "}
                <span className="hidden md:block">التفاصيل</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="p-2 md:p-4 space-y-1 md:space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm md:text-lg font-semibold line-clamp-1 text-gray-900 dark:text-white">
                {product.name.ar}
              </h2>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {product?.categories
                  ?.map((cat) => cat.name.ar ?? cat.name.en)
                  .join(", ")}
              </p>
            </div>
            {product.created_at >
              new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString() && (
              <Badge
                variant="secondary"
                className="text-xs bg-green-100 text-green-800"
              >
                جديد
              </Badge>
            )}
          </div>

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

          <div className="flex items-center gap-2 mb-2">
            {salePrice ? (
              <>
                <p className="text-lg md:text-xl font-bold text-red-600 dark:text-red-400">
                  {salePrice} ج.م
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  {price}
                </p>
              </>
            ) : (
              <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                {price} ج.م
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {product.types?.length > 0 && isMobile ? (
              <div className="flex gap-2">
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
            ) : (
              product?.types?.map((type) => (
                <Badge
                  key={type.id}
                  variant="outline"
                  className="text-xs border-orange-300 bg-orange-50 text-orange-700 rounded-full px-2 py-0.5"
                >
                  {type.type.ar ?? type.type.en}
                </Badge>
              ))
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-1 md:p-4 pt-0 flex gap-2 justify-center">
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
      </CardFooter>
    </Card>
  );
}
