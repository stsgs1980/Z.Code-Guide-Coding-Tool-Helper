/**
 * UI LAYER
 * StatusDot - status indicator dot
 * 
 * Anti-monolith: presentational component, no state
 */

'use client';

import { Check, X } from 'lucide-react';

interface StatusDotProps {
  status: 'active' | 'warning' | 'error';
  label?: string;
  className?: string;
}

export function StatusDot({ status, label, className = '' }: StatusDotProps) {
  const dotClass = {
    active: 'nyc-status-active',
    warning: 'nyc-status-warning',
    error: 'nyc-status-error',
  }[status];

  const Icon = status === 'active' ? Check : X;

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className={`nyc-status-dot ${dotClass}`} />
      {label && (
        <span className="text-xs text-white/60 flex items-center gap-1">
          <Icon className="h-3 w-3" />
          {label}
        </span>
      )}
    </span>
  );
}
