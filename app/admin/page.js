'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { FileText, Briefcase, Image as ImageIcon, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function AdminDashboard() {
  // Fetch statistics
  const { data: caseStudies } = useQuery({
    queryKey: ['case-studies'],
    queryFn: async () => {
      const res = await fetch('/api/case-studies')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })

  const { data: positions } = useQuery({
    queryKey: ['positions'],
    queryFn: async () => {
      const res = await fetch('/api/positions')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })

  const { data: logos } = useQuery({
    queryKey: ['logos'],
    queryFn: async () => {
      const res = await fetch('/api/logos')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })

  const stats = [
    {
      name: 'Case Studies',
      value: caseStudies?.length || 0,
      icon: Briefcase,
      link: '/admin/case-studies',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
    },
    {
      name: 'Positions',
      value: positions?.length || 0,
      icon: FileText,
      link: '/admin/positions',
      color: 'text-pink-400',
      bgColor: 'bg-pink-500/10',
    },
    {
      name: 'Brand Logos',
      value: logos?.length || 0,
      icon: ImageIcon,
      link: '/admin/media',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
    },
    {
      name: 'Solution Types',
      value: 3,
      icon: TrendingUp,
      link: '/admin/solutions',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
    },
  ]

  const quickLinks = [
    { name: 'Edit Home Page', href: '/admin/home', description: 'Update hero section and main content' },
    { name: 'Manage Case Studies', href: '/admin/case-studies', description: 'Add, edit, or remove case studies' },
    { name: 'Update Solutions', href: '/admin/solutions', description: 'Edit solution pages and steps' },
    { name: 'Contact Settings', href: '/admin/contact', description: 'Manage contact information' },
    { name: 'Logo Management', href: '/admin/logo', description: 'Upload and manage site logo' },
    { name: 'Media Library', href: '/admin/media', description: 'Upload and manage images' },
    { name: 'Site Settings', href: '/admin/settings', description: 'Configure site-wide settings' },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-poppins">
          Dashboard
        </h1>
        <p className="text-gray-400">
          Welcome back! Here&apos;s an overview of your content.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={stat.link}>
                <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6 hover:border-white/20 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-sm text-gray-400">{stat.name}</p>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white mb-4 font-poppins">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.05 }}
            >
              <Link href={link.href}>
                <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-5 hover:border-purple-500/50 transition-all group">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {link.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

