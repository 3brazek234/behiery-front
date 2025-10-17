'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '@/types/product';
import { cn } from '@/lib/utils';

type Pagination = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
};

interface PaginatedProductsProps {
  products: Product[];
  pagination: Pagination;
  currentPage: number;
}

export function PaginatedProducts({ products, pagination, currentPage }: PaginatedProductsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const goToNextPage = () => {
    if (currentPage < pagination.last_page) {
      handlePageChange(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // Generate page numbers with ellipsis
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const totalPages = pagination.last_page;
    const current = currentPage;
    const delta = 1; // number of pages to show around current page

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= current - delta && i <= current + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }

    return pages;
  };

  return (
    <div className="flex flex-col gap-8">
      {products.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-500 text-lg py-16">
          <p>لا يوجد منتجات لعرضها.</p>
        </div>
      ) : (
        <>
          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product?.id} className="w-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination.last_page > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8 flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className="flex items-center gap-1 px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <ChevronRight className="h-4 w-4" />
                السابق
              </Button>

              {/* Page numbers with ellipsis */}
              {getPageNumbers().map((page, index) => (
                <span key={index}>
                  {page === '...' ? (
                    <span className="px-4 py-2">...</span>
                  ) : (
                    <Button
                      variant={currentPage === page ? "default" : "outline"}
                      onClick={() => handlePageChange(Number(page))}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md min-w-[40px]",
                        currentPage === page
                          ? "bg-orange-600 text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600"
                          : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                      )}
                    >
                      {page}
                    </Button>
                  )}
                </span>
              ))}

              <Button
                variant="outline"
                onClick={goToNextPage}
                disabled={currentPage === pagination.last_page}
                className="flex items-center gap-1 px-3 py-2 text-sm rounded-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                التالي
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}