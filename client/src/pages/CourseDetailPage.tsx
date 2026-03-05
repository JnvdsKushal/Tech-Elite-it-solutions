"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Star, Users, Calendar, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export const CourseDetailPage: React.FC = () => {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Full Stack Web Development</h1>
                <p className="text-xl text-gray-600 mb-6">
                  Master modern web development with React, Node.js, and MongoDB
                </p>
                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    4.8 (1,250 reviews)
                  </span>
                  <span className="flex items-center">
                    <Users className="w-5 h-5 mr-1" />1,250 students
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-5 h-5 mr-1" />6 months
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
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="sticky top-24">
              <Card className="p-8">
                <div className="text-4xl font-bold text-gray-900 mb-6">₹999</div>
                <Button size="lg" className="w-full mb-4">Enroll Now</Button>
                <Button size="lg" variant="outline" className="w-full mb-6">Book Demo</Button>
                <div className="space-y-4 text-sm">
                  {[
                    { label: "Duration", value: "6 months" },
                    { label: "Level", value: "Beginner to Advanced" },
                    { label: "Certificate", value: "Yes" },
                    { label: "Placement Support", value: "100%" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium">{item.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}