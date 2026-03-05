import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlowingCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function GlowingCard({ icon, title, description }: GlowingCardProps) {
  return (
    <div className="relative group rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-3">
      
      {/* Glow Effect */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-125 transition duration-500" />

      {/* Animated Dot */}
      <div className="absolute w-4 h-4 bg-blue-600 rounded-full animate-[moveDot_6s_linear_infinite]" />

      {/* Icon */}
      <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 text-white shadow-md mb-6 group-hover:scale-110 transition">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
}