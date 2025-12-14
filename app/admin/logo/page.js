'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { Upload, Image as ImageIcon, CheckCircle, XCircle } from 'lucide-react'
import Loader from '@/components/admin/Loader'
import Image from 'next/image'

export default function LogoManagementPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const queryClient = useQueryClient()

  // Fetch current logo
  const { data: logoData, isLoading } = useQuery({
    queryKey: ['logo'],
    queryFn: async () => {
      const res = await fetch('/api/upload-logo')
      if (!res.ok) throw new Error('Failed to fetch logo')
      return res.json()
    },
  })

  // Upload mutation
  const uploadMutation = useMutation({
    mutationFn: async (file) => {
      const formData = new FormData()
      formData.append('logo', file)

      const res = await fetch('/api/upload-logo', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Upload failed')
      }

      return res.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['logo'])
      setSelectedFile(null)
      setPreview(null)
    },
  })

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      processFile(file)
    }
  }

  const processFile = (file) => {
    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml']
    if (!validTypes.includes(file.type)) {
      alert('Invalid file type. Only PNG, JPG, and SVG are allowed.')
      return
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('File size exceeds 2MB limit')
      return
    }

    setSelectedFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0])
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      uploadMutation.mutate(selectedFile)
    }
  }

  if (isLoading) return <Loader />

  return (
    <div className="max-w-4xl">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-white mb-2">Logo Management</h1>
        <p className="text-gray-400 mb-8">Upload and manage your website logo</p>

        {/* Current Logo */}
        <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Current Logo</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-8 flex items-center justify-center min-h-[200px]">
            {logoData?.logoPath ? (
              <div className="relative">
                <Image
                  src={logoData.logoPath}
                  alt="Current logo"
                  width={300}
                  height={100}
                  className="max-h-[150px] w-auto object-contain"
                />
              </div>
            ) : (
              <div className="text-gray-500 flex flex-col items-center gap-2">
                <ImageIcon className="w-12 h-12" />
                <p>No logo uploaded</p>
              </div>
            )}
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Upload New Logo</h2>

          {/* Drag & Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragActive
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-white/20 bg-white/5'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-white mb-2">Drag and drop your logo here, or</p>
            <label className="inline-block cursor-pointer">
              <span className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors">
                Browse Files
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                onChange={handleFileChange}
              />
            </label>
            <p className="text-gray-500 text-sm mt-4">
              Supported formats: PNG, JPG, SVG (Max 2MB)
            </p>
          </div>

          {/* Preview */}
          {preview && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-white/5 border border-white/10 rounded-lg p-6"
            >
              <h3 className="text-white font-semibold mb-4">Preview</h3>
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg p-8 flex items-center justify-center min-h-[200px]">
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-[150px] w-auto object-contain"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleUpload}
                  disabled={uploadMutation.isPending}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-md transition-colors"
                >
                  {uploadMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Upload Logo
                    </>
                  )}
                </button>
                <button
                  onClick={() => {
                    setSelectedFile(null)
                    setPreview(null)
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Upload Status */}
          {uploadMutation.isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Logo uploaded successfully!
            </motion.div>
          )}

          {uploadMutation.isError && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 flex items-center gap-2"
            >
              <XCircle className="w-5 h-5" />
              {uploadMutation.error?.message || 'Upload failed'}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
