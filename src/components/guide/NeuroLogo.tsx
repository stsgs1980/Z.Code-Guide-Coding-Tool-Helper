'use client'

import React from 'react'
import Image from 'next/image'

interface NeuroLogoProps {
  /** Visual variant */
  variant?: 'dark' | 'light' | 'mono' | 'mono-dark' | 'outline' | 'outline-dark' | 'inverted'
  /** Display size */
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Optional className */
  className?: string
}

const sizeMap = {
  xs: { w: 80, h: 34 },
  sm: { w: 120, h: 51 },
  md: { w: 160, h: 68 },
  lg: { w: 249, h: 106 },
}

/**
 * NEURO logo component — picks the correct SVG variant
 * based on the current theme context.
 *
 * Dark UI → dark.svg  |  Light UI → light.svg
 *
 * SVG files have no background rect (transparent).
 */
export function NeuroLogo({ variant = 'dark', size = 'md', className = '' }: NeuroLogoProps) {
  const { w, h } = sizeMap[size]
  const src = `/logo-${variant}.svg`

  return (
    <Image
      src={src}
      alt="NEURO — Intelligence That Works For You"
      width={w}
      height={h}
      priority={size === 'lg'}
      className={`select-none ${className}`}
    />
  )
}
