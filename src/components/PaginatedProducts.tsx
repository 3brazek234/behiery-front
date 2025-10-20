// src/components/PaginationControls.tsx
"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { useEffect, useState } from 'react'; // 🚨 استيراد useState و useEffect

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🚨 state لتحديد عدد الصفحات اللي هتظهر بناءً على حجم الشاشة
  const [maxPagesToShow, setMaxPagesToShow] = useState(5); // القيمة الافتراضية

  // 🚨 useEffect عشان يحدد maxPagesToShow بناءً على عرض الشاشة
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) { // breakpoint لـ sm في Tailwind
        setMaxPagesToShow(3); // مثلاً 3 أزرار على الموبايل
      } else if (window.innerWidth < 768) { // breakpoint لـ md في Tailwind
        setMaxPagesToShow(5); // 5 أزرار على الشاشات الصغيرة والمتوسطة
      } else {
        setMaxPagesToShow(7); // 7 أزرار على الشاشات الكبيرة
      }
    }

    // استدعيها مرة واحدة عند التحميل
    handleResize();

    // أضف event listener للتغيير لما حجم الشاشة يتغير
    window.addEventListener('resize', handleResize);

    // cleanup function لإزالة الـ event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []); // [] عشان يتنفذ مرة واحدة عند الـ mount

  const handlePageChange = (newPage: number) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set('page', newPage.toString());
    router.push(`?${newParams.toString()}`);
  };

  const getPageNumbers = () => {
    const pages = [];
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
      const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrentPage) {
        startPage = 1;
        endPage = maxPagesToShow;
      } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
        startPage = totalPages - maxPagesToShow + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrentPage;
        endPage = currentPage + maxPagesAfterCurrentPage;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8 flex-wrap"> {/* 🚨 تعديل الـ gap و إضافة flex-wrap */}
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        variant="outline" // 🚨 استخدم variant من shadcn/ui/button
        className="h-9 px-4 py-2" // 🚨 تحسين حجم الزرار
      >
        السابق
      </Button>

      {/* عرض زر الصفحة الأولى والـ dots لو لازم الأمر */}
      {pageNumbers[0] > 1 && (
        <>
          <Button
            onClick={() => handlePageChange(1)}
            variant="outline"
            className="h-9 px-4 py-2"
          >
            1
          </Button>
          {pageNumbers[0] > 2 && <span className="h-9 px-2 py-2 flex items-end text-gray-600 dark:text-gray-400">...</span>} {/* 🚨 تعديل الـ styling للـ dots */}
        </>
      )}

      {/* أزرار الصفحات الرئيسية */}
      {pageNumbers.map((page) => (
        <Button
          key={page}
          onClick={() => handlePageChange(page)}
          variant={page === currentPage ? "default" : "outline"} // 🚨 استخدام variant
          className={`h-9 px-4 py-2 ${
            page === currentPage
              ? 'bg-primary text-primary-foreground hover:bg-primary/90' // لون الزرار النشط
              : 'text-foreground' // لون الأزرار العادية
          }`}
        >
          {page}
        </Button>
      ))}

      {/* عرض زر الصفحة الأخيرة والـ dots لو لازم الأمر */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && <span className="h-9 px-2 py-2 flex items-end text-gray-600 dark:text-gray-400">...</span>} {/* 🚨 تعديل الـ styling للـ dots */}
          <Button
            onClick={() => handlePageChange(totalPages)}
            variant="outline"
            className="h-9 px-4 py-2"
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        variant="outline"
        className="h-9 px-4 py-2"
      >
        التالي
      </Button>
    </div>
  );
}