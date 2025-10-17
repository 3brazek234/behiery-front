"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Search, Menu, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MainNav } from "./main-nav"
import { CartIcon } from "./cartIcon"
import Image from "next/image"
import useUserStore from "@/store/user"
import UserDropdown from "./UserDropdown"
import { MobileNav } from "./MobileNav"
// 🚨 استيراد MobileNav الجديد


export function Navbar() {
  const { user } = useUserStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 🚨 حالة جديدة للتحكم في فتح الـ Sheet
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container flex h-16 items-center px-4">
        {/* Mobile Menu Button - 🚨 استخدم الحالة الجديدة هنا */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="القائمة"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-56 sm:max-w-xs md:max-w-sm p-0 bg-gradient-to-br from-gray-50 to-white border-gray-200">
            <SheetHeader className="p-4 border-b border-gray-200 bg-orange-400 text-white">
              <SheetTitle className="text-xl font-semibold  text-white text-center flex items-center justify-center">
                بحيري للعطور
              </SheetTitle>
            </SheetHeader>
            <MobileNav closeSheet={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-x-2 flex-shrink-0 me-auto md:me-0" aria-label="الرئيسية"> {/* 🚨 me-auto عشان يدفعه لليسار في الموبايل */}
          <Image 
            src="https://behiryperfume.com/images/logo.svg" 
            alt="شعار بحيري للعطور" 
            width={40} 
            height={40} 
            className="size-8 md:size-10" 
            priority
          />
          <span className="font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent hidden md:inline-block text-lg">
           بحيري للعطور – المتجر الإلكتروني الرسمي

          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-x-6">
          <MainNav className="ps-10" />
        </div>

        {/* Icons */}
        <div className="flex items-center gap-x-2 md:gap-x-3 ms-auto"> {/* 🚨 ms-auto عشان يدفعه لليمين في الديسكتوب */}
          {/* Search */}
          <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
            <DialogTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="بحث"
              >
                <Search className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] rounded-lg">
              <DialogHeader>
                <DialogTitle className="text-right">بحث في المنتجات</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSearch} className="grid gap-4 py-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="ابحث عن منتجات..."
                    className="pl-10 pr-4 py-5 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
                <Button type="submit" className="w-full py-5">
                  بحث
                </Button>
              </form>
            </DialogContent>
          </Dialog>

          {/* User Account */}
          {user ? (
            <UserDropdown />
          ) : (
            <Link href={'/login'} className="inline-flex">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="حسابي"
              >
                <User className="h-5 w-5" />
              </Button>
            </Link>
          )}

          {/* Cart */}
          <Link href={'/cart'} className="relative inline-flex">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative"
              aria-label="سلة التسوق"
            >
              <CartIcon />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

// 🚨 MainNav هنا عشان لو فيه لينكات تانية
// function MainNav({ className }: React.HTMLAttributes<HTMLElement>) {
//   return (
//     <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
//       <Link
//         href="/products"
//         className="text-sm font-medium transition-colors hover:text-primary"
//       >
//         العطور
//       </Link>
//       <Link
//         href="/best-sellers"
//         className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
//       >
//         الأكثر مبيعا
//       </Link>
//       {/* ... أي روابط أخرى للـ Desktop Nav */}
//     </nav>
//   );
// }