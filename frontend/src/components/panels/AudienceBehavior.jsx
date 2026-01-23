import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Smile, Frown, Meh, Eye, Instagram, Youtube, Facebook, Info } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { commentsSentiment, reachVsInteraction } from '@/data/mockData'

export const AudienceBehavior = () => {
    const platformIcons = {
        instagram: Instagram,
        youtube: Youtube,
        facebook: Facebook,
    }

    const sentimentChartData = [
        { name: 'Positive', value: commentsSentiment.positive, color: '#10b981' },
        { name: 'Negative', value: commentsSentiment.negative, color: '#ef4444' },
        { name: 'Neutral', value: commentsSentiment.neutral, color: '#6b7280' },
    ]

    return (
        <div className="space-y-3">
            {}
            <div className="flex items-center justify-between">
                <h2 className="text-base font-bold">Audience Behavior</h2>
                <HoverCard>
                    <HoverCardTrigger>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 text-xs">
                        <p className="font-semibold mb-1">Audience Behavior</p>
                        <p className="text-muted-foreground">
                            Tracks audience sentiment from comments and measures reach-to-interaction ratios. Shows how effectively your content converts views into meaningful engagement.
                        </p>
                    </HoverCardContent>
                </HoverCard>
            </div>

            {}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm">Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <div className="grid grid-cols-2 gap-3">
                        {}
                        <div>
                            <ResponsiveContainer width="100%" height={120}>
                                <PieChart>
                                    <Pie
                                        data={sentimentChartData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={30}
                                        outerRadius={50}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {sentimentChartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '8px',
                                            fontSize: '11px'
                                        }}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {}
                        <div className="flex flex-col justify-center space-y-2">
                            <div className="flex items-center justify-between p-2 rounded-lg border bg-green-50 dark:bg-green-950">
                                <div className="flex items-center gap-2">
                                    <Smile className="h-4 w-4 text-green-600" />
                                    <span className="text-xs font-medium">Positive</span>
                                </div>
                                <span className="text-sm font-bold text-green-600">{commentsSentiment.positive}%</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg border bg-red-50 dark:bg-red-950">
                                <div className="flex items-center gap-2">
                                    <Frown className="h-4 w-4 text-red-600" />
                                    <span className="text-xs font-medium">Negative</span>
                                </div>
                                <span className="text-sm font-bold text-red-600">{commentsSentiment.negative}%</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg border bg-gray-50 dark:bg-gray-900">
                                <div className="flex items-center gap-2">
                                    <Meh className="h-4 w-4 text-gray-600" />
                                    <span className="text-xs font-medium">Neutral</span>
                                </div>
                                <span className="text-sm font-bold text-gray-600">{commentsSentiment.neutral}%</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Reach vs Interaction
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <div className="space-y-2">
                        {reachVsInteraction.map((item) => {
                            const platform = item.platform.toLowerCase()
                            const PlatformIcon = platformIcons[platform]
                            const ratio = ((item.interaction / item.reach) * 100).toFixed(1)
                            return (
                                <div key={platform} className="p-2 rounded-lg border bg-card">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <PlatformIcon className="h-4 w-4" />
                                            <span className="text-xs font-semibold capitalize">{platform}</span>
                                        </div>
                                        <span className="text-xs font-bold text-primary">{ratio}%</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div>
                                            <p className="text-muted-foreground">Reach</p>
                                            <p className="font-semibold">{item.reach.toLocaleString()}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Interactions</p>
                                            <p className="font-semibold">{item.interaction.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
