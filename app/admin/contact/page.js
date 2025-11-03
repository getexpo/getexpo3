'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Edit } from 'lucide-react'
import Loader from '@/components/admin/Loader'
import Link from 'next/link'

export default function ContactPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['contact-admin'],
    queryFn: async () => {
      const res = await fetch('/api/contact')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })

  if (isLoading) return <Loader />

  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 font-poppins">Contact Settings</h1>
            <p className="text-sm sm:text-base text-gray-400">View and manage contact section content</p>
          </div>
          <Link
            href="/admin/contact/edit"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base transition-all whitespace-nowrap"
          >
            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
            Edit
          </Link>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Contact Info</h3>
            {data?.infos?.map((info) => (
              <div key={info.id} className="mb-3">
                <p className="text-sm sm:text-base text-white font-medium">{info.title}</p>
                <p className="text-xs sm:text-sm text-gray-400">{info.details}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Benefits</h3>
            <ul className="space-y-2">
              {data?.benefits?.map((benefit) => (
                <li key={benefit.id} className="text-xs sm:text-sm text-gray-400">• {benefit.details}</li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Stats</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {data?.stats?.map((stat) => (
                <div key={stat.id} className="text-center">
                  <p className="text-xl sm:text-2xl font-bold text-white">{stat.title}</p>
                  <p className="text-xs sm:text-sm text-gray-400">{stat.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

