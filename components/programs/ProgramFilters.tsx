'use client'

import { useState } from 'react'
import { Filter, X } from 'lucide-react'

interface ProgramFiltersProps {
  onFilterChange: (filters: {
    audience: string[]
    mode: string[]
    wing: string[]
  }) => void
}

export default function ProgramFilters({ onFilterChange }: ProgramFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState({
    audience: [] as string[],
    mode: [] as string[],
    wing: [] as string[]
  })

  const audienceOptions = ['students', 'professionals', 'organisations']
  const modeOptions = ['live', 'pre-recorded']
  const wingOptions = ['Applied Learning and Training', 'Applied Research and Practice']

  const handleFilterToggle = (category: 'audience' | 'mode' | 'wing', value: string) => {
    setFilters(prev => {
      const categoryFilters = prev[category]
      const newFilters = categoryFilters.includes(value)
        ? categoryFilters.filter(f => f !== value)
        : [...categoryFilters, value]
      
      const updated = { ...prev, [category]: newFilters }
      onFilterChange(updated)
      return updated
    })
  }

  const clearFilters = () => {
    const cleared = {
      audience: [],
      mode: [],
      wing: []
    }
    setFilters(cleared)
    onFilterChange(cleared)
  }

  const activeFilterCount = filters.audience.length + filters.mode.length + filters.wing.length

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-ablr-primary transition-colors"
        >
          <Filter size={20} className="text-ablr-primary" />
          <span className="font-semibold text-gray-700">Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-ablr-primary text-white text-xs rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 text-gray-600 hover:text-ablr-primary transition-colors"
          >
            <X size={18} />
            <span className="text-sm">Clear all</span>
          </button>
        )}
      </div>

      {isOpen && (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6 space-y-6">
          {/* Audience Filter */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Audience</h4>
            <div className="flex flex-wrap gap-3">
              {audienceOptions.map(option => (
                <button
                  key={option}
                  onClick={() => handleFilterToggle('audience', option)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filters.audience.includes(option)
                      ? 'bg-ablr-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Filter */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Mode</h4>
            <div className="flex flex-wrap gap-3">
              {modeOptions.map(option => (
                <button
                  key={option}
                  onClick={() => handleFilterToggle('mode', option)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filters.mode.includes(option)
                      ? 'bg-ablr-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option === 'pre-recorded' ? 'Pre-recorded' : 'Live'}
                </button>
              ))}
            </div>
          </div>

          {/* Wing Filter */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Wing</h4>
            <div className="flex flex-wrap gap-3">
              {wingOptions.map(option => (
                <button
                  key={option}
                  onClick={() => handleFilterToggle('wing', option)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filters.wing.includes(option)
                      ? 'bg-ablr-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


