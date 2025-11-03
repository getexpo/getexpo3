'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Save, Plus, Trash2, Edit2 } from 'lucide-react'
import Loader from '@/components/admin/Loader'
import ConfirmDialog from '@/components/admin/ConfirmDialog'

export default function EditContactPage() {
  const queryClient = useQueryClient()
  const [saving, setSaving] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [itemForm, setItemForm] = useState({ type: 'info', icon: '', title: '', details: '', order: 0 })
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, title: '' })

  // Fetch contact data
  const { data, isLoading } = useQuery({
    queryKey: ['contact-admin'],
    queryFn: async () => {
      const res = await fetch('/api/contact')
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })

  // Form for contact content
  const { register, handleSubmit } = useForm({
    values: data?.content || {},
  })

  // Update content mutation
  const updateContentMutation = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch('/api/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Failed to update')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contact-admin'])
      toast.success('Contact content updated!')
      setSaving(false)
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update')
      setSaving(false)
    },
  })

  // Add item mutation
  const addItemMutation = useMutation({
    mutationFn: async (itemData) => {
      const res = await fetch('/api/contact/info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      })
      if (!res.ok) throw new Error('Failed to add')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contact-admin'])
      toast.success('Item added!')
      setItemForm({ type: 'info', icon: '', title: '', details: '', order: 0 })
    },
  })

  // Update item mutation
  const updateItemMutation = useMutation({
    mutationFn: async ({ id, data: itemData }) => {
      const res = await fetch(`/api/contact/info/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      })
      if (!res.ok) throw new Error('Failed to update')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contact-admin'])
      toast.success('Item updated!')
      setEditingItem(null)
    },
  })

  // Delete item mutation
  const deleteItemMutation = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/contact/info/${id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Failed to delete')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['contact-admin'])
      toast.success('Item deleted!')
    },
  })

  const onSubmitContent = (formData) => {
    setSaving(true)
    updateContentMutation.mutate(formData)
  }

  const handleAddItem = () => {
    addItemMutation.mutate(itemForm)
  }

  const handleUpdateItem = (id) => {
    updateItemMutation.mutate({ id, data: itemForm })
  }

  const startEditItem = (item) => {
    setEditingItem(item.id)
    setItemForm({
      type: item.type,
      icon: item.icon || '',
      title: item.title,
      details: item.details,
      order: item.order,
    })
  }

  const handleDeleteClick = (id, title) => {
    setDeleteConfirm({ isOpen: true, id, title })
  }

  const handleDeleteConfirm = () => {
    if (deleteConfirm.id) {
      deleteItemMutation.mutate(deleteConfirm.id)
    }
  }

  if (isLoading) return <Loader />

  return (
    <div className="max-w-5xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white mb-2 font-poppins">
          Edit Contact Section
        </h1>
        <p className="text-gray-400 mb-8">
          Manage contact page content, info cards, benefits, and stats
        </p>

        {/* Contact Content Form */}
        <form onSubmit={handleSubmit(onSubmitContent)} className="mb-8">
          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Main Content</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Main Title (Line 1)
                  </label>
                  <input
                    {...register('mainTitle1')}
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                    placeholder="Ready to Scale"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Main Title (Line 2)
                  </label>
                  <input
                    {...register('mainTitle2')}
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                    placeholder="Your Advertising?"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Main Description
                </label>
                <textarea
                  {...register('mainDescription')}
                  rows={2}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Benefits Title
                  </label>
                  <input
                    {...register('benefitsTitle')}
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                    placeholder="What You'll Get"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Contact Title
                  </label>
                  <input
                    {...register('contactTitle')}
                    className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                    placeholder="Get in Touch"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Trust Badge
                </label>
                <input
                  {...register('trustBadge')}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                />
              </div>

              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 transition-all disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Content'}
              </button>
            </div>
          </div>
        </form>

        {/* Contact Info Items */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Info Cards */}
          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Info</h3>
            <div className="space-y-3">
              {data?.infos?.map((info) => (
                <div key={info.id} className="bg-white/5 p-3 flex justify-between items-start">
                  <div className="flex-1">
                    <p className="text-white text-sm font-semibold">{info.title}</p>
                    <p className="text-gray-400 text-xs">{info.details}</p>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => startEditItem(info)}
                      className="p-1 text-gray-400 hover:text-purple-400"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(info.id, info.title)}
                      className="p-1 text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Benefits</h3>
            <div className="space-y-3">
              {data?.benefits?.map((benefit) => (
                <div key={benefit.id} className="bg-white/5 p-3 flex justify-between items-start">
                  <p className="text-gray-300 text-sm flex-1">{benefit.details}</p>
                  <div className="flex gap-1">
                    <button
                      onClick={() => startEditItem(benefit)}
                      className="p-1 text-gray-400 hover:text-purple-400"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(benefit.id, benefit.title)}
                      className="p-1 text-gray-400 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Stats</h3>
            <div className="space-y-3">
              {data?.stats?.map((stat) => (
                <div key={stat.id} className="bg-white/5 p-3">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-white text-lg font-bold">{stat.title}</p>
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEditItem(stat)}
                        className="p-1 text-gray-400 hover:text-purple-400"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(stat.id, stat.title)}
                        className="p-1 text-gray-400 hover:text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs">{stat.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add/Edit Item Form */}
        <div className="mt-6 bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingItem ? 'Edit Item' : 'Add New Item'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <select
              value={itemForm.type}
              onChange={(e) => setItemForm({ ...itemForm, type: e.target.value })}
              className="bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
            >
              <option value="info">Contact Info</option>
              <option value="benefit">Benefit</option>
              <option value="stat">Stat</option>
            </select>
            <input
              value={itemForm.title}
              onChange={(e) => setItemForm({ ...itemForm, title: e.target.value })}
              className="bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
              placeholder="Title"
            />
            <input
              value={itemForm.details}
              onChange={(e) => setItemForm({ ...itemForm, details: e.target.value })}
              className="bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
              placeholder="Details"
            />
            <input
              value={itemForm.icon}
              onChange={(e) => setItemForm({ ...itemForm, icon: e.target.value })}
              className="bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
              placeholder="Icon (for info only)"
            />
          </div>
          <div className="flex gap-4 mt-4">
            {editingItem ? (
              <>
                <button
                  onClick={() => handleUpdateItem(editingItem)}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3"
                >
                  Update
                </button>
                <button
                  onClick={() => {
                    setEditingItem(null)
                    setItemForm({ type: 'info', icon: '', title: '', details: '', order: 0 })
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={handleAddItem}
                disabled={!itemForm.title || !itemForm.details}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 disabled:opacity-50"
              >
                <Plus className="w-5 h-5" />
                Add Item
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null, title: '' })}
        onConfirm={handleDeleteConfirm}
        title="Delete Item"
        message={`Are you sure you want to delete "${deleteConfirm.title}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  )
}

