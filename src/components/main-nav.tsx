import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center gap-x-4 lg:gap-x-6", className)}
      {...props}
    >
      <Link
        href="/products"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        المنتجات
      </Link>
      
       <Link
        href="/categories"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        الفئات
      </Link>
      
       <Link
        href="/products"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        الاكثر مبيعا
      </Link>
      
    
    </nav>
  )
}

