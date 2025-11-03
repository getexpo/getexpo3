'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Save } from 'lucide-react'
import Loader from '@/components/admin/Loader'

export default function HomeContentPage() {
  const queryClient = useQueryClient()
  const [saving, setSaving] = useState(false)

  // Fetch home content
  const { data: content, isLoading } = useQuery({
    queryKey: ['home-content'],
    queryFn: async () => {
      const res = await fetch('/api/home')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })

  // Form setup
  const { register, handleSubmit, formState: { errors } } = useForm({
    values: content || {},
  })

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch('/api/home', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['home-content'])
      toast.success('Home content updated successfully!')
      setSaving(false)
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update content')
      setSaving(false)
    },
  })

  const onSubmit = (data) => {
    setSaving(true)
    updateMutation.mutate(data)
  }

  if (isLoading) return <Loader text="Loading home content..." />

  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 font-poppins">
          Home Page Content
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mb-6 sm:mb-8">
          Edit hero section, stats, and journey section content
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-8">
          {/* Hero Section */}
          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hero Title (Line 1)
                </label>
                <input
                  {...register('heroTitle1', { required: true })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="Transform Your Ad Spend"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Hero Title (Line 2)
                </label>
                <input
                  {...register('heroTitle2', { required: true })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="Into Real"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Typed Words (comma-separated)
                </label>
                <input
                  {...register('typedWords', { required: true })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="Customers,Revenue,Profit"
                />
                <p className="text-xs text-gray-500 mt-1">Separate words with commas</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sub-headline
                </label>
                <input
                  {...register('subHeadline', { required: true })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="And Bring The Growth You Deserve"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  {...register('description', { required: true })}
                  rows={3}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="We'll pinpoint where you are..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    CTA Button Text
                  </label>
                  <input
                    {...register('ctaText', { required: true })}
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                    placeholder="Work With Us"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    CTA Link (Calendly)
                  </label>
                  <input
                    {...register('ctaLink', { required: true })}
                    type="url"
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                    placeholder="https://calendly.com/..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Stats Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Big Stat ($600K)
                </label>
                <input
                  {...register('bigStat', { required: true })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="$600K"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Stats Text 1
                </label>
                <input
                  {...register('statsText1', { required: true })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="Get Exposure has profitably spent over"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Stats Text 2
                </label>
                <input
                  {...register('statsText2', { required: true })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="$600K in Ad spend"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Stats Text 3
                </label>
                <input
                  {...register('statsText3', { required: true })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="and generated over $2.4M."
                />
              </div>
            </div>
          </div>

          {/* Journey Section */}
          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Journey Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Journey Title (Line 1)
                </label>
                <input
                  {...register('journeyTitle1', { required: true })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="Where Are You in Your"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Journey Title (Line 2)
                </label>
                <input
                  {...register('journeyTitle2', { required: true })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="Advertising Journey"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Journey Description
                </label>
                <textarea
                  {...register('journeyDesc', { required: true })}
                  rows={3}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="We start by pinpointing..."
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}

