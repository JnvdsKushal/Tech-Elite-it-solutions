"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Calendar, MapPin, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface OfflineCoursesPageProps {
  onNavigate: (page: string) => void
}

export const OfflineCoursesPage: React.FC<OfflineCoursesPageProps> = ({ onNavigate }) => {
  const courses = [
    {
      title: "Intensive Bootcamp - Full Stack",
      duration: "12 weeks",
      schedule: "Mon-Fri, 9 AM - 5 PM",
      location: "Tech Campus, Downtown",
      price: "₹2,999",
      seats: 15,
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
    },
    {
      title: "Weekend Workshop - React",
      duration: "8 weeks",
      schedule: "Sat-Sun, 10 AM - 4 PM",
      location: "Innovation Hub, City Center",
      price: "₹1,499",
      seats: 20,
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop"
    },
    {
      title: "Corporate Training - DevOps",
      duration: "4 weeks",
      schedule: "Flexible timing",
      location: "On-site or Campus",
      price: "₹3,499",
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
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-blue-600">
                    {course.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{course.title}</h3>
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
                  <Button className="w-full" onClick={() => onNavigate("course-detail")}>
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