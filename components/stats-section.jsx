"use client"

import { motion, useInView } from "framer-motion"
import { DollarSign, TrendingUp, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState, useRef } from "react"

const stats = [
  {
    icon: DollarSign,
    value: 500,
    suffix: "K+",
    label: "Managed",
  },
  {
    icon: TrendingUp,
    value: 2,
    suffix: "M+",
    label: "Generated",
  },
  {
    icon: Users,
    value: 12,
    suffix: "+",
    label: "Businesses Helped",
  },
]

function AnimatedCounter({ value, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime
      const duration = 1000

      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * value))

        if (progress < 1) requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    }
  }, [isInView, value])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

export default function StatsSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 relative bg-black">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4"
          >
            Our Proven Results
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed px-4"
          >
            See how we've transformed campaigns from struggling to scaling by implementing our proprietary systems and
            data-driven strategies.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="relative h-full">
                  {/* Minimal card with subtle border */}
                  <div className="bg-black border border-gray-800 hover:border-gray-700 transition-all duration-300 h-full p-8 sm:p-10 flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4">
                    
                    {/* Simple icon */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                    </div>

                    {/* Large number */}
                    <div className="text-4xl sm:text-5xl md:text-6xl font-light text-white tracking-tight">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </div>

                    {/* Label */}
                    <div className="text-xs sm:text-sm text-gray-500 font-normal tracking-wide uppercase">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
