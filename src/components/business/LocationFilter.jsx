import React, { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { MapPin, Map, X } from 'lucide-react'
import { locationHierarchy } from '@/data/businessMockData'

export const LocationFilter = ({ value, onChange, onShowMap }) => {
    const [selectedRegion, setSelectedRegion] = useState(value?.region || '')
    const [selectedCountry, setSelectedCountry] = useState(value?.country || '')
    const [selectedState, setSelectedState] = useState(value?.state || '')
    const [selectedPlace, setSelectedPlace] = useState(value?.place || '')

    
    const regions = Object.keys(locationHierarchy)
    const countries = selectedRegion ? Object.keys(locationHierarchy[selectedRegion] || {}) : []
    const states = selectedRegion && selectedCountry
        ? Object.keys(locationHierarchy[selectedRegion]?.[selectedCountry] || {})
        : []
    const places = selectedRegion && selectedCountry && selectedState
        ? locationHierarchy[selectedRegion]?.[selectedCountry]?.[selectedState] || []
        : []

    
    useEffect(() => {
        if (onChange) {
            onChange({
                region: selectedRegion,
                country: selectedCountry,
                state: selectedState,
                place: selectedPlace
            })
        }
        
    }, [selectedRegion, selectedCountry, selectedState, selectedPlace])

    
    const handleRegionChange = (region) => {
        setSelectedRegion(region)
        setSelectedCountry('')
        setSelectedState('')
        setSelectedPlace('')
    }

    const handleCountryChange = (country) => {
        setSelectedCountry(country)
        setSelectedState('')
        setSelectedPlace('')
    }

    const handleStateChange = (state) => {
        setSelectedState(state)
        setSelectedPlace('')
    }

    const clearAll = () => {
        setSelectedRegion('')
        setSelectedCountry('')
        setSelectedState('')
        setSelectedPlace('')
    }

    const hasSelection = selectedRegion || selectedCountry || selectedState || selectedPlace

    return (
        <div className="space-y-3">
            {}
            <div className="grid grid-cols-4 gap-2">
                {}
                <Select value={selectedRegion} onValueChange={handleRegionChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Region" />
                    </SelectTrigger>
                    <SelectContent>
                        {regions.map(region => (
                            <SelectItem key={region} value={region}>
                                {region}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {}
                <Select
                    value={selectedCountry}
                    onValueChange={handleCountryChange}
                    disabled={!selectedRegion}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                        {countries.map(country => (
                            <SelectItem key={country} value={country}>
                                {country}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {}
                <Select
                    value={selectedState}
                    onValueChange={handleStateChange}
                    disabled={!selectedCountry}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="State/Province" />
                    </SelectTrigger>
                    <SelectContent>
                        {states.map(state => (
                            <SelectItem key={state} value={state}>
                                {state}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {}
                <Select
                    value={selectedPlace}
                    onValueChange={setSelectedPlace}
                    disabled={!selectedState}
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="City/Place" />
                    </SelectTrigger>
                    <SelectContent>
                        {places.map(place => (
                            <SelectItem key={place} value={place}>
                                {place}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {}
            {hasSelection && (
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div className="flex items-center gap-1 text-sm">
                            {selectedRegion && (
                                <>
                                    <Badge variant="secondary">{selectedRegion}</Badge>
                                    {selectedCountry && <span className="text-muted-foreground">→</span>}
                                </>
                            )}
                            {selectedCountry && (
                                <>
                                    <Badge variant="secondary">{selectedCountry}</Badge>
                                    {selectedState && <span className="text-muted-foreground">→</span>}
                                </>
                            )}
                            {selectedState && (
                                <>
                                    <Badge variant="secondary">{selectedState}</Badge>
                                    {selectedPlace && <span className="text-muted-foreground">→</span>}
                                </>
                            )}
                            {selectedPlace && (
                                <Badge variant="secondary">{selectedPlace}</Badge>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {onShowMap && selectedPlace && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={onShowMap}
                                className="gap-2"
                            >
                                <Map className="h-4 w-4" />
                                View on Map
                            </Button>
                        )}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearAll}
                            className="gap-2"
                        >
                            <X className="h-4 w-4" />
                            Clear
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
