import * as React from "react"
import { cn } from "@/lib/utils"

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        `
        group
        relative
        rounded-2xl
        border border-slate-200
        bg-white
        shadow-sm
        transition-all duration-300 ease-in-out
        hover:-translate-y-1
        hover:shadow-xl
        hover:bg-slate-50
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
        text-slate-700
        transition-colors duration-300
        group-hover:text-slate-900
        `,
        className
      )}
      {...props}
    />
  )
}