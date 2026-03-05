"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Layout
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

// Pages
import { HomePage } from "@/pages/HomePage"
import AboutPage from "@/pages/AboutPage"
import { ServicesPage } from "@/pages/ServicesPage"
import { OnlineCoursesPage } from "@/pages/OnlineCoursesPage"
import { OfflineCoursesPage } from "@/pages/OfflineCoursesPage"
import { PlacementsPage } from "@/pages/PlacementsPage"
import { CourseDetailPage } from "@/pages/CourseDetailPage"
import { BookingPage } from "@/pages/BookingPage"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { ContactPage } from "@/pages/ContactPage"

const ITSolutionsWebsite: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("home")

  const renderPage = () => {
    switch (currentPage) {
      case "home":           return <HomePage />
      case "about":          return <AboutPage />
      case "services":       return <ServicesPage />
      case "online-courses": return <OnlineCoursesPage onNavigate={setCurrentPage} />
      case "offline-courses":return <OfflineCoursesPage onNavigate={setCurrentPage} />
      case "placements":     return <PlacementsPage />
      case "course-detail":  return <CourseDetailPage />
      case "booking":        return <BookingPage />
      case "login":          return <LoginPage onNavigate={setCurrentPage} />
      case "register":       return <RegisterPage onNavigate={setCurrentPage} />
      case "contact":        return <ContactPage />
      default:               return <HomePage />
    }
  }

 return (
  <div className="min-h-screen bg-white">

    {/* Hide header for login/register */}
    {currentPage !== "login" && currentPage !== "register" && (
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
    )}

    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderPage()}
      </motion.div>
    </AnimatePresence>

    {/* Hide footer for login/register */}
    {currentPage !== "login" && currentPage !== "register" && (
      <Footer onNavigate={setCurrentPage} />
    )}

  </div>
)
}

export default ITSolutionsWebsite