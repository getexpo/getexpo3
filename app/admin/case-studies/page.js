'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import Loader from '@/components/admin/Loader'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import Link from 'next/link'

export default function CaseStudiesPage() {
  const queryClient = useQueryClient()
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, title: '' })

  // Fetch case studies
  const { data: caseStudies, isLoading } = useQuery({
    queryKey: ['case-studies-admin'],
    queryFn: async () => {
      const res = await fetch('/api/case-studies')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/case-studies/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['case-studies-admin'])
      toast.success('Case study deleted successfully!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete')
    },
  })

  // Toggle publish mutation
  const togglePublishMutation = useMutation({
    mutationFn: async ({ id, isPublished }) => {
      const res = await fetch(`/api/case-studies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !isPublished }),
      })
      if (!res.ok) throw new Error('Failed to update')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['case-studies-admin'])
      toast.success('Status updated!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update')
    },
  })

  const handleDeleteClick = (id, title) => {
    setDeleteConfirm({ isOpen: true, id, title })
  }

  const handleDeleteConfirm = () => {
    if (deleteConfirm.id) {
      deleteMutation.mutate(deleteConfirm.id)
    }
  }

  if (isLoading) return <Loader text="Loading case studies..." />

  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 font-poppins">
              Case Studies
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              Manage your case studies
            </p>
          </div>
          <Link
            href="/admin/case-studies/new"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add New
          </Link>
        </div>

        {/* Case Studies List */}
        <div className="space-y-4">
          {caseStudies?.map((study) => (
            <div
              key={study.id}
              className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6 hover:border-white/20 transition-all"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">
                      {study.title}
                    </h3>
                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {study.category}
                    </span>
                    {study.isPublished ? (
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30">
                        Published
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-gray-500/20 text-gray-400 border border-gray-500/30">
                        Draft
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {study.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[study.result1, study.result2, study.result3].map((result, idx) => (
                      <span
                        key={idx}
                        className="text-xs text-gray-500 bg-white/5 px-2 py-1"
                      >
                        • {result}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() =>
                      togglePublishMutation.mutate({
                        id: study.id,
                        isPublished: study.isPublished,
                      })
                    }
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                    title={study.isPublished ? 'Unpublish' : 'Publish'}
                  >
                    {study.isPublished ? (
                      <Eye className="w-5 h-5" />
                    ) : (
                      <EyeOff className="w-5 h-5" />
                    )}
                  </button>
                  <Link
                    href={`/admin/case-studies/${study.id}`}
                    className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(study.id, study.title)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {(!caseStudies || caseStudies.length === 0) && (
            <div className="text-center py-12 text-gray-500">
              <p>No case studies yet. Create your first one!</p>
            </div>
          )}
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null, title: '' })}
        onConfirm={handleDeleteConfirm}
        title="Delete Case Study"
        message={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  )
}

