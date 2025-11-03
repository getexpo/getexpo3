'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Edit, Trash2, Plus } from 'lucide-react'
import Loader from '@/components/admin/Loader'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import Link from 'next/link'

export default function PositionsPage() {
  const queryClient = useQueryClient()
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, title: '' })

  const { data: positions, isLoading } = useQuery({
    queryKey: ['positions-admin'],
    queryFn: async () => {
      const res = await fetch('/api/positions')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/positions/${id}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['positions-admin'])
      queryClient.invalidateQueries(['positions'])
      toast.success('Position deleted!')
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
              Positions / Journey Tabs
            </h1>
            <p className="text-sm sm:text-base text-gray-400">
              Manage the journey sections on the homepage
            </p>
          </div>
          <Link
            href="/admin/positions/new"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base transition-all whitespace-nowrap"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            Add New
          </Link>
        </div>
        
        <div className="space-y-4">
          {positions?.map((position) => (
            <div key={position.id} className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-4 sm:p-6 hover:border-white/20 transition-all">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-2">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">{position.title}</h3>
                    <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {position.slug}
                    </span>
                    {position.isActive ? (
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30">
                        Active
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-gray-500/20 text-gray-400 border border-gray-500/30">
                        Inactive
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400 mb-2">{position.subtitle}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-2">{position.description}</p>
                  <p className="text-purple-400 text-xs truncate">
                    📅 {position.calendlyLink}
                  </p>
                </div>

                <div className="flex gap-2 sm:ml-4">
                  <Link
                    href={`/admin/positions/${position.id}`}
                    className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(position.id, position.title)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
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
        title="Delete Position"
        message={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  )
}

