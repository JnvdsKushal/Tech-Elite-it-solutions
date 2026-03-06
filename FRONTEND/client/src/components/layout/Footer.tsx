import * as React from "react"
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

interface FooterProps {
  onNavigate: (page: string) => void
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
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
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="TechSolutions Logo" className="h-30 w-35 object-contain" />
              <span className="text-xl font-bold text-gray-900"></span>
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