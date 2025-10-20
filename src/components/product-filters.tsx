// src/components/FilterControls.tsx
"use client";

import axiosApp from "@/lib/axios";
import { Category } from "@/types/product";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface FilterControlsProps {
  currentSearchParams: {
    category_id?: string;
    gender?: "men" | "women" | "unisex";
    min_price?: string;
    max_price?: string;
    sort?: string;
    type?: string;
    search?: string;
  };
}

export function FilterControls({ currentSearchParams }: FilterControlsProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState("1");
  const searchParams = useSearchParams();
  const DEFAULT_MIN_PRICE = 0;
  const DEFAULT_MAX_PRICE = 1000;

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
  const [search, setSearch] = useState(currentSearchParams.search || "");
  // 🚨 هنا هنظبط الـ state بتاع السلايدر
  const initialMinPrice =
    parseFloat(currentSearchParams.min_price || "") || DEFAULT_MIN_PRICE;
  const initialMaxPrice =
    parseFloat(currentSearchParams.max_price || "") || DEFAULT_MAX_PRICE;
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Math.max(DEFAULT_MIN_PRICE, initialMinPrice), // ضمان أن القيمة ليست أقل من الحد الأدنى
    Math.min(DEFAULT_MAX_PRICE, initialMaxPrice), // ضمان أن القيمة ليست أكبر من الحد الأقصى
  ]);
  useEffect(() => {
    setCategoryId(currentSearchParams.category_id || "");
    setGender(currentSearchParams.gender || "");
    setTypes(currentSearchParams.type || "");
  }, [currentSearchParams]);

  const applyFilters = () => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (categoryId) newParams.set("category_id", categoryId);
    else newParams.delete("category_id");
    if (gender) newParams.set("gender", gender);
    else newParams.delete("gender");
    // 🚨 تطبيق قيم السلايدر
    if (priceRange[0] !== DEFAULT_MIN_PRICE) {
      newParams.set("min_price", priceRange[0].toString());
    } else {
      newParams.delete("min_price");
    }

    if (priceRange[1] !== DEFAULT_MAX_PRICE) {
      newParams.set("max_price", priceRange[1].toString());
    } else {
      newParams.delete("max_price");
    }
    if (sort) newParams.set("sort", sort);
    else newParams.delete("sort");
    if (types) newParams.set("type", types);
    else newParams.delete("type");
    if (search) newParams.set("search", search);
    else newParams.delete("search");
    newParams.set("page", "1");
    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="bg-gray-100 p-2 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        الفلاتر
      </h3>
      <div className="flex flex-col gap-4 w-full">
        <div>
          <label
            htmlFor="search"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            البحث
          </label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="بحث عن منتج..."
          />
        </div>
        {/* Category Filter */}
        <div>
          <label
            htmlFor="category"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            الفئات
          </label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="كل الفئات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل الفئات</SelectItem>{" "}
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name.ar}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="sort">ترتيب</label>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="ترتيب" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_high_to_low">السعر: اعلى</SelectItem>
              <SelectItem value="price_low_to_high">السعر: ادنى</SelectItem>
              <SelectItem value="top_rated">الاعلي تقييما</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Gender Filter */}
        <div>
          <label
            htmlFor="gender"
            className="block text-gray-700 dark:text-gray-300 mb-2"
          >
            الجنس
          </label>
          <Select
            value={gender}
            onValueChange={(value: "" | "men" | "women" | "unisex") =>
              setGender(value)
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="الكل" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="men">رجالي</SelectItem>
              <SelectItem value="women">نسائي</SelectItem>
              <SelectItem value="unisex">للجنسين</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="type">النوع</label>
          <Select value={types} onValueChange={setTypes}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="الكل" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">صباحي</SelectItem>
              <SelectItem value="2">مسائي</SelectItem>
              <SelectItem value="3">حمضي</SelectItem>
              <SelectItem value="4">شوجري</SelectItem>
              <SelectItem value="5">توابل</SelectItem>
              <SelectItem value="6">خشبي</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            نطاق السعر
          </label>
          <div className="flex justify-between items-center text-sm text-gray-800 dark:text-gray-200">
            <span>{priceRange[1]} جنيه</span> {/* عرض الحد الأقصى الحالي */}
            <span>{priceRange[0]} جنيه</span> {/* عرض الحد الأدنى الحالي */}
          </div>
          <Slider
            min={DEFAULT_MIN_PRICE}
            max={DEFAULT_MAX_PRICE}
            step={10} // ممكن تخليها 1 عشان تكون أدق أو 10 لسهولة الاستخدام
            value={priceRange}
            onValueChange={(value: [number, number]) => setPriceRange(value)}
            className="w-full [&>span:first-child]:h-2 [&>span:first-child]:bg-primary [&>span:first-child]:rounded-full [&>span:first-child>span]:h-full [&>span:first-child>span]:bg-primary dark:[&>span:first-child>span]:bg-primary [&>span:first-child>span]:rounded-full"
          />
        </div>
        <button
          onClick={applyFilters}
          className="mt-6 px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
        >
          تطبيق الفلاتر
        </button>
      </div>
    </div>
  );
}
