import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Users, CheckCircle2, Sparkles, MapPin, TrendingUp } from 'lucide-react'
import { AdvancedFilters, ActiveFilters } from './AdvancedFilters'
import { CreatorProfileModal } from './CreatorProfileModal'
import { LocationFilter } from './LocationFilter'
import { LocationMapModal } from './LocationMapModal'
import { mockCreators } from '@/data/businessMockData'
import { formatNumber } from '@/lib/utils'

export const CreatorSearch = ({ onContactCreator }) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [filters, setFilters] = useState({
        domains: [],
        regions: [],
        tiers: [],
        followerRange: [0, 10000000],
        engagementRange: [0, 100]
    })
    const [locationFilter, setLocationFilter] = useState({
        region: '',
        country: '',
        state: '',
        place: ''
    })
    const [selectedCreator, setSelectedCreator] = useState(null)
    const [showMapModal, setShowMapModal] = useState(false)

    
    const filteredCreators = useMemo(() => {
        return mockCreators.filter(creator => {
            const matchesSearch = creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                creator.username.toLowerCase().includes(searchQuery.toLowerCase())

            const matchesDomain = filters.domains.length === 0 ||
                creator.domain.some(d => filters.domains.some(sd => d.includes(sd.split(' (')[0])))

            const matchesRegion = filters.regions.length === 0 ||
                filters.regions.includes(creator.region)

            const matchesTier = filters.tiers.length === 0 ||
                filters.tiers.includes(creator.tier)

            
            const hasLocationFilter = locationFilter.region || locationFilter.country ||
                locationFilter.state || locationFilter.place

            const matchesLocation = !hasLocationFilter || (
                creator.location &&
                (!locationFilter.region || creator.location.region === locationFilter.region) &&
                (!locationFilter.country || creator.location.country === locationFilter.country) &&
                (!locationFilter.state || creator.location.state === locationFilter.state) &&
                (!locationFilter.place || creator.location.place === locationFilter.place)
            )

            return matchesSearch && matchesDomain && matchesRegion && matchesTier && matchesLocation
        })
    }, [searchQuery, filters, locationFilter])

    
    const regionSuggestions = useMemo(() => {
        const regions = {}
        filteredCreators.forEach(creator => {
            if (!regions[creator.region]) {
                regions[creator.region] = []
            }
            regions[creator.region].push(creator)
        })
        return regions
    }, [filteredCreators])

    const topTierCreators = useMemo(() => {
        return filteredCreators.filter(c => c.tier === 'Top-tier')
    }, [filteredCreators])

    const microInfluencers = useMemo(() => {
        return filteredCreators.filter(c => c.tier === 'Micro-influencer')
    }, [filteredCreators])

    const aiRecommendations = useMemo(() => {
        
        return filteredCreators
            .filter(c => c.isUnlocked && c.stats)
            .sort((a, b) => b.stats.engagementRate - a.stats.engagementRate)
            .slice(0, 3)
    }, [filteredCreators])

    const CreatorCard = ({ creator }) => (
        <Card
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => setSelectedCreator(creator)}
        >
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="h-14 w-14 rounded-full"
                    />
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold truncate">{creator.name}</h4>
                            {creator.verified && (
                                <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{creator.username}</p>
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <Badge variant="outline" className="text-xs gap-1">
                                <Users className="h-3 w-3" />
                                {formatNumber(creator.followers)}
                            </Badge>
                            <Badge variant="secondary" className="text-xs">{creator.tier}</Badge>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                            {creator.domain.slice(0, 2).map(d => (
                                <Badge key={d} variant="outline" className="text-xs">
                                    {d}
                                </Badge>
                            ))}
                            {creator.domain.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                    +{creator.domain.length - 2}
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )

    return (
        <div className="h-full flex flex-col overflow-hidden">
            <div className="flex-shrink-0 p-6 pb-4 border-b">
                {}
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        <Search className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Creator Search & Match</h1>
                        <p className="text-sm text-muted-foreground">Find the perfect creators for your campaigns</p>
                    </div>
                </div>

                {}
                <div className="space-y-3">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search creators by name or username..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-9"
                            />
                        </div>
                        <AdvancedFilters
                            filters={filters}
                            onFiltersChange={setFilters}
                        />
                    </div>

                    {}
                    <LocationFilter
                        value={locationFilter}
                        onChange={setLocationFilter}
                        onShowMap={() => setShowMapModal(true)}
                    />

                    <ActiveFilters
                        filters={filters}
                        onFiltersChange={setFilters}
                    />
                </div>
            </div>

            {}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-6xl mx-auto space-y-4">
                    {}
                    {aiRecommendations.length > 0 && (
                        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border-purple-200 dark:border-purple-800">
                            <CardHeader className="p-4">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <Sparkles className="h-5 w-5 text-purple-500" />
                                    AI Recommendations
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <div className="grid grid-cols-3 gap-3">
                                    {aiRecommendations.map(creator => (
                                        <CreatorCard key={creator.id} creator={creator} />
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {}
                    <div className="grid grid-cols-3 gap-4">
                        {}
                        <div className="col-span-2 space-y-4">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <MapPin className="h-5 w-5" />
                                All Creators ({filteredCreators.length})
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {filteredCreators.map(creator => (
                                    <CreatorCard key={creator.id} creator={creator} />
                                ))}
                            </div>
                            {filteredCreators.length === 0 && (
                                <div className="text-center py-12 text-muted-foreground">
                                    <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                    <p>No creators found matching your criteria</p>
                                </div>
                            )}
                        </div>

                        {}
                        <div className="space-y-4">
                            {}
                            <Card>
                                <CardHeader className="p-3">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <TrendingUp className="h-4 w-4 text-yellow-500" />
                                        Top-tier ({topTierCreators.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-3 pt-0 space-y-2">
                                    {topTierCreators.slice(0, 3).map(creator => (
                                        <div
                                            key={creator.id}
                                            className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer"
                                            onClick={() => setSelectedCreator(creator)}
                                        >
                                            <img
                                                src={creator.avatar}
                                                alt={creator.name}
                                                className="h-8 w-8 rounded-full"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold truncate">{creator.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {formatNumber(creator.followers)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {}
                            <Card>
                                <CardHeader className="p-3">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <Users className="h-4 w-4 text-blue-500" />
                                        Micro-influencers ({microInfluencers.length})
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-3 pt-0 space-y-2">
                                    {microInfluencers.slice(0, 3).map(creator => (
                                        <div
                                            key={creator.id}
                                            className="flex items-center gap-2 p-2 rounded hover:bg-accent cursor-pointer"
                                            onClick={() => setSelectedCreator(creator)}
                                        >
                                            <img
                                                src={creator.avatar}
                                                alt={creator.name}
                                                className="h-8 w-8 rounded-full"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold truncate">{creator.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {formatNumber(creator.followers)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {}
                            <Card>
                                <CardHeader className="p-3">
                                    <CardTitle className="text-sm flex items-center gap-2">
                                        <MapPin className="h-4 w-4 text-green-500" />
                                        By Region
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-3 pt-0 space-y-2">
                                    {Object.entries(regionSuggestions).map(([region, creators]) => (
                                        <div key={region} className="flex items-center justify-between text-xs">
                                            <span>{region}</span>
                                            <Badge variant="secondary" className="text-xs">
                                                {creators.length}
                                            </Badge>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>

            {}
            {selectedCreator && (
                <CreatorProfileModal
                    creator={selectedCreator}
                    onClose={() => setSelectedCreator(null)}
                    onContact={onContactCreator}
                />
            )}

            {}
            {showMapModal && (
                <LocationMapModal
                    location={locationFilter}
                    creators={mockCreators}
                    onClose={() => setShowMapModal(false)}
                />
            )}
        </div>
    )
}
