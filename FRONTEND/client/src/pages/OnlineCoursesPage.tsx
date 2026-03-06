"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Calendar, Users, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface OnlineCoursesPageProps {
  onNavigate: (page: string) => void
}

export const OnlineCoursesPage: React.FC<OnlineCoursesPageProps> = ({ onNavigate }) => {
  const courses = [
    {
      title: "Full Stack Web Development",
      duration: "6 months",
      level: "Beginner to Advanced",
      price: "₹999",
      rating: 4.8,
      students: 1250,
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop"
    },
    {
      title: "React & Next.js Masterclass",
      duration: "3 months",
      level: "Intermediate",
      price: "₹699",
      rating: 4.9,
      students: 890,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop"
    },
    {
      title: "Python for Data Science",
      duration: "4 months",
      level: "Beginner",
      price: "₹799",
      rating: 4.7,
      students: 1100,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop"
    },
    {
      title: "Cloud Computing with AWS",
      duration: "5 months",
      level: "Intermediate",
      price: "₹899",
      rating: 4.8,
      students: 750,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop"
    },
    {
      title: "Mobile App Development",
      duration: "4 months",
      level: "Beginner to Advanced",
      price: "₹849",
      rating: 4.6,
      students: 680,
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop"
    },
    {
      title: "Cybersecurity Fundamentals",
      duration: "3 months",
      level: "Beginner",
      price: "₹749",
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
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{course.title}</h3>
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
                  <Button className="w-full" onClick={() => onNavigate("course-detail")}>
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