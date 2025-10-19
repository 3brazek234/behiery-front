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
        العطور
      </Link>
      
       <Link
        href="/most-sold"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        الأكثر مبيعا
      </Link>
  

      <Link
        href="https://behiryperfume.com/about"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
من نحن
      </Link>

      <Link
        href="https://behiryperfume.com/contact"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
اتصل بنا
</Link>
      
    
    </nav>
  )
}

