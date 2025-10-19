import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { getCategories } from "@/apis/categories";
import Image from "next/image";

export default async function CategoriesSection() {
  const categories = await getCategories()
  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <ScrollArea className="mx-auto w-full max-w-screen-xl px-4">
        <div className="w-full flex items-center gap-4 ">
          {
            categories && categories.length>0 && categories.map(item => {
              return <div key={item?.id} className="flex flex-col h-20 items-center gap-2 rounded-full shadow border">
                <Image src={item.picture} alt="" width={50} height={50} />
                <span>{item?.name?.ar}</span>
              </div>
            })
          }
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
}
