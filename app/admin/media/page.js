'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Upload, Trash2 } from 'lucide-react'
import Loader from '@/components/admin/Loader'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import Image from 'next/image'

export default function MediaPage() {
  const [tab, setTab] = useState('brands')
  const queryClient = useQueryClient()
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, filename: '' })

  const { data: logos, isLoading: logosLoading } = useQuery({
    queryKey: ['logos-admin'],
    queryFn: async () => {
      const res = await fetch('/api/logos')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/logos/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['logos-admin'])
      toast.success('Logo deleted!')
    },
  })

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)
    formData.append('order', logos?.length || 0)

    try {
      const res = await fetch('/api/logos', {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error('Upload failed')
      await queryClient.invalidateQueries(['logos-admin'])
      toast.success('Logo uploaded!')
      e.target.value = ''
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleDeleteClick = (id, filename) => {
    setDeleteConfirm({ isOpen: true, id, filename })
  }

  const handleDeleteConfirm = () => {
    if (deleteConfirm.id) {
      deleteMutation.mutate(deleteConfirm.id)
    }
  }

  if (logosLoading) return <Loader />

  return (
    <div className="max-w-6xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white mb-8">Media Library</h1>

        <div className="mb-6">
          <label className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 transition-all cursor-pointer w-fit">
            <Upload className="w-5 h-5" />
            Upload Brand Logo
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {logos?.map((logo) => (
            <div key={logo.id} className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-4 group relative">
              <div className="aspect-square relative mb-2 bg-white/5 flex items-center justify-center">
                <Image src={logo.path} alt={logo.alt || ''} fill className="object-contain p-2" />
              </div>
              <p className="text-xs text-gray-500 truncate">{logo.filename}</p>
              <button
                onClick={() => handleDeleteClick(logo.id, logo.filename)}
                className="absolute top-2 right-2 p-2 bg-red-500/80 hover:bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {(!logos || logos.length === 0) && (
          <div className="text-center py-12 text-gray-500">
            <p>No logos uploaded yet.</p>
          </div>
        )}
      </motion.div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null, filename: '' })}
        onConfirm={handleDeleteConfirm}
        title="Delete Logo"
        message={`Are you sure you want to delete "${deleteConfirm.filename}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  )
}

