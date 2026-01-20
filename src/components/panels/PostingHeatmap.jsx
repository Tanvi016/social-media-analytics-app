import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Flame, Instagram, Youtube, Facebook, Info } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { postingHeatmapData } from '@/data/mockData'

export const PostingHeatmap = () => {
    const [selectedPlatform, setSelectedPlatform] = useState('instagram')

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const hours = [6, 9, 12, 15, 18, 21]

    
    const getHeatColor = (engagement, platform) => {
        const data = postingHeatmapData[platform]
        const values = data.map(d => d.engagement)
        const min = Math.min(...values)
        const max = Math.max(...values)

        const normalized = (engagement - min) / (max - min)

        if (normalized >= 0.8) return 'bg-green-600 dark:bg-green-500'
        if (normalized >= 0.6) return 'bg-green-500 dark:bg-green-600'
        if (normalized >= 0.4) return 'bg-yellow-500 dark:bg-yellow-600'
        if (normalized >= 0.2) return 'bg-orange-400 dark:bg-orange-500'
        return 'bg-red-400 dark:bg-red-500'
    }

    const getEngagement = (day, hour, platform) => {
        const data = postingHeatmapData[platform]
        const entry = data.find(d => d.day === day && d.hour === hour)
        return entry ? entry.engagement : 0
    }

    const platformTabs = [
        { value: 'instagram', label: 'Instagram', Icon: Instagram },
        { value: 'youtube', label: 'YouTube', Icon: Youtube },
        { value: 'facebook', label: 'Facebook', Icon: Facebook },
    ]

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-bold">Posting Time Heatmap</h2>
                <HoverCard>
                    <HoverCardTrigger>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 text-xs">
                        <p className="font-semibold mb-1">Posting Time Heatmap</p>
                        <p className="text-muted-foreground">
                            Shows engagement levels by day and hour. Darker green = higher engagement.
                            Use this to identify optimal posting windows for each platform.
                        </p>
                    </HoverCardContent>
                </HoverCard>
            </div>

            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Flame className="h-4 w-4 text-orange-500" />
                        Engagement Heatmap by Day & Hour
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform}>
                        <TabsList className="grid w-full grid-cols-3 mb-3">
                            {platformTabs.map(({ value, label, Icon }) => (
                                <TabsTrigger key={value} value={value} className="text-xs">
                                    <Icon className="h-3 w-3 mr-1" />
                                    {label}
                                </TabsTrigger>
                            ))}
                        </TabsList>

                        {platformTabs.map(({ value }) => (
                            <TabsContent key={value} value={value} className="mt-0">
                                {}
                                <div className="space-y-2">
                                    {}
                                    <div className="flex items-center gap-1">
                                        <div className="w-12"></div>
                                        {hours.map(hour => (
                                            <div key={hour} className="flex-1 text-center text-xs font-medium">
                                                {hour === 6 ? '6AM' : hour === 12 ? '12PM' : hour === 18 ? '6PM' : hour === 21 ? '9PM' : `${hour}:00`}
                                            </div>
                                        ))}
                                    </div>

                                    {}
                                    {days.map(day => (
                                        <div key={day} className="flex items-center gap-1">
                                            <div className="w-12 text-xs font-medium">{day}</div>
                                            {hours.map(hour => {
                                                const engagement = getEngagement(day, hour, value)
                                                const colorClass = getHeatColor(engagement, value)
                                                return (
                                                    <div
                                                        key={`${day}-${hour}`}
                                                        className={`flex-1 aspect-square rounded ${colorClass} flex items-center justify-center text-white text-xs font-semibold hover:opacity-80 transition-opacity cursor-pointer`}
                                                        title={`${day} ${hour}:00 - ${(engagement / 1000).toFixed(1)}K engagement`}
                                                    >
                                                        {(engagement / 1000).toFixed(0)}K
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ))}

                                    {}
                                    <div className="flex items-center justify-center gap-2 pt-2 border-t">
                                        <span className="text-xs text-muted-foreground">Low</span>
                                        <div className="flex gap-1">
                                            <div className="w-4 h-4 rounded bg-red-400 dark:bg-red-500"></div>
                                            <div className="w-4 h-4 rounded bg-orange-400 dark:bg-orange-500"></div>
                                            <div className="w-4 h-4 rounded bg-yellow-500 dark:bg-yellow-600"></div>
                                            <div className="w-4 h-4 rounded bg-green-500 dark:bg-green-600"></div>
                                            <div className="w-4 h-4 rounded bg-green-600 dark:bg-green-500"></div>
                                        </div>
                                        <span className="text-xs text-muted-foreground">High</span>
                                    </div>
                                </div>
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>
            </Card>

            {}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm">Suggested Posting Windows</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-2">
                    {platformTabs.map(({ value, label, Icon }) => {
                        const data = postingHeatmapData[value]
                        const sorted = [...data].sort((a, b) => b.engagement - a.engagement)
                        const topTime = sorted[0]

                        return (
                            <div key={value} className="p-2 rounded-lg border bg-card">
                                <div className="flex items-center gap-2 mb-1">
                                    <Icon className="h-4 w-4" />
                                    <span className="text-xs font-semibold">{label}</span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Best time: <span className="font-semibold text-foreground">{topTime.day} at {topTime.hour === 6 ? '6 AM' : topTime.hour === 12 ? '12 PM' : topTime.hour === 18 ? '6 PM' : `${topTime.hour}:00`}</span>
                                    {' '}({(topTime.engagement / 1000).toFixed(1)}K avg engagement)
                                </p>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
    )
}
