"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Navigation, NavItem } from "@/components/layout/Navigation"

interface HeaderProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems: NavItem[] = [
    { to: "home", text: "Home" },
    { to: "about", text: "About" },
    { to: "services", text: "Services" },
    {
      text: "Courses",
      items: [
        { text: "Online Courses", description: "Learn from anywhere", to: "online-courses" },
        { text: "Offline Courses", description: "In-person training", to: "offline-courses" },
        { text: "Placements", description: "Career opportunities", to: "placements" }
      ]
    },
   
    { to: "contact", text: "Contact" }
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => onNavigate("home")} className="flex items-center gap-2">
            <div className="flex items-center gap-3 cursor-pointer">
              <img src="/logo.png" alt="TechSolutions Logo" className="h-15 w-35 object-contain" />
              <span className="text-xl font-bold text-gray-900"></span>
            </div>
          </button>

          <Navigation items={menuItems} currentPage={currentPage} onNavigate={onNavigate} />

          <div className="hidden lg:flex items-center gap-4">
            <Button variant="outline" onClick={() => onNavigate("login")}>Login</Button>
            <Button onClick={() => onNavigate("register")}>Register</Button>
          </div>

          <button className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 pb-4"
            >
              <div className="flex flex-col gap-2">
                {menuItems.map((item, idx) => (
                  <div key={idx}>
                    {item.to ? (
                      <button
                        onClick={() => { onNavigate(item.to!); setIsMobileMenuOpen(false) }}
                        className="w-full text-left px-4 py-2 rounded-xl hover:bg-gray-100"
                      >
                        {item.text}
                      </button>
                    ) : (
                      <div>
                        <div className="px-4 py-2 font-medium text-gray-900">{item.text}</div>
                        {item.items?.map((subItem, subIdx) => (
                          <button
                            key={subIdx}
                            onClick={() => { onNavigate(subItem.to); setIsMobileMenuOpen(false) }}
                            className="w-full text-left px-8 py-2 text-sm hover:bg-gray-100 rounded-xl"
                          >
                            {subItem.text}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex flex-col gap-2 mt-4 px-4">
                  <Button variant="outline" onClick={() => { onNavigate("login"); setIsMobileMenuOpen(false) }}>Login</Button>
                  <Button onClick={() => { onNavigate("register"); setIsMobileMenuOpen(false) }}>Register</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}