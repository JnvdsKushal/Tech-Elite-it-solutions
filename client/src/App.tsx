"use client"

import * as React from "react"
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion"
import { 
  Menu, 
  X, 
  ChevronDown, 
  MapPin, 
  Calendar, 
  Users, 
  Award,
  BookOpen,
  Code,
  Briefcase,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Star,
  ArrowRight,
  CheckCircle2,
  Building2,
  GraduationCap,
  TrendingUp
} from "lucide-react"
import { Suspense, lazy, useRef, useState, useEffect } from "react"

const Spline = lazy(() => import("@splinetool/react-spline"))

// Utility function
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(" ")
}

// Button Component
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          variant === "default" && "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/30",
          variant === "outline" && "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
          variant === "ghost" && "hover:bg-gray-100",
          size === "default" && "h-11 px-6 py-2",
          size === "sm" && "h-9 px-4 text-xs",
          size === "lg" && "h-12 px-8 text-base",
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

// Card Component
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("rounded-2xl border border-gray-200 bg-white shadow-sm", className)}
      {...props}
    />
  )
)
Card.displayName = "Card"

// Input Component
const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
)
Input.displayName = "Input"

// Textarea Component
const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
)
Textarea.displayName = "Textarea"

// Spline Scene Component
interface SplineSceneProps {
  scene: string
  className?: string
}

function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense 
      fallback={
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  )
}

// Navigation Component
interface NavItem {
  to?: string
  text: string
  items?: {
    text: string
    description?: string
    to: string
  }[]
}

const Navigation: React.FC<{ items: NavItem[]; currentPage: string; onNavigate: (page: string) => void }> = ({ 
  items, 
  currentPage,
  onNavigate 
}) => (
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
              <button
                className="flex items-center gap-x-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
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

// Header Component
const Header: React.FC<{
  currentPage: string
  onNavigate: (page: string) => void
}> = ({ currentPage, onNavigate }) => {
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
    { to: "booking", text: "Booking / Demo" },
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
          <button 
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">TechSolutions</span>
          </button>

          <Navigation items={menuItems} currentPage={currentPage} onNavigate={onNavigate} />

          <div className="hidden lg:flex items-center gap-4">
            <Button variant="outline" onClick={() => onNavigate("login")}>
              Login
            </Button>
            <Button onClick={() => onNavigate("register")}>
              Register
            </Button>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
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
                        onClick={() => {
                          onNavigate(item.to!)
                          setIsMobileMenuOpen(false)
                        }}
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
                            onClick={() => {
                              onNavigate(subItem.to)
                              setIsMobileMenuOpen(false)
                            }}
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
                  <Button variant="outline" onClick={() => { onNavigate("login"); setIsMobileMenuOpen(false) }}>
                    Login
                  </Button>
                  <Button onClick={() => { onNavigate("register"); setIsMobileMenuOpen(false) }}>
                    Register
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

// Footer Component
const Footer: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const footerLinks = [
    {
      title: "Company",
      links: [
        { label: "About Us", page: "about" },
        { label: "Services", page: "services" },
        { label: "Contact", page: "contact" }
      ]
    },
    {
      title: "Courses",
      links: [
        { label: "Online Courses", page: "online-courses" },
        { label: "Offline Courses", page: "offline-courses" },
        { label: "Placements", page: "placements" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Booking", page: "booking" },
        { label: "FAQs", page: "home" },
        { label: "Help Center", page: "contact" }
      ]
    }
  ]

  return (
    <footer className="bg-gradient-to-br from-gray-50 to-blue-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">TechSolutions</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Empowering careers through quality IT education and training.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                <button
                  key={idx}
                  className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-all"
                >
                  <Icon className="w-5 h-5 text-gray-600" />
                </button>
              ))}
            </div>
          </div>

          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-semibold text-gray-900 mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <button
                      onClick={() => onNavigate(link.page)}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} TechSolutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-600">
            <button className="hover:text-blue-600">Privacy Policy</button>
            <button className="hover:text-blue-600">Terms of Service</button>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Home Page
const HomePage: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Web Development",
      description: "Full-stack development with modern frameworks"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "IT Training",
      description: "Comprehensive courses for all skill levels"
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Career Support",
      description: "Job placement and career guidance"
    }
  ]

  const stats = [
    { value: "5000+", label: "Students Trained" },
    { value: "95%", label: "Placement Rate" },
    { value: "50+", label: "Expert Trainers" },
    { value: "100+", label: "Partner Companies" }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section with 3D Background */}
      <motion.section 
        style={{ scale, opacity }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
          >
            Transform Your IT Career
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-lg"
          >
            Industry-leading training programs with 100% placement support
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="text-lg">
              Explore Courses <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20">
              Book Demo
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600">
              Comprehensive IT solutions for your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full hover:shadow-2xl transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// About Page
const AboutPage: React.FC = () => {
  const features = [
    { icon: <Award className="w-6 h-6" />, title: "Industry Experts", desc: "Learn from professionals" },
    { icon: <Users className="w-6 h-6" />, title: "Small Batches", desc: "Personalized attention" },
    { icon: <CheckCircle2 className="w-6 h-6" />, title: "Certified Programs", desc: "Recognized certifications" },
    { icon: <TrendingUp className="w-6 h-6" />, title: "Career Growth", desc: "Placement assistance" }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a leading IT training institute dedicated to shaping the future of technology professionals
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To provide world-class IT education and training that empowers individuals to achieve their career goals and contribute to the technology industry.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe in practical, hands-on learning combined with industry-relevant curriculum to ensure our students are job-ready from day one.
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 h-full">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                To be the most trusted and preferred IT training partner, recognized for excellence in education and student success.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We envision a future where every aspiring IT professional has access to quality education and opportunities to thrive in the digital economy.
              </p>
            </Card>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 text-center hover:shadow-xl transition-all">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Services Page
const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: <Code className="w-10 h-10" />,
      title: "Web Development",
      description: "Full-stack development training with React, Node.js, and modern frameworks",
      features: ["Frontend Development", "Backend Development", "Database Design", "API Integration"]
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: "Mobile Development",
      description: "Build native and cross-platform mobile applications",
      features: ["React Native", "Flutter", "iOS Development", "Android Development"]
    },
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: "Cloud Computing",
      description: "Master cloud platforms and DevOps practices",
      features: ["AWS", "Azure", "Docker", "Kubernetes"]
    },
    {
      icon: <GraduationCap className="w-10 h-10" />,
      title: "Data Science",
      description: "Learn data analysis, machine learning, and AI",
      features: ["Python", "Machine Learning", "Data Visualization", "Deep Learning"]
    },
    {
      icon: <Building2 className="w-10 h-10" />,
      title: "Cybersecurity",
      description: "Protect systems and networks from digital attacks",
      features: ["Network Security", "Ethical Hacking", "Security Auditing", "Compliance"]
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "Digital Marketing",
      description: "Master online marketing strategies and tools",
      features: ["SEO", "Social Media", "Content Marketing", "Analytics"]
    }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive IT training programs designed to make you industry-ready
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, rotateY: 5 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Card className="p-8 h-full hover:shadow-2xl transition-all duration-300">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Online Courses Page
const OnlineCoursesPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const courses = [
    {
      title: "Full Stack Web Development",
      duration: "6 months",
      level: "Beginner to Advanced",
      price: "$999",
      rating: 4.8,
      students: 1250,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"
    },
    {
      title: "React & Next.js Masterclass",
      duration: "3 months",
      level: "Intermediate",
      price: "$699",
      rating: 4.9,
      students: 890,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop"
    },
    {
      title: "Python for Data Science",
      duration: "4 months",
      level: "Beginner",
      price: "$799",
      rating: 4.7,
      students: 1100,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop"
    },
    {
      title: "Cloud Computing with AWS",
      duration: "5 months",
      level: "Intermediate",
      price: "$899",
      rating: 4.8,
      students: 750,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
    },
    {
      title: "Mobile App Development",
      duration: "4 months",
      level: "Beginner to Advanced",
      price: "$849",
      rating: 4.6,
      students: 680,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
    },
    {
      title: "Cybersecurity Fundamentals",
      duration: "3 months",
      level: "Beginner",
      price: "$749",
      rating: 4.9,
      students: 920,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop"
    }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Online Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn at your own pace with our comprehensive online training programs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-blue-600">
                    {course.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {course.duration}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium">{course.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">{course.level}</span>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => onNavigate("course-detail")}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Offline Courses Page
const OfflineCoursesPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const courses = [
    {
      title: "Intensive Bootcamp - Full Stack",
      duration: "12 weeks",
      schedule: "Mon-Fri, 9 AM - 5 PM",
      location: "Tech Campus, Downtown",
      price: "$2,999",
      seats: 15,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
    },
    {
      title: "Weekend Workshop - React",
      duration: "8 weeks",
      schedule: "Sat-Sun, 10 AM - 4 PM",
      location: "Innovation Hub, City Center",
      price: "$1,499",
      seats: 20,
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop"
    },
    {
      title: "Corporate Training - DevOps",
      duration: "4 weeks",
      schedule: "Flexible timing",
      location: "On-site or Campus",
      price: "$3,499",
      seats: 10,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Offline Courses</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hands-on training with expert instructors in our state-of-the-art facilities
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-blue-600">
                    {course.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {course.title}
                  </h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-start text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{course.duration} • {course.schedule}</span>
                    </div>
                    <div className="flex items-start text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                      <span>{course.location}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      <span>{course.seats} seats available</span>
                    </div>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => onNavigate("course-detail")}
                  >
                    Enroll Now
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Placements Page
const PlacementsPage: React.FC = () => {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)

  useEffect(() => {
    const timer1 = setInterval(() => {
      setCount1(prev => prev < 95 ? prev + 1 : 95)
    }, 20)
    const timer2 = setInterval(() => {
      setCount2(prev => prev < 5000 ? prev + 50 : 5000)
    }, 10)
    const timer3 = setInterval(() => {
      setCount3(prev => prev < 150 ? prev + 2 : 150)
    }, 20)

    return () => {
      clearInterval(timer1)
      clearInterval(timer2)
      clearInterval(timer3)
    }
  }, [])

  const companies = [
    "Google", "Microsoft", "Amazon", "Meta", "Apple",
    "Netflix", "Tesla", "Adobe", "Salesforce", "Oracle",
    "IBM", "Intel", "Cisco", "SAP", "VMware"
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      image: "https://i.pravatar.cc/150?img=1",
      quote: "The training program was exceptional. I landed my dream job within 2 months of completion!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Full Stack Developer at Microsoft",
      image: "https://i.pravatar.cc/150?img=2",
      quote: "Best decision of my career. The placement support was outstanding.",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Data Scientist at Amazon",
      image: "https://i.pravatar.cc/150?img=3",
      quote: "Practical training with real-world projects. Highly recommend!",
      rating: 5
    }
  ]

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Placements</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of successful graduates working at top companies
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">{count1}%</div>
              <div className="text-gray-600">Placement Rate</div>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-8 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">{count2}+</div>
              <div className="text-gray-600">Students Placed</div>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">{count3}+</div>
              <div className="text-gray-600">Partner Companies</div>
            </Card>
          </motion.div>
        </div>

        {/* Companies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Hiring Partners
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-6">
            {companies.map((company, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                <Card className="p-6 flex items-center justify-center h-24 hover:shadow-lg transition-all">
                  <span className="font-bold text-gray-700">{company}</span>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Success Stories
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="p-6 h-full">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Course Detail Page
const CourseDetailPage: React.FC = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Full Stack Web Development
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Master modern web development with React, Node.js, and MongoDB
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    4.8 (1,250 reviews)
                  </span>
                  <span className="flex items-center">
                    <Users className="w-5 h-5 mr-1" />
                    1,250 students
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-5 h-5 mr-1" />
                    6 months
                  </span>
                </div>
              </div>

              <Card className="p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "HTML, CSS, and JavaScript fundamentals",
                    "React and modern frontend frameworks",
                    "Node.js and Express backend development",
                    "MongoDB and database design",
                    "RESTful API development",
                    "Authentication and security",
                    "Deployment and DevOps basics",
                    "Real-world project experience"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h2>
                <div className="space-y-4">
                  {[
                    { title: "Introduction to Web Development", lessons: 12 },
                    { title: "Frontend Development with React", lessons: 24 },
                    { title: "Backend Development with Node.js", lessons: 20 },
                    { title: "Database Design and MongoDB", lessons: 16 },
                    { title: "Full Stack Project", lessons: 8 }
                  ].map((module, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">{module.title}</h3>
                        <span className="text-sm text-gray-600">{module.lessons} lessons</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <Card className="p-8">
                <div className="text-4xl font-bold text-gray-900 mb-6">$999</div>
                <Button size="lg" className="w-full mb-4">
                  Enroll Now
                </Button>
                <Button size="lg" variant="outline" className="w-full mb-6">
                  Book Demo
                </Button>
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">6 months</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level</span>
                    <span className="font-medium">Beginner to Advanced</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Certificate</span>
                    <span className="font-medium">Yes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Placement Support</span>
                    <span className="font-medium">100%</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Booking Page
const BookingPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    date: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Demo booking submitted successfully!")
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Book a Demo</h1>
          <p className="text-xl text-gray-600">
            Schedule a free demo session with our expert instructors
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Course Interest
                  </label>
                  <select
                    className="flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    required
                  >
                    <option value="">Select a course</option>
                    <option value="fullstack">Full Stack Development</option>
                    <option value="react">React Masterclass</option>
                    <option value="python">Python for Data Science</option>
                    <option value="cloud">Cloud Computing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <Textarea
                  placeholder="Tell us about your learning goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Book Demo Session
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

// Login Page
const LoginPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ email: "", password: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Login successful!")
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md px-6"
      >
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <button type="button" className="text-blue-600 hover:text-blue-700">
                Forgot password?
              </button>
            </div>

            <Button type="submit" size="lg" className="w-full">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              onClick={() => onNavigate("register")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

// Register Page
const RegisterPage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    alert("Registration successful!")
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md px-6"
      >
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
            <p className="text-gray-600">Start your learning journey today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <Input
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => onNavigate("login")}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

// Contact Page
const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Message sent successfully!")
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Get in touch with our team
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <Card className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-600">info@techsolutions.com</p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Address</h3>
                  <p className="text-gray-600">
                    123 Tech Street<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Main App Component
const ITSolutionsWebsite: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("home")

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage />
      case "about":
        return <AboutPage />
      case "services":
        return <ServicesPage />
      case "online-courses":
        return <OnlineCoursesPage onNavigate={setCurrentPage} />
      case "offline-courses":
        return <OfflineCoursesPage onNavigate={setCurrentPage} />
      case "placements":
        return <PlacementsPage />
      case "course-detail":
        return <CourseDetailPage />
      case "booking":
        return <BookingPage />
      case "login":
        return <LoginPage onNavigate={setCurrentPage} />
      case "register":
        return <RegisterPage onNavigate={setCurrentPage} />
      case "contact":
        return <ContactPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
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
      <Footer onNavigate={setCurrentPage} />
    </div>
  )
}

export default ITSolutionsWebsite
