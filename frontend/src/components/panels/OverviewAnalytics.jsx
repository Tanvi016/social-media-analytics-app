import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Heart, Share2, Eye, Users, Instagram, Youtube, Facebook, Info } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { useParams } from 'react-router-dom'
import { userProfiles, getFallbackProfile } from '@/data/userMockData'
import { dataService } from '@/lib/dataService'
import { formatNumber } from '@/lib/utils'
import { engagementTrends30Days, engagementTrends90Days, platformColors } from '@/data/mockData'

export const OverviewAnalytics = ({ platformFilter }) => {
    const { username } = useParams()
    const profile = userProfiles[username] || getFallbackProfile(username)
    const [timeRange, setTimeRange] = useState('30')
    const [stats, setStats] = useState(null)
    const [trends, setTrends] = useState(null)
    const [loading, setLoading] = useState(true)

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await dataService.getOverview(profile.id, platformFilter, timeRange, username)
                const trendsData = await dataService.getTrends(profile.id, username)
                setStats(data)
                setTrends(trendsData)
            } catch (error) {
                console.error("Failed to fetch analytics", error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [platformFilter, timeRange, username, profile.id])

    const dynamicFollowerGrowth = dataService.getFollowerGrowth(username)
    const trendData = timeRange === '30' ? engagementTrends30Days : engagementTrends90Days

    if (loading) return <div className="p-4 text-center">Loading analytics...</div>

    const kpis = [
        {
            title: 'Total Likes',
            value: stats?.total_likes || 0,
            icon: Heart,
            color: 'text-pink-500',
        },
        {
            title: 'Total Shares',
            value: stats?.total_shares || 0,
            icon: Share2,
            color: 'text-blue-500',
        },
        {
            title: 'Total Reach',
            value: stats?.total_views || 0,
            icon: Eye,
            color: 'text-purple-500',
        },
    ]

    const platformIcons = {
        instagram: Instagram,
        youtube: Youtube,
        facebook: Facebook,
    }

    const GrowthIndicator = ({ current }) => {
        const growthStr = trends?.facts?.engagement_change || "0%"
        const growth = parseFloat(growthStr)
        const isPositive = growth >= 0

        return (
            <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{Math.abs(growth).toFixed(1)}%</span>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <h2 className="text-base font-bold">Overview Analytics</h2>
                <HoverCard>
                    <HoverCardTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-64 text-xs">
                        <p className="font-semibold mb-1">Overview Analytics</p>
                        <p className="text-muted-foreground">
                            High-level performance metrics across all platforms. Shows total engagement (likes, shares, reach) and follower growth trends compared to previous period.
                        </p>
                    </HoverCardContent>
                </HoverCard>
            </div>

            <div className="grid grid-cols-3 gap-2">
                {kpis.map((kpi, index) => {
                    const Icon = kpi.icon
                    return (
                        <Card key={index} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-3">
                                <div className="flex items-start justify-between">
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-muted-foreground">{kpi.title}</p>
                                        <p className="text-xl font-bold">{formatNumber(kpi.value)}</p>
                                        <GrowthIndicator current={kpi.value} />
                                    </div>
                                    <div className={`p-2 rounded-lg bg-accent ${kpi.color}`}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <Card>
                <CardHeader className="p-3 pb-2">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Follower Growth
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <div className="grid grid-cols-3 gap-2">
                        {Object.entries(dynamicFollowerGrowth).map(([platform, data]) => {
                            const isPositive = data.growth >= 0
                            const PlatformIcon = platformIcons[platform.toLowerCase()] || Instagram
                            return (
                                <div key={platform} className="p-2 rounded-lg border bg-card">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-medium capitalize">{platform}</span>
                                        <PlatformIcon className="h-4 w-4" />
                                    </div>
                                    <p className="text-lg font-bold mb-0.5">{formatNumber(data.current)}</p>
                                    <div className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                                        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                                        <span>{Math.abs(data.growth).toFixed(1)}%</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="p-3 pb-2">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">Engagement Trends</CardTitle>
                        <Tabs value={timeRange} onValueChange={setTimeRange}>
                            <TabsList className="h-7">
                                <TabsTrigger value="30" className="text-xs px-2">30d</TabsTrigger>
                                <TabsTrigger value="90" className="text-xs px-2">90d</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={trendData}>
                            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                            <XAxis dataKey="date" className="text-xs" tick={{ fontSize: 10 }} />
                            <YAxis className="text-xs" tick={{ fontSize: 10 }} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--card))',
                                    border: '1px solid hsl(var(--border))',
                                    borderRadius: '8px',
                                    fontSize: '12px'
                                }}
                            />
                            <Legend wrapperStyle={{ fontSize: '11px' }} />
                            <Line
                                type="monotone"
                                dataKey="instagram"
                                stroke={platformColors.instagram}
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="youtube"
                                stroke={platformColors.youtube}
                                strokeWidth={2}
                                dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey="facebook"
                                stroke={platformColors.facebook}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    )
}
