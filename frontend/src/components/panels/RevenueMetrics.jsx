import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DollarSign, TrendingUp, Sparkles, Instagram, Youtube, Facebook, Lightbulb, Info } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { formatNumber } from '@/lib/utils'
import { useParams } from 'react-router-dom'
import { userProfiles, getFallbackProfile } from '@/data/userMockData'
import { dataService } from '@/lib/dataService'

export const RevenueMetrics = ({ platformFilter }) => {
    const { username } = useParams()
    const profile = userProfiles[username] || getFallbackProfile(username)
    const [monetization, setMonetization] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMonetization = async () => {
            try {
                const data = await dataService.getMonetizationMetrics(profile.id, username)
                setMonetization(data)
            } catch (error) {
                console.error("Failed to fetch monetization metrics", error)
            } finally {
                setLoading(false)
            }
        }
        fetchMonetization()
    }, [profile.id, username])

    if (loading) {
        return (
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-bold">Revenue & Performance</h2>
                </div>
                <Card className="flex items-center justify-center h-[120px]">
                    <p className="text-sm text-muted-foreground animate-pulse">Loading revenue metrics...</p>
                </Card>
            </div>
        )
    }

    // Scaling factor for additional insights display
    const scale = (profile.stats.total_views / 892340) || 1

    const displayData = monetization || {
        revenue: {
            total: 8700 * scale,
            growth: 6.2,
            platforms: {
                instagram: 2890 * scale,
                youtube: 4250 * scale,
                facebook: 1560 * scale
            }
        },
        content_performance: [
            { type: 'Long-form Videos', revenue: 4100 * scale, conversion: 5.8, platform: 'YouTube' },
            { type: 'Reels', revenue: 3200 * scale, conversion: 4.2, platform: 'Instagram' },
            { type: 'Carousels', revenue: 1800 * scale, conversion: 3.1, platform: 'Instagram' }
        ]
    }

    const aiRecommendations = {
        all: [
            { text: 'Focus on YouTube long-form (+28% revenue)', priority: 'high' },
            { text: 'Increase Instagram Reels frequency', priority: 'medium' },
        ],
        instagram: [
            { text: 'Post Reels at 6 PM for +23% engagement', priority: 'high' },
            { text: 'Add more carousel posts (+45% conversion)', priority: 'medium' },
        ],
        youtube: [
            { text: 'Increase posting frequency by 2x', priority: 'high' },
            { text: 'Long-form videos outperform Shorts by 49%', priority: 'medium' },
        ],
        facebook: [
            { text: 'Consider reducing static posts (-2.1% growth)', priority: 'medium' },
            { text: 'Focus on video content instead', priority: 'high' },
        ],
    }

    const currentRevenueValue = platformFilter === 'all'
        ? displayData.revenue.total
        : (displayData.revenue.platforms[platformFilter.toLowerCase()] || displayData.revenue.total)

    const currentGrowthValue = displayData.revenue.growth
    const currentContent = platformFilter === 'all'
        ? displayData.content_performance
        : displayData.content_performance.filter(item => item.platform?.toLowerCase() === platformFilter.toLowerCase())

    const currentRecommendations = aiRecommendations[platformFilter] || aiRecommendations.all

    const platformIcons = {
        Instagram: Instagram,
        YouTube: Youtube,
        Facebook: Facebook,
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-bold">Revenue & Performance</h2>
                <HoverCard>
                    <HoverCardTrigger>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 text-xs">
                        <p className="font-semibold mb-1">Revenue & Performance</p>
                        <p className="text-muted-foreground">
                            Tracks revenue generation by platform and content type. Shows conversion rates and AI-powered recommendations to optimize monetization strategy.
                        </p>
                    </HoverCardContent>
                </HoverCard>
            </div>

            {/* Revenue Overview Card */}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-500" />
                        Revenue Overview
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <p className="text-xs text-muted-foreground">Total Revenue</p>
                            <p className="text-2xl font-bold text-green-600">${formatNumber(currentRevenueValue)}</p>
                        </div>
                        <div className="text-right">
                            <Badge variant={currentGrowthValue >= 0 ? 'default' : 'destructive'} className="text-xs">
                                <TrendingUp className={`h-3 w-3 mr-1 ${currentGrowthValue < 0 ? 'rotate-180' : ''}`} />
                                {Math.abs(currentGrowthValue)}%
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Top Performing Content Card */}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm">Top Performing Content</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-2">
                    {(currentContent.length > 0 ? currentContent : displayData.content_performance).slice(0, 3).map((item, index) => (
                        <div key={index} className="p-2 rounded-lg border bg-card">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1">
                                    <span className="text-xs font-semibold">{item.type}</span>
                                    {item.platform && (
                                        <Badge variant="outline" className="text-xs px-1 py-0 flex items-center gap-1">
                                            {React.createElement(platformIcons[item.platform] || Sparkles, { className: 'h-3 w-3' })}
                                            {item.platform}
                                        </Badge>
                                    )}
                                </div>
                                <span className="text-sm font-bold text-green-600">${formatNumber(item.revenue)}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                                {item.conversion}% conversion rate
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* AI Insights Card */}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-500" />
                        AI Insights
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-2">
                    {currentRecommendations.map((rec, index) => (
                        <div
                            key={index}
                            className={`p-2 rounded-lg border text-xs ${rec.priority === 'high'
                                ? 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800'
                                : 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'
                                }`}
                        >
                            <div className="flex items-start justify-between gap-2">
                                <span>{rec.text}</span>
                                <Badge
                                    variant={rec.priority === 'high' ? 'destructive' : 'secondary'}
                                    className="text-xs px-1 py-0 flex-shrink-0"
                                >
                                    {rec.priority}
                                </Badge>
                            </div>
                        </div>
                    ))}
                    <div className="mt-2 p-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg border border-green-200 dark:border-green-800">
                        <p className="text-xs font-semibold text-green-900 dark:text-green-100 flex items-center gap-1">
                            <Lightbulb className="h-3 w-3" /> Projected Revenue: <span className="text-green-600">+${formatNumber(2340 * scale)}/month</span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
