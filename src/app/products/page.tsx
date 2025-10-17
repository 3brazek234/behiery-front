"use client";

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Filter } from "@/components/product-filters";
import { PaginatedProducts } from "@/components/PaginatedProducts";
import { getProducts } from "@/apis/products";
import { Product, Category, Type } from "@/types/product";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<Type[]>([]);

  // Get filter values from URL
  const bestSeller = searchParams.get("best") === "best-seller";
  const sales = searchParams.get("sales") === "best-seller";
  const categoryId = searchParams.get("category_id") || "";
  const gender = searchParams.get("gender") || "";
  const typeId = searchParams.get("type") || "";
  const searchQuery = searchParams.get("search") || "";
  const minPrice = parseFloat(searchParams.get("min_price") || "300");
  const maxPrice = parseFloat(searchParams.get("max_price") || "2000");
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 12;

  // Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const products = bestSeller
          ? await getProducts("/products/best-seller")
          : await getProducts();

        setAllProducts(products);

         console.log(products, "products");
        // Extract unique categories and types
        const uniqueCategories = Array.from(
          new Map(
            products.flatMap((p) => p?.categories || []).map((c) => [c.id, c])
          ).values()
        );

        const uniqueTypes = Array.from(
          new Map(
            products.flatMap((p) => p.types || []).map((t) => [t?.id, t])
          ).values()
        );

        setCategories(uniqueCategories);
        setTypes(uniqueTypes);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [bestSeller]);

  // Filter products based on search params
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Filter by category
      if (
        categoryId &&
        !product.categories?.some((cat) => cat.id.toString() === categoryId)
      ) {
        return false;
      }

      // Filter by gender
      if (gender && product.gender !== gender) {
        return false;
      }

      // Filter by type
      if (
        typeId &&
        !product.types.some((type) => type.id.toString() === typeId)
      ) {
        return false;
      }

      // Filter by price range
      if (
        Number(product.options[0]?.price) < minPrice ||
        Number(product.options[0]?.price) > maxPrice
      ) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase();
        const matchesName =
          product.name?.ar?.toLowerCase().includes(searchLower) ||
          product.name?.en?.toLowerCase().includes(searchLower);
        const matchesDescription =
          product.description?.ar?.toLowerCase().includes(searchLower) ||
          product.description?.en?.toLowerCase().includes(searchLower);

        if (!matchesName && !matchesDescription) {
          return false;
        }
      }

      return true;
    });
  }, [
    allProducts,
    categoryId,
    gender,
    typeId,
    minPrice,
    maxPrice,
    searchQuery,
  ]);
  
  // Pagination logic
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const pagination = {
    total: filteredProducts.length,
    per_page: itemsPerPage,
    current_page: currentPage,
    last_page: Math.ceil(filteredProducts.length / itemsPerPage),
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        {bestSeller ? "الاكثر مبيعا" : sales ? "البيعات" : "عطور بحيري"}
      </h1>
      <div className="flex flex-col-reverse lg:flex-row gap-8">
        {/* Filter section */}
        {!bestSeller && !sales && (
          <div className="lg:w-1/6 order-1 lg:order-none">
            <Filter categories={categories} types={types} />
          </div>
        )}

        {/* Products section */}
        <div className="flex-1">
          <PaginatedProducts
            products={paginatedProducts}
            pagination={pagination}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
}
