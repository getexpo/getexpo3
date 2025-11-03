'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X } from 'lucide-react'

export default function ConfirmDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  type = 'danger' // 'danger' or 'warning'
}) {
  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="bg-gradient-to-b from-[#0a0a0a] to-black border border-white/10 p-6 sm:p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                type === 'danger' ? 'bg-red-500/20' : 'bg-yellow-500/20'
              }`}>
                <AlertTriangle className={`w-6 h-6 ${
                  type === 'danger' ? 'text-red-400' : 'text-yellow-400'
                }`} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-2 font-poppins">
                {title}
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                {message}
              </p>

              {/* Actions */}
              <div className="flex gap-3 flex-col sm:flex-row">
                <button
                  onClick={handleConfirm}
                  className={`flex-1 px-6 py-3 font-semibold text-white transition-all ${
                    type === 'danger' 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-yellow-600 hover:bg-yellow-700'
                  }`}
                >
                  {confirmText}
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
                >
                  {cancelText}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

