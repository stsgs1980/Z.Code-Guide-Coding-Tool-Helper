'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, Hash } from 'lucide-react'

export function ToastContainer({ toasts }: { toasts: Array<{ id: string; message: string; type: 'success' | 'info' }> }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] flex flex-col-reverse items-center gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.slice(-3).map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className={`pointer-events-auto px-4 py-2.5 rounded-lg shadow-lg shadow-black/30 backdrop-blur-sm text-sm font-mono flex items-center gap-2 border-l-2 ${
              toast.type === 'success'
                ? 'bg-[var(--nyc-bg-card)] border-l-[var(--nyc-taxi)] text-[var(--nyc-text-primary)]'
                : 'bg-[var(--nyc-bg-card)] border-l-[var(--nyc-steel)] text-[var(--nyc-text-secondary)]'
            }`}
          >
            {toast.type === 'success' ? <Check className="w-3.5 h-3.5 text-[var(--nyc-taxi)] shrink-0" /> : <Hash className="w-3.5 h-3.5 text-[var(--nyc-steel)] shrink-0" />}
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
