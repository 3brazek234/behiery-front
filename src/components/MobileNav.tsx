'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Home, ShoppingBag, Info, Phone, Heart, Settings, LogIn, LogOut, User } from 'lucide-react' // أيقونات جديدة
import useUserStore from "@/store/user" // لو بتستخدمها هنا برضه
import { Button } from "@/components/ui/button"
import { DropdownMenuSeparator } from "./ui/dropdown-menu"

interface MobileNavProps {
  closeSheet: () => void; // 🚨 دالة لإغلاق الـ Sheet
}

export function MobileNav({ closeSheet }: MobileNavProps) {
  const router = useRouter();
  const { user, logout } = useUserStore(); // 🚨 لو بتستخدم state الـ user هنا

  const handleLogout = () => {
    logout(); // دالة تسجيل الخروج من الـ store
    closeSheet(); // إغلاق الـ Sheet
    router.push('/'); // الرجوع للصفحة الرئيسية
  };

  return (
    <nav className="flex flex-col h-full overflow-y-auto pb-4 custom-scrollbar"> {/* 🚨 إضافة overflow-y-auto و custom-scrollbar */}
      {/* User Section (conditional rendering) */}
      <div className="p-4 bg-orange-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
        {user ? (
          <>
            <div className="size-10 rounded-full bg-orange-100 dark:bg-gray-700 flex items-center justify-center text-orange-600 dark:text-orange-400">
              <User className="size-5" />
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-gray-800 dark:text-white">أهلاً، {user.name || "مستخدم"}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400" aria-label="تسجيل الخروج">
              <LogOut className="h-5 w-5" />
            </Button>
          </>
        ) : (
          <Link href="/login" onClick={closeSheet} className="flex items-center gap-3 w-full text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors">
            <LogIn className="h-5 w-5" />
            <span className="font-medium">تسجيل الدخول / إنشاء حساب</span>
          </Link>
        )}
      </div>
      <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />

      {/* Main Links */}
      <div className="flex flex-col py-2">
        <NavLink href="/" icon={<Home className="size-5" />} label="الرئيسية" onClick={closeSheet} />
        <NavLink href="/products" icon={<ShoppingBag className="size-5" />} label="جميع المنتجات" onClick={closeSheet} />
        <NavLink href="/cart" icon={<ShoppingBag className="size-5" />} label="سلة التسوق" onClick={closeSheet} />
        
        {/* Accordion for Categories/Types (Optional - if you want nested links) */}
        {/* <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="px-6 py-4 text-base font-medium text-foreground/90 hover:bg-accent hover:text-primary transition-colors flex justify-between items-center w-full">
              <div className="flex items-center gap-3">
                <Menu className="size-5 text-gray-500 dark:text-gray-400" />
                <span>الفئات</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="ps-12">
              <NavLink href="/products?category_id=1" label="عطور رجالية" onClick={closeSheet} />
              <NavLink href="/products?category_id=2" label="عطور نسائية" onClick={closeSheet} />
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}

        <NavLink href="https://behiryperfume.com/about" icon={<Info className="size-5" />} label="من نحن" onClick={closeSheet} external />
        <NavLink href="https://behiryperfume.com/contact" icon={<Phone className="size-5" />} label="اتصل بنا" onClick={closeSheet} external />
      </div>

      <DropdownMenuSeparator className="my-2 bg-gray-200 dark:bg-gray-700" />

      {/* Additional Links / Footer */}
      <div className="flex flex-col py-2">
        {user && (
          <>
            {/* <NavLink href="/profile" icon={<Settings className="size-5" />} label="إعدادات الحساب" onClick={closeSheet} />
            <NavLink href="/favorites" icon={<Heart className="size-5" />} label="المفضلة" onClick={closeSheet} /> */}
            <Button variant="ghost" onClick={handleLogout} className="flex justify-start items-center gap-3 px-6 py-4 text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors">
              <LogOut className="size-5" />
              <span>تسجيل الخروج</span>
            </Button>
          </>
        )}
      </div>

      <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          نسعد بخدمتكم على مدار الساعة
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
          &copy; {new Date().getFullYear()} بحيري للعطور. جميع الحقوق محفوظة.
        </p>
      </div>
    </nav>
  )
}

// 🚨 Helper Component for Nav Links
interface NavLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  external?: boolean; // لو اللينك خارجي
}

function NavLink({ href, label, icon, onClick, external }: NavLinkProps) {
  const commonClasses = "flex items-center gap-3 px-6 py-4 text-base font-medium text-foreground/90 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-colors";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={commonClasses} onClick={onClick}>
        {icon && <span className="text-gray-500 dark:text-gray-400">{icon}</span>}
        <span>{label}</span>
      </a>
    );
  }

  return (
    <Link href={href} className={commonClasses} onClick={onClick}>
      {icon && <span className="text-gray-500 dark:text-gray-400">{icon}</span>}
      <span>{label}</span>
    </Link>
  );
}