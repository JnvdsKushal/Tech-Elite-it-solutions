import * as React from "react"
import { cn } from "@/lib/utils"

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `
        group
        relative
        rounded-2xl
        border border-gray-300
        bg-gray-300
        shadow-sm
        transition-all duration-300 ease-in-out
        hover:-translate-y-1
        hover:bg-gray-400
        hover:shadow-lg
        `,
        className
      )}
      {...props}
    />
  )
}

export function CardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `
        p-6
        text-gray-800
        transition-colors duration-300
        group-hover:text-gray-900
        `,
        className
      )}
      {...props}
    />
  )
}