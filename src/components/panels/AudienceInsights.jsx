import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, Clock, Users, UserCheck, Instagram, Youtube, Facebook, Info } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { followerGrowthTimeline, engagementDecay, audienceType, platformAudienceBehavior } from '@/data/mockData'
import { formatNumber } from '@/lib/utils'

export const AudienceInsights = () => {
    
    const growthData = followerGrowthTimeline.instagram.map((item, index) => ({
        month: item.month,
        Instagram: item.followers,
        YouTube: followerGrowthTimeline.youtube[index].followers,
        Facebook: followerGrowthTimeline.facebook[index].followers,
    }))

    
    const audienceTypeData = [
        { name: 'Returning', value: audienceType.returning, color: '#10b981' },
        { name: 'New', value: audienceType.new, color: '#3b82f6' },
    ]

    const platformIcons = {
        instagram: Instagram,
        youtube: Youtube,
        facebook: Facebook,
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-bold">Audience Insights</h2>
                <HoverCard>
                    <HoverCardTrigger>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 text-xs">
                        <p className="font-semibold mb-1">Audience Insights</p>
                        <p className="text-muted-foreground">
                            Deep dive into audience behavior including follower growth trends, engagement decay patterns, and returning vs new audience composition. Helps understand audience loyalty and content lifespan.
                        </p>
                    </HoverCardContent>
                </HoverCard>
            </div>

            {}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        Follower Growth Timeline (6 Months)
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={growthData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                                dataKey="month"
                                tick={{ fontSize: 10 }}
                            />
                            <YAxis
                                tick={{ fontSize: 10 }}
                                tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px',
                                    fontSize: '11px'
                                }}
                                formatter={(value) => formatNumber(value)}
                            />
                            <Legend
                                wrapperStyle={{ fontSize: '11px' }}
                                iconType="line"
                            />
                            <Line
                                type="monotone"
                                dataKey="Instagram"
                                stroke="#E4405F"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="YouTube"
                                stroke="#FF0000"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="Facebook"
                                stroke="#1877F2"
                                strokeWidth={2}
                                dot={{ r: 3 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Clock className="h-4 w-4 text-purple-500" />
                        Engagement Decay Over Time
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <ResponsiveContainer width="100%" height={180}>
                        <AreaChart data={engagementDecay}>
                            <defs>
                                <linearGradient id="engagementGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis
                                dataKey="hours"
                                tick={{ fontSize: 10 }}
                                label={{ value: 'Hours After Posting', position: 'insideBottom', offset: -5, fontSize: 10 }}
                            />
                            <YAxis
                                tick={{ fontSize: 10 }}
                                label={{ value: 'Engagement %', angle: -90, position: 'insideLeft', fontSize: 10 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px',
                                    fontSize: '11px'
                                }}
                                formatter={(value) => `${value}%`}
                            />
                            <Area
                                type="monotone"
                                dataKey="engagement"
                                stroke="#8b5cf6"
                                strokeWidth={2}
                                fill="url(#engagementGradient)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                    <p className="text-xs text-muted-foreground mt-2">
                        💡 Most engagement happens in the first 6 hours. Schedule posts during peak times for maximum impact.
                    </p>
                </CardContent>
            </Card>

            {}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4 text-blue-500" />
                        Audience Composition
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <div className="grid grid-cols-2 gap-3">
                        {}
                        <div>
                            <ResponsiveContainer width="100%" height={120}>
                                <PieChart>
                                    <Pie
                                        data={audienceTypeData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={30}
                                        outerRadius={50}
                                        paddingAngle={2}
                                        dataKey="value"
                                    >
                                        {audienceTypeData.map((entry, index) => (
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
                                        formatter={(value) => `${value}%`}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {}
                        <div className="flex flex-col justify-center space-y-2">
                            <div className="flex items-center justify-between p-2 rounded-lg border bg-green-50 dark:bg-green-950">
                                <div className="flex items-center gap-2">
                                    <UserCheck className="h-4 w-4 text-green-600" />
                                    <span className="text-xs font-medium">Returning</span>
                                </div>
                                <span className="text-sm font-bold text-green-600">{audienceType.returning}%</span>
                            </div>
                            <div className="flex items-center justify-between p-2 rounded-lg border bg-blue-50 dark:bg-blue-950">
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-blue-600" />
                                    <span className="text-xs font-medium">New</span>
                                </div>
                                <span className="text-sm font-bold text-blue-600">{audienceType.new}%</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {}
            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm">Platform-wise Audience Behavior</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0 space-y-2">
                    {Object.entries(platformAudienceBehavior).map(([platform, data]) => {
                        const Icon = platformIcons[platform]
                        return (
                            <div key={platform} className="p-2 rounded-lg border bg-card">
                                <div className="flex items-center gap-2 mb-2">
                                    <Icon className="h-4 w-4" />
                                    <span className="text-xs font-semibold capitalize">{platform}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                    <div>
                                        <p className="text-muted-foreground">Avg Session</p>
                                        <p className="font-semibold">{data.avgSessionDuration}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Bounce Rate</p>
                                        <p className="font-semibold">{data.bounceRate}%</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Pages/Session</p>
                                        <p className="font-semibold">{data.pagesPerSession}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Returning</p>
                                        <p className="font-semibold">{data.returningRate}%</p>
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
