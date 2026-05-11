'use client'

import React from 'react'
import { motion } from 'framer-motion'

export function TaxiDivider() {
  return (
    <div className="flex items-center gap-3 my-12 relative">
      <motion.div
        className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--nyc-border-default)] to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="flex items-center gap-1.5"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="w-1 h-1 bg-[var(--nyc-taxi)]/50" />
        <div className="w-2.5 h-2.5 bg-[var(--nyc-taxi)] rotate-45 shadow-sm shadow-[var(--nyc-taxi)]/30" />
        <div className="w-1 h-1 bg-[var(--nyc-taxi)]/50" />
      </motion.div>
      <motion.div
        className="h-px flex-1 bg-gradient-to-r from-transparent via-[var(--nyc-border-default)] to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      />
    </div>
  )
}
