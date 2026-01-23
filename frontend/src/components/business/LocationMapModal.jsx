import React, { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, MapPin, Users } from 'lucide-react'



export const LocationMapModal = ({ location, creators, onClose }) => {
    if (!location) return null

    
    const creatorsInLocation = creators.filter(creator => {
        if (!creator.location) return false

        if (location.place && creator.location.place !== location.place) return false
        if (location.state && creator.location.state !== location.state) return false
        if (location.country && creator.location.country !== location.country) return false
        if (location.region && creator.location.region !== location.region) return false

        return true
    })

    
    const locationString = [
        location.place,
        location.state,
        location.country,
        location.region
    ].filter(Boolean).join(', ')

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-3xl">
                <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-primary" />
                            {locationString}
                        </CardTitle>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {}
                    <div className="relative h-[400px] bg-muted">
                        {}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center space-y-4">
                                <div className="relative w-full h-full">
                                    {}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 dark:from-blue-950 dark:to-green-950">
                                        {}
                                        <div className="absolute inset-0 opacity-20"
                                            style={{
                                                backgroundImage: 'linear-gradient(#666 1px, transparent 1px), linear-gradient(90deg, #666 1px, transparent 1px)',
                                                backgroundSize: '50px 50px'
                                            }}
                                        />

                                        {}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <div className="relative">
                                                <div className="absolute inset-0 animate-ping">
                                                    <div className="h-16 w-16 rounded-full bg-primary/30" />
                                                </div>
                                                <MapPin className="h-16 w-16 text-primary relative z-10 drop-shadow-lg" />
                                            </div>
                                        </div>

                                        {}
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <Card>
                                                <CardContent className="p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <p className="text-sm font-semibold">{locationString}</p>
                                                            <p className="text-xs text-muted-foreground mt-1">
                                                                {creatorsInLocation.length} creator{creatorsInLocation.length !== 1 ? 's' : ''} in this location
                                                            </p>
                                                        </div>
                                                        <Badge variant="secondary" className="gap-1">
                                                            <Users className="h-3 w-3" />
                                                            {creatorsInLocation.length}
                                                        </Badge>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {}
                    {creatorsInLocation.length > 0 && (
                        <div className="p-4 border-t">
                            <h3 className="text-sm font-semibold mb-3">Creators in {location.place || location.state || location.country}</h3>
                            <div className="grid grid-cols-2 gap-3 max-h-[200px] overflow-y-auto">
                                {creatorsInLocation.map(creator => (
                                    <div
                                        key={creator.id}
                                        className="flex items-center gap-3 p-2 rounded-lg border hover:bg-accent cursor-pointer"
                                    >
                                        <img
                                            src={creator.avatar}
                                            alt={creator.name}
                                            className="h-10 w-10 rounded-full"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold truncate">{creator.name}</p>
                                            <p className="text-xs text-muted-foreground truncate">{creator.username}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}















































