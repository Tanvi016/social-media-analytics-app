import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Trophy, TrendingUp, Eye, Heart, MessageCircle, Share2, Instagram, Youtube, Facebook, Info } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import {
    bestPerformingContent,
    viralPosts,
    engagementByFormat,
} from '@/data/mockData'
import { formatNumber } from '@/lib/utils'

export const ContentPerformance = () => {
    
    const formatChartData = Object.entries(engagementByFormat).flatMap(([platform, formats]) =>
        formats.map(f => ({
            name: `${platform.charAt(0).toUpperCase()}${platform.slice(1).substring(0, 2)} ${f.format.substring(0, 3)}`,
            engagement: f.engagement,
            platform: platform,
        }))
    )

    const platformIcons = {
        instagram: Instagram,
        youtube: Youtube,
        facebook: Facebook,
    }

    return (
        <div className="space-y-3">
            {}
            <div className="flex items-center justify-between">
                <h2 className="text-base font-bold">Content Performance</h2>
                <HoverCard>
                    <HoverCardTrigger>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 text-xs">
                        <p className="font-semibold mb-1">Content Performance</p>
                        <p className="text-muted-foreground">
                            Analyzes your best-performing posts, viral content, and engagement rates by content format. Helps identify what resonates most with your audience.
                        </p>
                    </HoverCardContent>
                </HoverCard>
            </div>

            {}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        Top Content
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <div className="space-y-2">
                        {bestPerformingContent.slice(0, 2).map((content) => {
                            const PlatformIcon = platformIcons[content.platform]
                            return (
                                <div
                                    key={content.id}
                                    className="p-2 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                                >
                                    <div className="flex items-start gap-2">
                                        <div className="text-2xl">{content.thumbnail}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2">
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-xs truncate">{content.title}</h4>
                                                    <div className="flex items-center gap-1 mt-0.5">
                                                        <PlatformIcon className="h-3 w-3" />
                                                        <Badge variant="secondary" className="text-xs px-1 py-0">{content.type}</Badge>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-primary">{formatNumber(content.engagement)}</p>
                                                    <p className="text-xs text-muted-foreground">Eng.</p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-4 gap-1 pt-1 mt-1 border-t text-xs">
                                                <div className="flex items-center gap-0.5">
                                                    <Heart className="h-3 w-3 text-pink-500" />
                                                    <span>{formatNumber(content.likes)}</span>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                    <MessageCircle className="h-3 w-3 text-blue-500" />
                                                    <span>{formatNumber(content.comments)}</span>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                    <Share2 className="h-3 w-3 text-green-500" />
                                                    <span>{formatNumber(content.shares)}</span>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                    <Eye className="h-3 w-3 text-purple-500" />
                                                    <span>{formatNumber(content.reach)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        Viral Posts
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <div className="space-y-2">
                        {viralPosts.map((post, index) => {
                            const PlatformIcon = platformIcons[post.platform]
                            return (
                                <div
                                    key={post.id}
                                    className="flex items-center justify-between p-2 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                                >
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white font-bold text-xs">
                                            #{index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-xs truncate">{post.title}</h4>
                                            <div className="flex items-center gap-1 mt-0.5">
                                                <PlatformIcon className="h-3 w-3" />
                                                <span className="text-xs text-muted-foreground">
                                                    {formatNumber(post.views)} views
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right ml-2">
                                        <div className="flex items-center gap-1">
                                            <div className="w-12 h-1.5 bg-secondary rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                                    style={{ width: `${post.viralScore}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-semibold">{post.viralScore}%</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            {}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm">Format Performance</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={formatChartData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                                dataKey="name"
                                angle={-45}
                                textAnchor="end"
                                height={60}
                                tick={{ fontSize: 9 }}
                            />
                            <YAxis
                                tick={{ fontSize: 10 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px',
                                    fontSize: '11px'
                                }}
                            />
                            <Bar
                                dataKey="engagement"
                                fill="hsl(var(--primary))"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
