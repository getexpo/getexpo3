'use client'

import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewPositionPage() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [saving, setSaving] = useState(false)

  // Form setup
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      slug: '',
      title: '',
      subtitle: '',
      description: '',
      calendlyLink: '',
      displayOrder: 0,
      isActive: true,
    },
  })

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch('/api/positions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to create')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['positions-admin'])
      queryClient.invalidateQueries(['positions'])
      toast.success('Position created!')
      setSaving(false)
      router.push('/admin/positions')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create')
      setSaving(false)
    },
  })

  const onSubmit = (data) => {
    setSaving(true)
    createMutation.mutate(data)
  }

  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/positions"
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 font-poppins">
              Create New Position
            </h1>
            <p className="text-gray-400">
              Add a new journey tab
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Content */}
          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Content</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Slug * (URL identifier)
                </label>
                <input
                  {...register('slug', { required: 'Slug is required' })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="my-position"
                />
                {errors.slug && (
                  <p className="text-red-400 text-xs mt-1">{errors.slug.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Unique identifier for this position</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="Looking to Scale?"
                />
                {errors.title && (
                  <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subtitle *
                </label>
                <input
                  {...register('subtitle', { required: 'Subtitle is required' })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="Ready to scale above $25k-$30k daily"
                />
                {errors.subtitle && (
                  <p className="text-red-400 text-xs mt-1">{errors.subtitle.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="If you're ready to scale..."
                />
                {errors.description && (
                  <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Calendly Link *
                </label>
                <input
                  {...register('calendlyLink', { 
                    required: 'Calendly link is required',
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: 'Must be a valid URL'
                    }
                  })}
                  type="url"
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="https://calendly.com/..."
                />
                {errors.calendlyLink && (
                  <p className="text-red-400 text-xs mt-1">{errors.calendlyLink.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Display Order
                </label>
                <input
                  {...register('displayOrder', { valueAsNumber: true })}
                  type="number"
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                />
                <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  {...register('isActive')}
                  type="checkbox"
                  id="isActive"
                  className="w-4 h-4"
                />
                <label htmlFor="isActive" className="text-sm text-gray-300">
                  Active (visible on website)
                </label>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Creating...' : 'Create Position'}
            </button>
            
            <Link
              href="/admin/positions"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 transition-all"
            >
              Cancel
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

