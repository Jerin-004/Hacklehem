"use client"

import * as React from "react"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  items: Array<{
    label: string
    href?: string
    current?: boolean
  }>
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ items, className, ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn("flex items-center space-x-1 text-sm text-muted-foreground", className)}
        {...props}
      >
        <Link
          href="/home"
          className="flex items-center hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4" />
        </Link>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRight className="h-4 w-4 mx-1" />
            {item.href && !item.current ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  item.current && "text-foreground font-medium"
                )}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        ))}
      </nav>
    )
  }
)
Breadcrumb.displayName = "Breadcrumb"

export { Breadcrumb }