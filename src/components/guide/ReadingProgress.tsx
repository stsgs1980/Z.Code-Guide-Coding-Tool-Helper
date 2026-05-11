'use client'

import React, { useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { motion } from 'framer-motion'

export function ReadingProgress() {
  const { scrollYProgress } = useScroll()
  const [width, setWidth] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setWidth(latest * 100)
  })

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5">
      <motion.div
        className="h-full bg-[var(--nyc-taxi)]"
        style={{ width: `${width}%` }}
      />
    </div>
  )
}
