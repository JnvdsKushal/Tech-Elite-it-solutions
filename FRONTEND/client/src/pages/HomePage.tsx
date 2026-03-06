"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Code, Clock, ShieldCheck, BookOpen, Briefcase, Award,
  ArrowRight, CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { SplineScene } from "@/components/ui/splinescene"

export const HomePage: React.FC = () => {
  const { scrollYProgress } = useScroll()
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

const services = [
  {
    icon: <Code className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />,
    bg: "bg-gradient-to-br from-cyan-950/60 to-gray-900 border-cyan-500/20",
    titleColor: "text-cyan-300",
    textColor: "text-cyan-100/80",
    title: "Expert Trainers",
    description: "Learn from experienced professionals with real-world expertise.",
    features: ["Industry Experts", "Live Case Studies", "Hands-on Projects", "1:1 Mentorship"]
  },
  {
    icon: <Clock className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />,
    bg: "bg-gradient-to-br from-purple-950/60 to-gray-900 border-purple-500/20",
    titleColor: "text-purple-300",
    textColor: "text-purple-100/80",
    title: "Flexible Learning",
    description: "Designed to fit your schedule without compromising quality.",
    features: ["Online & Offline Modes", "Weekend Batches", "Recorded Sessions", "Flexible Timings"]
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />,
    bg: "bg-gradient-to-br from-emerald-950/60 to-gray-900 border-emerald-500/20",
    titleColor: "text-emerald-300",
    textColor: "text-emerald-100/80",
    title: "Comprehensive Courses",
    description: "Master in-demand skills across multiple domains.",
    features: ["Full Stack Development", "Cloud & DevOps", "Cybersecurity", "Data Science"]
  },
  {
    icon: <BookOpen className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />,
    bg: "bg-gradient-to-br from-blue-950/60 to-gray-900 border-blue-500/20",
    titleColor: "text-blue-300",
    textColor: "text-blue-100/80",
    title: "Modern Curriculum",
    description: "Stay ahead with constantly updated content and tools.",
    features: ["Latest Tech Stack", "Updated Syllabus", "Capstone Projects", "Practical Labs"]
  },
  {
    icon: <Briefcase className="w-6 h-6 text-indigo-400 drop-shadow-[0_0_8px_rgba(99,102,241,0.8)]" />,
    bg: "bg-gradient-to-br from-indigo-950/60 to-gray-900 border-indigo-500/20",
    titleColor: "text-indigo-300",
    textColor: "text-indigo-100/80",
    title: "Career Support",
    description: "We help you land your dream job confidently.",
    features: ["Resume Building", "Mock Interviews", "Placement Support", "Portfolio Development"]
  },
  {
    icon: <Award className="w-6 h-6 text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]" />,
    bg: "bg-gradient-to-br from-pink-950/60 to-gray-900 border-pink-500/20",
    titleColor: "text-pink-300",
    textColor: "text-pink-100/80",
    title: "Certifications",
    description: "Boost credibility with recognized certifications.",
    features: ["Industry Certificates", "Course Completion Proof", "Skill Validation", "Career Credibility"]
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
      {/* Hero Section */}
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
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6"
          >
            Transform Your IT Career
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-800 mb-8"
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
            <Button
              size="lg"
              variant="outline"
              className="text-lg border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
            >
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
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.value}</div>
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
              Why choose Tech Elite IT Solutions?
            </h2>
            <p className="text-xl text-gray-600">Comprehensive IT solutions for your success</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <Card className="p-8 h-full hover:shadow-2xl transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center text-sm text-gray-700">
                        <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <CheckCircle2 className="w-3 h-3 text-blue-600" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}