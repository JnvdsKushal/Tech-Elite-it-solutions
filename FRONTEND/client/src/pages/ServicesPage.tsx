"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Code, Clock, ShieldCheck, BookOpen, Briefcase, Award, CheckCircle2 } from "lucide-react"

export const ServicesPage: React.FC = () => {
  const services = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Expert Trainers",
      description: "Our instructors are industry experts with years of experience in their fields.",
      features: ["Industry Professionals", "Live Practical Sessions", "Real-world Projects", "Mentorship Support"]
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Flexible Learning Options",
      description: "Choose between online training or classroom sessions for maximum flexibility.",
      features: ["Online & Offline Modes", "Weekend Batches", "Recorded Sessions", "Flexible Timings"]
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Comprehensive Courses",
      description: "Wide range of IT training programs across multiple domains.",
      features: ["Software Development", "Cloud & DevOps", "Cybersecurity", "Data Science"]
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Cutting-Edge Curriculum",
      description: "Stay ahead with modern technologies and industry best practices.",
      features: ["Latest Tech Stack", "Updated Syllabus", "Hands-on Labs", "Capstone Projects"]
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Career Support",
      description: "We prepare you for real-world job opportunities.",
      features: ["Resume Building", "Mock Interviews", "Placement Assistance", "Portfolio Development"]
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certifications",
      description: "Gain industry-recognized certifications to boost your career.",
      features: ["Industry Certifications", "Course Completion Certificate", "Skill Validation", "Career Credibility"]
    }
  ]

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-gray-50 to-gray-100">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="relative group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200 overflow-hidden">
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-125 transition duration-500" />
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center text-sm text-gray-700">
                      <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}