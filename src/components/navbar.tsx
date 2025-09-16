"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Search, Menu } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
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

export function Navbar() {
  const {user} = useUserStore()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setIsSearchOpen(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-center">
      <div className="container flex h-16 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0 pt-10">
            <MobileNav />
          </SheetContent>
        </Sheet>
        <Link href="/" className="mr-6 flex items-center gap-x-2">
          <Image src="https://behiryperfume.com/images/logo.svg" alt="Logo" width={40} height={40} className="size-8" />
          <span className="font-bold bg-gradient-to-r from-primary via-primary to-primary/60 bg-clip-text text-transparent hidden md:inline-block">
          {/* Behiry Perfume – Official Online Store */}
بحيري للعطور {"–"} المتجر الإلكتروني الرسمي
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end gap-x-4">
          <nav className="flex items-center gap-x-2">
            <MainNav className="hidden md:flex ps-10" />
            <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="w-9 px-0">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">بحث</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>بحث في المنتجات</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSearch} className="grid gap-4 py-4">
                  <Input
                    id="search"
                    placeholder="بحث في المنتجات"
                    className="col-span-3"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit">بحث</Button>
                </form>
              </DialogContent>
            </Dialog>
            {user ? <UserDropdown /> :<Link href={'/login'}>
              <Button variant="ghost" size="icon" className="w-9 px-0">
                <User className="h-4 w-4" />
                <span className="sr-only">الحساب</span>
              </Button>
            </Link>}
            <Link href={'/cart'}>
              <Button variant="ghost" size="icon" className="w-9 px-0">
                <CartIcon />
                <span className="sr-only">العربة</span>
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

function MobileNav() {
  return (
    <nav className="flex flex-col space-y-4 mt-6 px-4">
      
      <Link
        href="/products"
        className="text-sm font-medium py-3 transition-colors hover:text-primary"
      >
        العطور
      </Link>
       {/* <Link
        href="/categories"
        className="text-sm font-medium py-3 transition-colors hover:text-primary"
      >
        الفئات
      </Link> */}
       <Link
        href="/cart"
        className="text-sm font-medium py-3 transition-colors hover:text-primary"
      >
        السلة
      </Link>
      <Link
        href="https://behiryperfume.com/about"
        className="text-sm font-medium py-3 transition-colors hover:text-primary"
      >
      من نحن        
      </Link>
      <Link
        href="https://behiryperfume.com/contact"
        className="text-sm font-medium py-3 transition-colors hover:text-primary"
      >
        اتصل بنا

      </Link>
    </nav>
  )
}

