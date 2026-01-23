import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Clock, TrendingUp, Info, Instagram, Youtube, Facebook } from 'lucide-react'
import { bestPostingTime, platformColors } from '@/data/mockData'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card'

export const PostingTimeIntelligence = () => {
    const [selectedPlatform, setSelectedPlatform] = useState('all')

    
    const getBestTime = (platformData) => {
        return platformData.reduce((max, current) =>
            current.engagement > max.engagement ? current : max
        )
    }

    const bestTimes = {
        instagram: getBestTime(bestPostingTime.instagram),
        youtube: getBestTime(bestPostingTime.youtube),
        facebook: getBestTime(bestPostingTime.facebook),
    }

    
    const getChartData = () => {
        if (selectedPlatform === 'all') {
            
            return bestPostingTime.instagram.map((item, index) => ({
                hour: item.hour,
                Instagram: item.engagement,
                YouTube: bestPostingTime.youtube[index].engagement,
                Facebook: bestPostingTime.facebook[index].engagement,
            }))
        } else {
            return bestPostingTime[selectedPlatform]
        }
    }

    return (
        <div className="space-y-3">
            {}
            <div className="flex items-center gap-2">
                <h2 className="text-base font-bold">Posting Time Intelligence</h2>
                <HoverCard>
                    <HoverCardTrigger>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                        <div className="space-y-2">
                            <h4 className="font-semibold text-sm">What is this?</h4>
                            <p className="text-xs text-muted-foreground">
                                Analyzes your historical post performance to identify the optimal times to publish content for maximum engagement.
                            </p>
                            <h4 className="font-semibold text-sm mt-2">How it's measured:</h4>
                            <p className="text-xs text-muted-foreground">
                                Based on engagement rates (likes, comments, shares) across different posting times over the past 90 days.
                            </p>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            </div>

            {/* Best Time Recommendations - Compact */}
            <div className="grid grid-cols-3 gap-2">
                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-xs text-muted-foreground mb-0.5">Instagram</p>
                                <p className="text-xl font-bold">{bestTimes.instagram.hour}</p>
                            </div>
                            <Instagram className="h-5 w-5 text-pink-500" />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                            <TrendingUp className="h-3 w-3" />
                            <span className="font-medium">{bestTimes.instagram.engagement.toLocaleString()}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-xs text-muted-foreground mb-0.5">YouTube</p>
                                <p className="text-xl font-bold">{bestTimes.youtube.hour}</p>
                            </div>
                            <Youtube className="h-5 w-5 text-red-500" />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                            <TrendingUp className="h-3 w-3" />
                            <span className="font-medium">{bestTimes.youtube.engagement.toLocaleString()}</span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow">
                    <CardContent className="p-3">
                        <div className="flex items-start justify-between mb-2">
                            <div>
                                <p className="text-xs text-muted-foreground mb-0.5">Facebook</p>
                                <p className="text-xl font-bold">{bestTimes.facebook.hour}</p>
                            </div>
                            <Facebook className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                            <TrendingUp className="h-3 w-3" />
                            <span className="font-medium">{bestTimes.facebook.engagement.toLocaleString()}</span>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Posting Time Chart with Platform Selector */}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Hourly Engagement Pattern
                        </CardTitle>
                        <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform}>
                            <TabsList className="h-7">
                                <TabsTrigger value="all" className="text-xs px-2">All</TabsTrigger>
                                <TabsTrigger value="instagram" className="text-xs px-2">
                                    <Instagram className="h-3 w-3" />
                                </TabsTrigger>
                                <TabsTrigger value="youtube" className="text-xs px-2">
                                    <Youtube className="h-3 w-3" />
                                </TabsTrigger>
                                <TabsTrigger value="facebook" className="text-xs px-2">
                                    <Facebook className="h-3 w-3" />
                                </TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={getChartData()}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                            <YAxis tick={{ fontSize: 10 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px',
                                    fontSize: '11px'
                                }}
                            />
                            {selectedPlatform === 'all' ? (
                                <>
                                    <Legend wrapperStyle={{ fontSize: '10px' }} />
                                    <Bar dataKey="Instagram" fill={platformColors.instagram} radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="YouTube" fill={platformColors.youtube} radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="Facebook" fill={platformColors.facebook} radius={[4, 4, 0, 0]} />
                                </>
                            ) : (
                                <Bar
                                    dataKey="engagement"
                                    fill={platformColors[selectedPlatform]}
                                    radius={[4, 4, 0, 0]}
                                    name={selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)}
                                />
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
