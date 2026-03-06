import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavItem {
  to?: string
  text: string
  items?: {
    text: string
    description?: string
    to: string
  }[]
}

interface NavigationProps {
  items: NavItem[]
  currentPage: string
  onNavigate: (page: string) => void
}

export const Navigation: React.FC<NavigationProps> = ({ items, currentPage, onNavigate }) => (
  <nav className="hidden lg:block">
    <ul className="flex gap-x-8 items-center">
      {items.map(({ to, text, items: subItems }, index) => {
        const isActive = to === currentPage
        return (
          <li
            className={cn("relative group", subItems && subItems.length > 0 && "group")}
            key={index}
          >
            {to ? (
              <button
                onClick={() => onNavigate(to)}
                className={cn(
                  "flex items-center gap-x-1 text-sm font-medium transition-colors",
                  isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                )}
              >
                {text}
              </button>
            ) : (
              <button className="flex items-center gap-x-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
                {text}
                {subItems && subItems.length > 0 && (
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                )}
              </button>
            )}

            {subItems && subItems.length > 0 && (
              <div
                className={cn(
                  "absolute left-0 top-full pt-4 w-[280px]",
                  "pointer-events-none opacity-0 invisible",
                  "transition-all duration-300 ease-out",
                  "group-hover:pointer-events-auto group-hover:opacity-100 group-hover:visible",
                  "transform origin-top scale-95 group-hover:scale-100"
                )}
              >
                <ul className="rounded-2xl border border-gray-200 bg-white shadow-xl p-2">
                  {subItems.map((item, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => onNavigate(item.to)}
                        className="w-full text-left flex flex-col gap-1 rounded-xl p-3 hover:bg-blue-50 transition-colors"
                      >
                        <span className="text-sm font-medium text-gray-900">{item.text}</span>
                        {item.description && (
                          <span className="text-xs text-gray-500">{item.description}</span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        )
      })}
    </ul>
  </nav>
)