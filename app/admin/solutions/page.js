'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Edit, Plus, Trash2 } from 'lucide-react'
import Loader from '@/components/admin/Loader'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import Link from 'next/link'

export default function SolutionsPage() {
  const queryClient = useQueryClient()
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, title: '' })

  const { data: solutions, isLoading } = useQuery({
    queryKey: ['solutions-admin'],
    queryFn: async () => {
      const res = await fetch('/api/solutions')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/solutions/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['solutions-admin'])
      toast.success('Solution deleted!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete')
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

  if (isLoading) return <Loader />

  return (
    <div className="w-full max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 font-poppins">
              Solution Pages
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              Manage solution pages and their steps
            </p>
          </div>
          <Link
            href="/admin/solutions/new"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add New
          </Link>
        </div>
        
        <div className="space-y-4 sm:space-y-6">
          {solutions?.map((solution) => (
            <div key={solution.id} className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-4 sm:p-6 hover:border-white/20 transition-all">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">{solution.title}</h3>
                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {solution.slug}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 mb-2 line-clamp-2">{solution.description}</p>
                  <p className="text-gray-500 text-xs mb-1 truncate">
                    🎥 {solution.videoUrl?.substring(0, 40)}...
                  </p>
                  <p className="text-purple-400 text-xs truncate">
                    📅 {solution.calendlyLink}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/solutions/${solution.id}`}
                    className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(solution.id, solution.title)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                <h4 className="text-xs sm:text-sm font-semibold text-white mb-2 sm:mb-3">
                  Steps ({solution.steps?.length || 0})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {solution.steps?.map((step, idx) => (
                    <div key={step.id} className="bg-white/5 p-3">
                      <p className="text-white font-semibold text-sm mb-1">
                        {idx + 1}. {step.title}
                      </p>
                      <p className="text-gray-500 text-xs line-clamp-2">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null, title: '' })}
        onConfirm={handleDeleteConfirm}
        title="Delete Solution"
        message={`Are you sure you want to delete "${deleteConfirm.title}"? This will also delete all associated steps. This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  )
}

