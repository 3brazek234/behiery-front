// src/components/FilterControls.tsx
"use client";

import axiosApp from "@/lib/axios";
import { Category } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface FilterControlsProps {
  currentSearchParams: {
    category_id?: string;
    gender?: "men" | "women" | "unisex";
    min_price?: string;
    max_price?: string;
    sort?: string;
  };
}

export function FilterControls({ currentSearchParams }: FilterControlsProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const searchParams = useSearchParams();
  useEffect(() => {
    async function getCategory() {
      const res = await fetch("https://test.behiryperfume.com/api/categories");
      const data = await res.json();
      console.log(data, "res.data");
      setCategories(data.data);
    }
    getCategory();
  }, []);
  const [categoryId, setCategoryId] = useState(
    currentSearchParams.category_id || ""
  );
  const [gender, setGender] = useState(currentSearchParams.gender || "");
  const [minPrice, setMinPrice] = useState(currentSearchParams.min_price || "");
  const [maxPrice, setMaxPrice] = useState(currentSearchParams.max_price || "");
  const [sort, setSort] = useState(currentSearchParams.sort || "");
  useEffect(() => {
    setCategoryId(currentSearchParams.category_id || "");
    setGender(currentSearchParams.gender || "");
    setMinPrice(currentSearchParams.min_price || "");
    setMaxPrice(currentSearchParams.max_price || "");
  }, [currentSearchParams]);

  const applyFilters = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (categoryId) newParams.set("category_id", categoryId);
    else newParams.delete("category_id");
    if (gender) newParams.set("gender", gender);
    else newParams.delete("gender");
    if (minPrice) newParams.set("min_price", minPrice);
    else newParams.delete("min_price");
    if (maxPrice) newParams.set("max_price", maxPrice);
    else newParams.delete("max_price");
    if (sort) newParams.set("sort", sort);
    else newParams.delete("sort");
    newParams.set("page", "1");
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="bg-gray-100 p-2 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        الفلاتر
      </h3>
      <div className="flex flex-col gap-4 w-full">
        {/* Category Filter */}
        <div>
          <label
            htmlFor="category"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            القسم
          </label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">كل الأقسام</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name.ar}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort">ترتيب</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">ترتيب</option>
            <option value="price_high_to_low">السعر: اعلى</option>
            <option value="price_low_to_high">السعر: ادنى</option>
          </select>
        </div>
        {/* Gender Filter */}
        <div>
          <label
            htmlFor="gender"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            النوع
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) =>
              setGender(e.target.value as "men" | "women" | "unisex")
            }
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="">الكل</option>
            <option value="men">رجالي</option>
            <option value="women">نسائي</option>
            <option value="unisex">للجنسين</option>
          </select>
        </div>

        {/* Price Range Filters */}
        <div>
          <label
            htmlFor="minPrice"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            الحد الأدنى للسعر
          </label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="مثال: 50"
          />
        </div>
        <div>
          <label
            htmlFor="maxPrice"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            الحد الأقصى للسعر
          </label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="مثال: 200"
          />
        </div>
      </div>
      <button
        onClick={applyFilters}
        className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
      >
        تطبيق الفلاتر
      </button>
    </div>
  );
}
