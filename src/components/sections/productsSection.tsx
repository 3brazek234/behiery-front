"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import SectionLoading from "./SectionLoading";
import Link from "next/link";
import { ProductCard } from "../product-card";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import SubTitle from "../SubTitle";
import HomeCards from "../HomeCards";

const SliderProducts = dynamic(() => import("./slider"), {
  ssr: false,
  loading: () => <SectionLoading />,
});

type ProductType = any;
interface ProductSectionProps {
  title?: string;
  linkAll?: string;
  products?: ProductType[];
  isCarousel?: boolean;
}

export default function ProductSection({
  title,
  linkAll,
  products,
  isCarousel = true,
}: ProductSectionProps) {
  const pathname = usePathname();
  const isHome = pathname.split("/").length === 1 || pathname === "/";
  return (
    <section className="pb-4 bg-white dark:bg-gray-800 dark:text-white">
      <div className={`mx-auto container p-4 ${isHome && ""}`}>
        <div
          className={cn(
            "flex justify-between text-start",
            title && "border-b border-b-gray-200"
          )}
        >
          {title && (
       <SubTitle title={title} />
          )}
          {linkAll && (
            <Link href={linkAll}>
              <Button
                variant="outline"
                className="text-primary flex items-center font-semibold cursor-pointer"
              >
                عرض المزيد <ArrowLeft className="ms-2" />
              </Button>
            </Link>
          )}
        </div>
        {isCarousel ? (
          <SliderProducts>
            {products &&
              products?.length > 0 &&
              products?.map((product: any, index: any) => (
                <SwiperSlide key={index}>
                  <ProductCard product={product} height={380} />
                </SwiperSlide>
              ))}
          </SliderProducts>
        ) : (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {products &&
              products?.length > 0 &&
              products?.map((item: ProductType) => (
                <div key={item.id}>
                  <ProductCard product={item} height={380} />
                </div>
              ))}
          </div>
        )}
      </div>
    </section>
  );
}
