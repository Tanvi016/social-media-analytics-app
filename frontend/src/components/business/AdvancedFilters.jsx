import React, { useState } from 'react'
import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { domains, regions } from '@/data/businessMockData'
import { Check } from 'lucide-react'

export const AdvancedFilters = ({ filters, onFiltersChange }) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDomain = (domain) => {
        const newDomains = filters.domains.includes(domain)
            ? filters.domains.filter(d => d !== domain)
            : [...filters.domains, domain]
        onFiltersChange({ ...filters, domains: newDomains })
    }

    const toggleRegion = (region) => {
        const newRegions = filters.regions.includes(region)
            ? filters.regions.filter(r => r !== region)
            : [...filters.regions, region]
        onFiltersChange({ ...filters, regions: newRegions })
    }

    const toggleTier = (tier) => {
        const newTiers = filters.tiers.includes(tier)
            ? filters.tiers.filter(t => t !== tier)
            : [...filters.tiers, tier]
        onFiltersChange({ ...filters, tiers: newTiers })
    }

    const clearAllFilters = () => {
        onFiltersChange({
            domains: [],
            regions: [],
            tiers: [],
            followerRange: [0, 10000000],
            engagementRange: [0, 100]
        })
    }

    const activeFilterCount = filters.domains.length + filters.regions.length + filters.tiers.length

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                    {activeFilterCount > 0 && (
                        <Badge variant="default" className="ml-1 px-1.5 py-0.5 text-xs">
                            {activeFilterCount}
                        </Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 p-4" align="start">
                <div className="space-y-4">
                    {}
                    <div className="flex items-center justify-between">
                        <h3 className="font-semibold">Advanced Filters</h3>
                        {activeFilterCount > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={clearAllFilters}
                                className="h-auto p-1 text-xs"
                            >
                                Clear all
                            </Button>
                        )}
                    </div>

                    {}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Domains</label>
                        <div className="space-y-1 max-h-48 overflow-y-auto">
                            {domains.map((domain) => {
                                const isSelected = filters.domains.includes(domain)
                                return (
                                    <button
                                        key={domain}
                                        onClick={() => toggleDomain(domain)}
                                        className={cn(
                                            'w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors',
                                            'hover:bg-accent',
                                            isSelected && 'bg-accent'
                                        )}
                                    >
                                        <div className={cn(
                                            'h-4 w-4 border rounded flex items-center justify-center',
                                            isSelected ? 'bg-primary border-primary' : 'border-input'
                                        )}>
                                            {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                                        </div>
                                        <span className="text-left flex-1">{domain}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Regions</label>
                        <div className="space-y-1">
                            {regions.map((region) => {
                                const isSelected = filters.regions.includes(region)
                                return (
                                    <button
                                        key={region}
                                        onClick={() => toggleRegion(region)}
                                        className={cn(
                                            'w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors',
                                            'hover:bg-accent',
                                            isSelected && 'bg-accent'
                                        )}
                                    >
                                        <div className={cn(
                                            'h-4 w-4 border rounded flex items-center justify-center',
                                            isSelected ? 'bg-primary border-primary' : 'border-input'
                                        )}>
                                            {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                                        </div>
                                        <span>{region}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Creator Tier</label>
                        <div className="space-y-1">
                            {['Top-tier', 'Micro-influencer'].map((tier) => {
                                const isSelected = filters.tiers.includes(tier)
                                return (
                                    <button
                                        key={tier}
                                        onClick={() => toggleTier(tier)}
                                        className={cn(
                                            'w-full flex items-center gap-2 px-2 py-1.5 rounded text-sm transition-colors',
                                            'hover:bg-accent',
                                            isSelected && 'bg-accent'
                                        )}
                                    >
                                        <div className={cn(
                                            'h-4 w-4 border rounded flex items-center justify-center',
                                            isSelected ? 'bg-primary border-primary' : 'border-input'
                                        )}>
                                            {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                                        </div>
                                        <span>{tier}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {}
                    <Button
                        onClick={() => setIsOpen(false)}
                        className="w-full"
                        size="sm"
                    >
                        Apply Filters
                    </Button>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


export const ActiveFilters = ({ filters, onFiltersChange }) => {
    const removeFilter = (type, value) => {
        const newFilters = { ...filters }
        newFilters[type] = newFilters[type].filter(item => item !== value)
        onFiltersChange(newFilters)
    }

    const hasActiveFilters = filters.domains.length > 0 || filters.regions.length > 0 || filters.tiers.length > 0

    if (!hasActiveFilters) return null

    return (
        <div className="flex flex-wrap gap-2">
            {filters.domains.map(domain => (
                <Badge key={domain} variant="secondary" className="gap-1">
                    {domain}
                    <button
                        onClick={() => removeFilter('domains', domain)}
                        className="ml-1 hover:text-destructive"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}
            {filters.regions.map(region => (
                <Badge key={region} variant="secondary" className="gap-1">
                    {region}
                    <button
                        onClick={() => removeFilter('regions', region)}
                        className="ml-1 hover:text-destructive"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}
            {filters.tiers.map(tier => (
                <Badge key={tier} variant="secondary" className="gap-1">
                    {tier}
                    <button
                        onClick={() => removeFilter('tiers', tier)}
                        className="ml-1 hover:text-destructive"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}
        </div>
    )
}
