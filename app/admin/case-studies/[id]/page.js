'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Save, ArrowLeft } from 'lucide-react'
import Loader from '@/components/admin/Loader'
import Link from 'next/link'

export default function EditCaseStudyPage() {
  const params = useParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [saving, setSaving] = useState(false)
  const isNew = params.id === 'new'

  // Fetch case study if editing
  const { data: caseStudy, isLoading } = useQuery({
    queryKey: ['case-study', params.id],
    queryFn: async () => {
      const res = await fetch(`/api/case-studies/${params.id}`)
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
    enabled: !isNew,
  })

  // Form setup
  const { register, handleSubmit, formState: { errors } } = useForm({
    values: isNew ? {
      category: '',
      title: '',
      slug: '',
      description: '',
      result1: '',
      result2: '',
      result3: '',
      displayOrder: 0,
      isPublished: true,
    } : caseStudy,
  })

  // Create/Update mutation
  const saveMutation = useMutation({
    mutationFn: async (data) => {
      const url = isNew ? '/api/case-studies' : `/api/case-studies/${params.id}`
      const method = isNew ? 'POST' : 'PUT'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to save')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['case-studies-admin'])
      toast.success(isNew ? 'Case study created!' : 'Case study updated!')
      setSaving(false)
      router.push('/admin/case-studies')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to save')
      setSaving(false)
    },
  })

  const onSubmit = (data) => {
    setSaving(true)
    saveMutation.mutate(data)
  }

  if (isLoading && !isNew) return <Loader text="Loading case study..." />

  return (
    <div className="max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/case-studies"
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 font-poppins">
              {isNew ? 'Create Case Study' : 'Edit Case Study'}
            </h1>
            <p className="text-gray-400">
              {isNew ? 'Add a new case study' : 'Update case study details'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Basic Information</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category *
                  </label>
                  <input
                    {...register('category', { required: 'Category is required' })}
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                    placeholder="Healthcare Education"
                  />
                  {errors.category && (
                    <p className="text-red-400 text-xs mt-1">{errors.category.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Slug * (URL-friendly)
                  </label>
                  <input
                    {...register('slug', { required: 'Slug is required' })}
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                    placeholder="case1"
                  />
                  {errors.slug && (
                    <p className="text-red-400 text-xs mt-1">{errors.slug.message}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">Used in URL: /CaseStudy/[slug]</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="Medical Education"
                />
                {errors.title && (
                  <p className="text-red-400 text-xs mt-1">{errors.title.message}</p>
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
                  placeholder="Our client specializes in..."
                />
                {errors.description && (
                  <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Key Results</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Result 1 *
                </label>
                <input
                  {...register('result1', { required: 'Result 1 is required' })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="Reduced CPL by 65%"
                />
                {errors.result1 && (
                  <p className="text-red-400 text-xs mt-1">{errors.result1.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Result 2 *
                </label>
                <input
                  {...register('result2', { required: 'Result 2 is required' })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="Increased conversion rate by 180%"
                />
                {errors.result2 && (
                  <p className="text-red-400 text-xs mt-1">{errors.result2.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Result 3 *
                </label>
                <input
                  {...register('result3', { required: 'Result 3 is required' })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="Scaled to $50k/month"
                />
                {errors.result3 && (
                  <p className="text-red-400 text-xs mt-1">{errors.result3.message}</p>
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
                  placeholder="0"
                />
                <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  {...register('isPublished')}
                  type="checkbox"
                  id="isPublished"
                  className="w-4 h-4"
                />
                <label htmlFor="isPublished" className="text-sm text-gray-300">
                  Published (visible on website)
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
              {saving ? 'Saving...' : isNew ? 'Create Case Study' : 'Save Changes'}
            </button>
            
            <Link
              href="/admin/case-studies"
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

