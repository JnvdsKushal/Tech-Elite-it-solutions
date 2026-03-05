"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Card } from "@/components/ui/card"

export const PlacementsPage: React.FC = () => {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)
  const [count3, setCount3] = useState(0)

  useEffect(() => {
    const timer1 = setInterval(() => setCount1(prev => prev < 95 ? prev + 1 : 95), 20)
    const timer2 = setInterval(() => setCount2(prev => prev < 5000 ? prev + 50 : 5000), 10)
    const timer3 = setInterval(() => setCount3(prev => prev < 150 ? prev + 2 : 150), 20)
    return () => { clearInterval(timer1); clearInterval(timer2); clearInterval(timer3) }
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Placements</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of successful graduates working at top companies
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            { count: `${count1}%`, label: "Placement Rate" },
            { count: `${count2}+`, label: "Students Placed" },
            { count: `${count3}+`, label: "Partner Companies" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-8 text-center">
                <div className="text-5xl font-bold text-blue-600 mb-2">{stat.count}</div>
                <div className="text-gray-600">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Companies */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Hiring Partners</h2>
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
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Success Stories</h2>
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
                    <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
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