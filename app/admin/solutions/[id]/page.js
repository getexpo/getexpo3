'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useRouter, useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { Save, ArrowLeft, Plus, Trash2, Edit2 } from 'lucide-react'
import Loader from '@/components/admin/Loader'
import ConfirmDialog from '@/components/admin/ConfirmDialog'
import Link from 'next/link'

export default function EditSolutionPage() {
  const params = useParams()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [saving, setSaving] = useState(false)
  const [editingStep, setEditingStep] = useState(null)
  const [stepForm, setStepForm] = useState({ title: '', description: '', stepOrder: 0 })
  const [deleteConfirm, setDeleteConfirm] = useState({ isOpen: false, id: null, title: '' })

  // Fetch solution with steps
  const { data: solution, isLoading } = useQuery({
    queryKey: ['solution', params.id],
    queryFn: async () => {
      const res = await fetch(`/api/solutions/${params.id}`)
      if (!res.ok) throw new Error('Failed to fetch')
      return res.json()
    },
  })

  // Form setup for solution
  const { register, handleSubmit, formState: { errors } } = useForm({
    values: solution,
  })

  // Update solution mutation
  const updateSolutionMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`/api/solutions/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['solutions-admin'])
      queryClient.invalidateQueries(['solution', params.id])
      toast.success('Solution updated!')
      setSaving(false)
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update')
      setSaving(false)
    },
  })

  // Add step mutation
  const addStepMutation = useMutation({
    mutationFn: async (data) => {
      const res = await fetch(`/api/solutions/${params.id}/steps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to add step')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['solution', params.id])
      toast.success('Step added!')
      setStepForm({ title: '', description: '', stepOrder: 0 })
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add step')
    },
  })

  // Update step mutation
  const updateStepMutation = useMutation({
    mutationFn: async ({ stepId, data }) => {
      const res = await fetch(`/api/solutions/steps/${stepId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to update step')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['solution', params.id])
      toast.success('Step updated!')
      setEditingStep(null)
      setStepForm({ title: '', description: '', stepOrder: 0 })
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update step')
    },
  })

  // Delete step mutation
  const deleteStepMutation = useMutation({
    mutationFn: async (stepId) => {
      const res = await fetch(`/api/solutions/steps/${stepId}`, {
        method: 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to delete step')
      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['solution', params.id])
      toast.success('Step deleted!')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete step')
    },
  })

  const onSubmit = (data) => {
    setSaving(true)
    updateSolutionMutation.mutate(data)
  }

  const handleAddStep = () => {
    addStepMutation.mutate(stepForm)
  }

  const handleUpdateStep = () => {
    updateStepMutation.mutate({ stepId: editingStep, data: stepForm })
  }

  const startEditStep = (step) => {
    setEditingStep(step.id)
    setStepForm({
      title: step.title,
      description: step.description,
      stepOrder: step.stepOrder,
    })
  }

  const cancelEditStep = () => {
    setEditingStep(null)
    setStepForm({ title: '', description: '', stepOrder: 0 })
  }

  const handleDeleteClick = (id, title) => {
    setDeleteConfirm({ isOpen: true, id, title })
  }

  const handleDeleteConfirm = () => {
    if (deleteConfirm.id) {
      deleteStepMutation.mutate(deleteConfirm.id)
    }
  }

  if (isLoading) return <Loader text="Loading solution..." />

  return (
    <div className="max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin/solutions"
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 font-poppins">
              Edit Solution
            </h1>
            <p className="text-gray-400">
              {solution?.title} ({solution?.slug})
            </p>
          </div>
        </div>

        {/* Solution Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mb-8">
          <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Solution Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
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
                  rows={3}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                />
                {errors.description && (
                  <p className="text-red-400 text-xs mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Video URL *
                </label>
                <input
                  {...register('videoUrl', { required: 'Video URL is required' })}
                  type="url"
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="https://drive.google.com/..."
                />
                {errors.videoUrl && (
                  <p className="text-red-400 text-xs mt-1">{errors.videoUrl.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Calendly Link *
                </label>
                <input
                  {...register('calendlyLink', { required: 'Calendly link is required' })}
                  type="url"
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="https://calendly.com/..."
                />
                {errors.calendlyLink && (
                  <p className="text-red-400 text-xs mt-1">{errors.calendlyLink.message}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-6 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 transition-all disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Saving...' : 'Save Solution'}
            </button>
          </div>
        </form>

        {/* Steps Section */}
        <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Solution Steps</h2>
          
          {/* Existing Steps */}
          <div className="space-y-3 mb-6">
            {solution?.steps?.map((step, idx) => (
              <div key={step.id} className="bg-black/50 border border-white/10 p-4">
                {editingStep === step.id ? (
                  // Edit Mode
                  <div className="space-y-3">
                    <input
                      value={stepForm.title}
                      onChange={(e) => setStepForm({ ...stepForm, title: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:border-purple-500/50"
                      placeholder="Step title"
                    />
                    <textarea
                      value={stepForm.description}
                      onChange={(e) => setStepForm({ ...stepForm, description: e.target.value })}
                      rows={3}
                      className="w-full bg-black/50 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:border-purple-500/50"
                      placeholder="Step description"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdateStep}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm"
                      >
                        Update
                      </button>
                      <button
                        onClick={cancelEditStep}
                        className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // View Mode
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-purple-400 font-bold">Step {idx + 1}</span>
                        <h4 className="text-white font-semibold">{step.title}</h4>
                      </div>
                      <p className="text-gray-400 text-sm">{step.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditStep(step)}
                        className="p-2 text-gray-400 hover:text-purple-400 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(step.id, step.title)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add New Step Form */}
          {!editingStep && (
            <div className="border-t border-white/10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Add New Step</h3>
              <div className="space-y-3">
                <input
                  value={stepForm.title}
                  onChange={(e) => setStepForm({ ...stepForm, title: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="Step title"
                />
                <textarea
                  value={stepForm.description}
                  onChange={(e) => setStepForm({ ...stepForm, description: e.target.value })}
                  rows={4}
                  className="w-full bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="Step description"
                />
                <input
                  type="number"
                  value={stepForm.stepOrder}
                  onChange={(e) => setStepForm({ ...stepForm, stepOrder: parseInt(e.target.value) })}
                  className="w-32 bg-black/50 border border-white/10 text-white px-4 py-2 focus:outline-none focus:border-purple-500/50"
                  placeholder="Order"
                />
                <button
                  onClick={handleAddStep}
                  disabled={!stepForm.title || !stepForm.description}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 transition-all disabled:opacity-50"
                >
                  <Plus className="w-5 h-5" />
                  Add Step
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null, title: '' })}
        onConfirm={handleDeleteConfirm}
        title="Delete Step"
        message={`Are you sure you want to delete the step "${deleteConfirm.title}"? This action cannot be undone.`}
        confirmText="Delete"
        type="danger"
      />
    </div>
  )
}

