'use client'

import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import Loader from '@/components/admin/Loader'

export default function SettingsPage() {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings-admin'],
    queryFn: async () => {
      const res = await fetch('/api/settings')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })

  if (isLoading) return <Loader />

  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white mb-8">Site Settings</h1>
        
        <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6">
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">Site Name</p>
              <p className="text-white">{settings?.siteName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Email</p>
              <p className="text-white">{settings?.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Phone</p>
              <p className="text-white">{settings?.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Location</p>
              <p className="text-white">{settings?.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Default Calendly Link</p>
              <p className="text-purple-400 text-sm truncate">{settings?.defaultCalendlyLink}</p>
            </div>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-6">Edit functionality can be added as needed.</p>
      </motion.div>
    </div>
  )
}

