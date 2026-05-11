'use client'

import { useState, useMemo, useCallback } from 'react'

export function useWizard() {
  const [wizardUsage, setWizardUsage] = useState('')
  const [wizardBudget, setWizardBudget] = useState('')
  const [wizardTools, setWizardTools] = useState<string[]>([])

  const toggleWizardTool = useCallback((tool: string) => {
    setWizardTools(prev =>
      prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
    )
  }, [])

  const wizardRecommendation = useMemo(() => {
    if (!wizardUsage || !wizardBudget) return null
    const key = `${wizardUsage}-${wizardBudget}`
    const recs: Record<string, { name: string; price: string; plan: string }> = {
      'learn-free': { name: 'Free Stack', price: '$0/мес', plan: 'None' },
      'learn-mid': { name: 'Budget', price: '$18-20/мес', plan: 'GLM Coding Plan Lite' },
      'freelance-free': { name: 'Budget', price: '$18-20/мес', plan: 'GLM Coding Plan Lite' },
      'freelance-mid': { name: 'Professional', price: '$38-60/мес', plan: 'GLM Coding Plan Pro' },
      'freelance-pro': { name: 'Professional', price: '$38-60/мес', plan: 'GLM Coding Plan Pro' },
      'team-mid': { name: 'Professional', price: '$38-60/мес', plan: 'GLM Coding Plan Pro' },
      'team-pro': { name: 'Team/Enterprise', price: '$100+/мес', plan: 'GLM Coding Plan Max' },
    }
    return recs[key] || { name: 'Professional', price: '$38-60/мес', plan: 'GLM Coding Plan Pro' }
  }, [wizardUsage, wizardBudget])

  return {
    wizardUsage, setWizardUsage,
    wizardBudget, setWizardBudget,
    wizardTools, toggleWizardTool,
    wizardRecommendation,
  }
}
