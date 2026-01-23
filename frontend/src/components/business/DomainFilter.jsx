import React, { useState } from 'react'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { domains } from '@/data/businessMockData'

export const DomainFilter = ({ selectedDomains, onDomainsChange }) => {
    const toggleDomain = (domain) => {
        if (selectedDomains.includes(domain)) {
            onDomainsChange(selectedDomains.filter(d => d !== domain))
        } else {
            onDomainsChange([...selectedDomains, domain])
        }
    }

    const clearAll = () => {
        onDomainsChange([])
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <span>Domains</span>
                    {selectedDomains.length > 0 && (
                        <span className="px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded">
                            {selectedDomains.length}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 p-3">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold">Select Domains</span>
                    {selectedDomains.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAll}
                            className="h-auto p-1 text-xs"
                        >
                            Clear all
                        </Button>
                    )}
                </div>
                <div className="space-y-1">
                    {domains.map((domain) => {
                        const isSelected = selectedDomains.includes(domain)
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
                                <span>{domain}</span>
                            </button>
                        )
                    })}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
