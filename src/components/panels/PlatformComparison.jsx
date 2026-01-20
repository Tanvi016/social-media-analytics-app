import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip } from 'recharts'
import { Trophy, Instagram, Youtube, Facebook, Info } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { platformComparisonMetrics } from '@/data/mockData'

export const PlatformComparison = () => {
    
    const radarData = [
        {
            metric: 'Content',
            Instagram: platformComparisonMetrics.instagram.contentPerformance,
            YouTube: platformComparisonMetrics.youtube.contentPerformance,
            Facebook: platformComparisonMetrics.facebook.contentPerformance,
        },
        {
            metric: 'Revenue',
            Instagram: platformComparisonMetrics.instagram.revenueGeneration,
            YouTube: platformComparisonMetrics.youtube.revenueGeneration,
            Facebook: platformComparisonMetrics.facebook.revenueGeneration,
        },
        {
            metric: 'Engagement',
            Instagram: platformComparisonMetrics.instagram.engagementRate,
            YouTube: platformComparisonMetrics.youtube.engagementRate,
            Facebook: platformComparisonMetrics.facebook.engagementRate,
        },
        {
            metric: 'Retention',
            Instagram: platformComparisonMetrics.instagram.customerRetention,
            YouTube: platformComparisonMetrics.youtube.customerRetention,
            Facebook: platformComparisonMetrics.facebook.customerRetention,
        },
    ]

    
    const calculateOverallScore = (platform) => {
        const metrics = platformComparisonMetrics[platform]
        return Math.round(
            (metrics.contentPerformance + metrics.revenueGeneration +
                metrics.engagementRate + metrics.customerRetention) / 4
        )
    }

    const platformScores = [
        {
            name: 'Instagram',
            score: calculateOverallScore('instagram'),
            icon: Instagram,
            color: 'text-pink-500',
            bgColor: 'bg-pink-50 dark:bg-pink-950',
            borderColor: 'border-pink-200 dark:border-pink-800'
        },
        {
            name: 'YouTube',
            score: calculateOverallScore('youtube'),
            icon: Youtube,
            color: 'text-red-500',
            bgColor: 'bg-red-50 dark:bg-red-950',
            borderColor: 'border-red-200 dark:border-red-800'
        },
        {
            name: 'Facebook',
            score: calculateOverallScore('facebook'),
            icon: Facebook,
            color: 'text-blue-500',
            bgColor: 'bg-blue-50 dark:bg-blue-950',
            borderColor: 'border-blue-200 dark:border-blue-800'
        },
    ].sort((a, b) => b.score - a.score)

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-bold">Platform Performance Comparison</h2>
                <HoverCard>
                    <HoverCardTrigger>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 text-xs">
                        <p className="font-semibold mb-1">Platform Comparison</p>
                        <p className="text-muted-foreground">
                            Compares all platforms across 4 key metrics: content performance, revenue generation, engagement rate, and customer retention. Scores are normalized to 0-100 scale.
                        </p>
                    </HoverCardContent>
                </HoverCard>
            </div>

            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        Overall Performance Radar
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <ResponsiveContainer width="100%" height={250}>
                        <RadarChart data={radarData}>
                            <PolarGrid stroke="hsl(var(--border))" />
                            <PolarAngleAxis
                                dataKey="metric"
                                tick={{ fontSize: 11, fill: 'hsl(var(--foreground))' }}
                            />
                            <PolarRadiusAxis
                                angle={90}
                                domain={[0, 100]}
                                tick={{ fontSize: 10 }}
                            />
                            <Radar
                                name="Instagram"
                                dataKey="Instagram"
                                stroke="#E4405F"
                                fill="#E4405F"
                                fillOpacity={0.3}
                            />
                            <Radar
                                name="YouTube"
                                dataKey="YouTube"
                                stroke="#FF0000"
                                fill="#FF0000"
                                fillOpacity={0.3}
                            />
                            <Radar
                                name="Facebook"
                                dataKey="Facebook"
                                stroke="#1877F2"
                                fill="#1877F2"
                                fillOpacity={0.3}
                            />
                            <Legend
                                wrapperStyle={{ fontSize: '11px' }}
                                iconType="circle"
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px',
                                    fontSize: '11px'
                                }}
                            />
                        </RadarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm">Platform Rankings</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-2">
                    {platformScores.map((platform, index) => {
                        const Icon = platform.icon
                        return (
                            <div
                                key={platform.name}
                                className={`p-2 rounded-lg border ${platform.bgColor} ${platform.borderColor}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold text-xs">
                                            #{index + 1}
                                        </div>
                                        <Icon className={`h-4 w-4 ${platform.color}`} />
                                        <span className="text-xs font-semibold">{platform.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold">{platform.score}</p>
                                        <p className="text-xs text-muted-foreground">Overall Score</p>
                                    </div>
                                </div>
                                <div className="mt-2 grid grid-cols-4 gap-1 text-xs">
                                    <div className="text-center">
                                        <p className="font-semibold">{platformComparisonMetrics[platform.name.toLowerCase()].contentPerformance}</p>
                                        <p className="text-muted-foreground">Content</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-semibold">{platformComparisonMetrics[platform.name.toLowerCase()].revenueGeneration}</p>
                                        <p className="text-muted-foreground">Revenue</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-semibold">{platformComparisonMetrics[platform.name.toLowerCase()].engagementRate}</p>
                                        <p className="text-muted-foreground">Engage</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="font-semibold">{platformComparisonMetrics[platform.name.toLowerCase()].customerRetention}</p>
                                        <p className="text-muted-foreground">Retention</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
    )
}
