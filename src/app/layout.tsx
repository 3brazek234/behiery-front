// app/layout.tsx

import type { Metadata } from "next";
import "./globals.css";
import { Tajawal } from "next/font/google"; // تأكد من إنك بتستخدم Next.js Font Optimization
import { Navbar } from "@/components/navbar";
import AutoStart from "@/components/auto-start";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/Footer";

const tajawal = Tajawal({ // 🚨 غيرت اسم المتغير عشان ميتعارضش مع الـ Poppins اللي مش مستخدم
  subsets: ["arabic"], // غالباً هتكون arabic للـ Tajawal
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: '--font-tajawal', // ممكن تستخدم variable name للـ Tailwind
});

// 🚨 كل الـ SEO Meta Tags هتتحط هنا
export const metadata: Metadata = {
  // Primary SEO Meta Tags
  title: "بحيري للعطور – المتجر الإلكتروني الرسمي | Behiry Perfume – Official Online Store",
  description: "تسوق الآن من متجر بحيري للعطور الإلكتروني - أكبر تشكيلة عطور فاخرة، عطور رجالي ونسائي، توصيل سريع لجميع المحافظات، . اطلب عطرك المفضل اليوم!",
  keywords: [
    "متجر بحيري للعطور", "بحيري اون لاين", "شراء عطور اون لاين مصر", "Behiry Online Store", "Behiry E-shop",
    "تسوق عطور", "شراء عطور من النت", "متجر عطور الكتروني", "عطور للبيع اون لاين", "Buy Perfumes Online Egypt",
    "عطور بحيري", "محمد بحيري للعطور", "Behiry Perfumes", "Egyptian Perfumes Online Store",
    "عطور رجالي اون لاين", "عطور نسائي للبيع", "عطور يونيسكس", "Men's Cologne Online", "Women's Perfume Shop",
    "عطور فاخرة للبيع", "عطور ماركات عالمية", "عطور اصلية 100%", "Luxury Perfumes for Sale", "Authentic Brands",
    "تركيب عطور", "خلط عطور مخصص", "عطور مركبة", "Custom Perfume Blending", "Mix Your Scent",
    "توصيل عطور مصر", "شحن مجاني", "توصيل سريع", "Free Shipping Egypt", "Fast Delivery",
    "توصيل القاهرة", "توصيل الإسكندرية", "توصيل لجميع المحافظات", "Cairo Delivery", "Alexandria Shipping",
    "دفع عند الاستلام", "الدفع كاش", "طرق دفع آمنة", "Cash on Delivery", "Secure Payment",
    "الأكثر مبيعاً", "منتجات الأكثر مبيعاً", "Best Seller Perfumes", "Top Selling Fragrances",
    "عروض عطور", "تخفيضات", "خصومات خاصة", "Perfume Offers", "Discounts", "Special Deals",
    "عطر شانيل", "عطر ديور", "عطر كالفن كلاين", "عطر توم فورد", "Chanel", "Dior", "Calvin Klein", "Tom Ford",
    "عطور ثابتة", "عطور تدوم طويلا", "Long Lasting Perfume", "High Performance Fragrance",
    "سيت عطور", "مجموعات هدايا", "بوكسات عطور", "Gift Sets", "Perfume Bundles",
    "عينات عطور", "Sample Perfumes", "Testers Available", "Try Before Buy",
    "عطر 50 مل", "عطر 100 مل", "عطر بخاخ", "50ml Perfume", "100ml Fragrance", "Spray Perfume",
    "اضف للسلة", "اطلب الآن", "عربة التسوق", "Add to Cart", "Order Now", "Shopping Cart",
    "منتجات جديدة", "وصل حديثاً", "New Arrivals", "Latest Perfumes", "Fresh Collection",
    "تقييمات العملاء", "آراء المشترين", "Customer Reviews", "Product Ratings",
    "أفضل الأسعار", "عطور بسعر الجملة", "اسعار مخفضة", "Best Prices", "Wholesale Prices", "Affordable",
    "ضمان الجودة", "منتجات أصلية", "Quality Guarantee", "100% Authentic Products",
    "خدمة العملاء 24/7", "Customer Support", "استشارات عطرية مجانية", "Free Consultation",
    "متجر العطور الأول في مصر", "Egypt's Leading Online Perfume Store",
    "تطبيق بحيري", "Behiry App", "تسوق من الموبايل", "Mobile Shopping"
  ],
  authors: [{ name: "Behiry Perfume" }], // استخدم array لـ authors
  robots: {
    index: true, // index, follow
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  applicationName: "Behiry Perfume Online Store",
  referrer: "origin-when-cross-origin",
  // Icons & Favicons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // لو عندك apple icon
  },
  manifest: "/site.webmanifest", // لو عندك webmanifest

  // Canonical URL
  alternates: {
    canonical: 'https://onlinestore.behiry-perfume.com/',
  },

  // Open Graph Meta Tags (Facebook & WhatsApp)
  openGraph: {
    type: "website",
    url: "https://onlinestore.behiry-perfume.com/",
    title: "بحيري للعطور – المتجر الإلكتروني الرسمي | Behiry Perfume – Official Online Store",
    description: "تسوق الآن من متجر بحيري للعطور الإلكتروني - أكبر تشكيلة عطور فاخرة، عطور رجالي ونسائي، توصيل سريع لجميع المحافظات، . اطلب عطرك المفضل اليوم!",
    images: [
      {
        url: "https://onlinestore.behiry-perfume.com/images/og-store-image.png",
        width: 1200,
        height: 630,
        alt: "Behiry Perfume Online Store Image",
      },
    ],
    siteName: "Behiry Perfume Online Store",
    locale: "ar_EG",
  },

  // Twitter Card Meta Tags
  twitter: {
    card: "summary_large_image",
    site: "@behiryperfume", // لو عندك حساب تويتر
    creator: "@behiryperfume", // لو عندك حساب تويتر
    title: "بحيري للعطور – المتجر الإلكتروني الرسمي | تسوق العطور الفاخرة اونلاين",
    description: "تسوق الآن من متجر بحيري للعطور الإلكتروني - أكبر تشكيلة عطور فاخرة، توصيل سريع، ",
    images: [
      "https://onlinestore.behiry-perfume.com/images/og-store-image.png",
    ],
  },
  // Google Site Verification
  verification: {
    google: "", // حط الـ content بتاعك هنا
  },
  // Optional: Language & Charset (Next.js بيعملها تلقائيًا)
  // لكن لو عايز تحدد charset بشكل صريح، ممكن تضيفها هنا
  // viewport: {
  //   width: 'device-width',
  //   initialScale: 1,
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" suppressHydrationWarning dir="rtl" className={tajawal.variable}> {/* 🚨 استخدم الـ CSS variable هنا */}
      <body className={`${tajawal.className} dark:bg-gray-900 `}>
        <Toaster />
        <AutoStart />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}