import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { DollarSign, TrendingUp, Sparkles, Instagram, Youtube, Facebook, Lightbulb, Info } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { formatNumber } from '@/lib/utils'

export const RevenueMetrics = ({ platformFilter }) => {
    const revenueData = {
        all: { total: 8700, growth: 6.2 },
        instagram: { total: 2890, growth: 8.3 },
        youtube: { total: 4250, growth: 12.5 },
        facebook: { total: 1560, growth: -2.1 },
    }

    const contentPerformance = {
        all: [
            { type: 'Long-form Videos', revenue: 4100, conversion: 5.8, platform: 'YouTube' },
            { type: 'Reels', revenue: 3200, conversion: 4.2, platform: 'Instagram' },
            { type: 'Carousels', revenue: 1800, conversion: 3.1, platform: 'Instagram' },
            { type: 'Static Posts', revenue: 950, conversion: 2.3, platform: 'Facebook' },
        ],
        instagram: [
            { type: 'Reels', revenue: 1800, conversion: 4.2 },
            { type: 'Carousels', revenue: 850, conversion: 3.1 },
            { type: 'Static Posts', revenue: 240, conversion: 2.1 },
        ],
        youtube: [
            { type: 'Long-form', revenue: 3100, conversion: 5.8 },
            { type: 'Shorts', revenue: 1150, conversion: 3.9 },
        ],
        facebook: [
            { type: 'Videos', revenue: 680, conversion: 2.8 },
            { type: 'Carousels', revenue: 520, conversion: 2.5 },
            { type: 'Static Posts', revenue: 360, conversion: 1.9 },
        ],
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

    const currentRevenue = revenueData[platformFilter] || revenueData.all
    const currentContent = contentPerformance[platformFilter] || contentPerformance.all
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

            {}
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
                            <p className="text-2xl font-bold text-green-600">${formatNumber(currentRevenue.total)}</p>
                        </div>
                        <div className="text-right">
                            <Badge variant={currentRevenue.growth >= 0 ? 'default' : 'destructive'} className="text-xs">
                                <TrendingUp className={`h-3 w-3 mr-1 ${currentRevenue.growth < 0 ? 'rotate-180' : ''}`} />
                                {Math.abs(currentRevenue.growth)}%
                            </Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm">Top Performing Content</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-2">
                    {currentContent.slice(0, 3).map((item, index) => (
                        <div key={index} className="p-2 rounded-lg border bg-card">
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1">
                                    <span className="text-xs font-semibold">{item.type}</span>
                                    {item.platform && (
                                        <Badge variant="outline" className="text-xs px-1 py-0 flex items-center gap-1">
                                            {React.createElement(platformIcons[item.platform], { className: 'h-3 w-3' })}
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

            {}
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
                            <Lightbulb className="h-3 w-3" /> Projected Revenue: <span className="text-green-600">+$2,340/month</span>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
