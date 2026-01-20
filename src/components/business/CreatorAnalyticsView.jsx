import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import {
    DollarSign, TrendingUp, TrendingDown, Users, Target, Heart, MessageCircle,
    ThumbsUp, Share2, Eye, MapPin, CheckCircle2, X, ArrowLeft, Download, FileText, FileSpreadsheet
} from 'lucide-react'
import { InfoTooltip } from './InfoTooltip'
import { formatNumber } from '@/lib/utils'
import { metricTooltips } from '@/data/businessMockData'
import { exportCreatorToPDF, exportCreatorToCSV, exportCreatorToExcel } from '@/lib/exportUtils'

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899']

export const CreatorAnalyticsView = ({ creator, onClose }) => {
    if (!creator?.analytics) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-center">
                    <p className="text-muted-foreground">Analytics not available for this creator</p>
                    <Button onClick={onClose} className="mt-4">Go Back</Button>
                </div>
            </div>
        )
    }

    const { analytics } = creator

    
    const contentFormatData = Object.entries(analytics.contentPerformance).map(([format, data]) => ({
        format: format.charAt(0).toUpperCase() + format.slice(1).replace(/([A-Z])/g, ' $1'),
        engagement: data.engagement,
        reach: data.reach / 1000 
    }))

    const sentimentData = [
        { name: 'Positive', value: analytics.sentiment.positive, color: '#10b981' },
        { name: 'Neutral', value: analytics.sentiment.neutral, color: '#6b7280' },
        { name: 'Negative', value: analytics.sentiment.negative, color: '#ef4444' }
    ]

    const platformData = Object.entries(analytics.platformPerformance).map(([platform, data]) => ({
        platform: platform.charAt(0).toUpperCase() + platform.slice(1),
        strength: data.strength,
        engagement: data.engagement,
        reach: data.reach / 1000
    }))

    const growthData = [
        { period: 'Last Week', growth: analytics.growth.lastWeek },
        { period: 'Last Month', growth: analytics.growth.lastMonth },
        { period: 'Last Year', growth: analytics.growth.lastYear },
        { period: 'Projected', growth: analytics.growth.projectedGrowth }
    ]

    const handleExport = (format) => {
        if (onExport) {
            onExport(creator, format)
        } else {
            alert(`Exporting ${creator.name}'s analytics as ${format}...`)
        }
    }

    return (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
            <div className="max-w-[1400px] mx-auto p-6">
                {}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center gap-3">
                            <img
                                src={creator.avatar}
                                alt={creator.name}
                                className="h-16 w-16 rounded-full"
                            />
                            <div>
                                <div className="flex items-center gap-2">
                                    <h1 className="text-2xl font-bold">{creator.name}</h1>
                                    {creator.verified && (
                                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                                    )}
                                </div>
                                <p className="text-muted-foreground">{creator.username}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="secondary">{creator.tier}</Badge>
                                    <Badge variant="outline">{formatNumber(creator.followers)} followers</Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    {}
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => exportCreatorToPDF(creator)} className="gap-2">
                            <FileText className="h-4 w-4" />
                            Export PDF
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => exportCreatorToCSV(creator)} className="gap-2">
                            <FileSpreadsheet className="h-4 w-4" />
                            Export CSV
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => exportCreatorToExcel(creator)} className="gap-2">
                            <Download className="h-4 w-4" />
                            Export Excel
                        </Button>
                    </div>
                </div>

                {}
                <div className="grid grid-cols-2 gap-6">
                    {}
                    <Card>
                        <CardHeader className="p-4 border-b">
                            <CardTitle className="text-base flex items-center gap-2">
                                <DollarSign className="h-5 w-5 text-green-500" />
                                Revenue & ROI Statistics
                                <InfoTooltip content={metricTooltips.estimatedROI} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-lg border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1">Estimated ROI</p>
                                    <p className="text-2xl font-bold text-green-600">{analytics.revenue.estimatedROI}x</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        ${1000} → ${(1000 * analytics.revenue.estimatedROI).toLocaleString()}
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                        Conversion Rate
                                        <InfoTooltip content={metricTooltips.averageConversionRate} />
                                    </p>
                                    <p className="text-2xl font-bold">{analytics.revenue.averageConversionRate}%</p>
                                </div>
                                <div className="p-3 rounded-lg border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1">Revenue/Campaign</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        ${formatNumber(analytics.revenue.revenuePerCampaign)}
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1">CPM</p>
                                    <p className="text-2xl font-bold">${analytics.revenue.costPerThousandReach}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {}
                    <Card>
                        <CardHeader className="p-4 border-b">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Eye className="h-5 w-5 text-purple-500" />
                                Content Format Performance
                                <InfoTooltip content={metricTooltips.contentFormatPerformance} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={contentFormatData} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis type="number" className="text-xs" />
                                    <YAxis dataKey="format" type="category" className="text-xs" width={100} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Bar dataKey="engagement" fill="#8b5cf6" name="Engagement %" />
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="mt-3 p-2 bg-purple-50 dark:bg-purple-950 rounded-lg">
                                <p className="text-xs font-semibold">Best Performer: {creator.stats.bestContentType}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {}
                    <Card>
                        <CardHeader className="p-4 border-b">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Heart className="h-5 w-5 text-pink-500" />
                                Audience Sentiment Analysis
                                <InfoTooltip content={metricTooltips.sentimentAnalysis} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <ResponsiveContainer width="100%" height={180}>
                                    <PieChart>
                                        <Pie
                                            data={sentimentData}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={70}
                                            fill="#8884d8"
                                            dataKey="value"
                                            label={({ name, value }) => `${name} ${value}%`}
                                        >
                                            {sentimentData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="space-y-2">
                                    <div className="p-2 rounded-lg border">
                                        <p className="text-xs text-muted-foreground">Sentiment Score</p>
                                        <p className="text-xl font-bold text-green-600">{analytics.sentiment.sentimentScore}/10</p>
                                    </div>
                                    <div className="p-2 rounded-lg border">
                                        <p className="text-xs text-muted-foreground mb-2">Top Keywords</p>
                                        <div className="flex flex-wrap gap-1">
                                            {analytics.sentiment.topKeywords.map(keyword => (
                                                <Badge key={keyword} variant="secondary" className="text-xs">
                                                    {keyword}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {}
                    <Card>
                        <CardHeader className="p-4 border-b">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Target className="h-5 w-5 text-blue-500" />
                                Platform Performance
                                <InfoTooltip content={metricTooltips.platformStrength} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={platformData}>
                                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                    <XAxis dataKey="platform" className="text-xs" />
                                    <YAxis className="text-xs" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '8px'
                                        }}
                                    />
                                    <Legend />
                                    <Bar dataKey="strength" fill="#3b82f6" name="Strength Score" />
                                    <Bar dataKey="engagement" fill="#8b5cf6" name="Engagement %" />
                                </BarChart>
                            </ResponsiveContainer>
                            <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-950 rounded-lg">
                                <p className="text-xs font-semibold">Best Platform: {creator.stats.bestPlatform}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {}
                    <Card>
                        <CardHeader className="p-4 border-b">
                            <CardTitle className="text-base flex items-center gap-2">
                                <ThumbsUp className="h-5 w-5 text-orange-500" />
                                Engagement Quality Metrics
                                <InfoTooltip content={metricTooltips.engagementRate} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="grid grid-cols-3 gap-3">
                                <div className="p-3 rounded-lg border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1">Engagement Rate</p>
                                    <p className="text-xl font-bold text-orange-600">
                                        {analytics.engagementQuality.engagementRate}%
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                        Likes/Comments
                                        <InfoTooltip content={metricTooltips.likesCommentsRatio} />
                                    </p>
                                    <p className="text-xl font-bold">{analytics.engagementQuality.likesCommentsRatio}</p>
                                </div>
                                <div className="p-3 rounded-lg border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                        Bot Score
                                        <InfoTooltip content={metricTooltips.botScore} />
                                    </p>
                                    <p className="text-xl font-bold text-green-600">
                                        {analytics.engagementQuality.botScore}/10
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1">Save Rate</p>
                                    <p className="text-xl font-bold">{analytics.engagementQuality.saveRate}%</p>
                                </div>
                                <div className="p-3 rounded-lg border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1">Share Rate</p>
                                    <p className="text-xl font-bold">{analytics.engagementQuality.shareRate}%</p>
                                </div>
                                <div className="p-3 rounded-lg border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1">Avg Comment Length</p>
                                    <p className="text-xl font-bold">{analytics.engagementQuality.averageCommentLength}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {}
                    <Card>
                        <CardHeader className="p-4 border-b">
                            <CardTitle className="text-base flex items-center gap-2">
                                <Users className="h-5 w-5 text-indigo-500" />
                                Follower Retention & Churn
                                <InfoTooltip content={metricTooltips.followerRetentionRate} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-lg border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1">Retention Rate</p>
                                    <p className="text-2xl font-bold text-green-600">
                                        {analytics.retention.followerRetentionRate}%
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
                                        Drop-off After Ads
                                        <InfoTooltip content={metricTooltips.dropOffAfterSponsored} />
                                    </p>
                                    <p className="text-2xl font-bold text-orange-600">
                                        {analytics.retention.dropOffAfterSponsored}%
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1">Unfollow Rate</p>
                                    <p className="text-2xl font-bold">{analytics.retention.unfollowRate}%</p>
                                </div>
                                <div className="p-3 rounded-lg border bg-card">
                                    <p className="text-xs text-muted-foreground mb-1">Loyalty Score</p>
                                    <p className="text-2xl font-bold text-indigo-600">
                                        {analytics.retention.loyaltyScore}/10
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {}
                    <Card className="col-span-2">
                        <CardHeader className="p-4 border-b">
                            <CardTitle className="text-base flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-emerald-500" />
                                Growth Trajectory & Trends
                                <InfoTooltip content={metricTooltips.followerGrowth} />
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="grid grid-cols-[2fr_1fr] gap-4">
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={growthData}>
                                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                                        <XAxis dataKey="period" className="text-xs" />
                                        <YAxis className="text-xs" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'hsl(var(--card))',
                                                border: '1px solid hsl(var(--border))',
                                                borderRadius: '8px'
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="growth"
                                            stroke="#10b981"
                                            strokeWidth={2}
                                            name="Growth %"
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div className="space-y-3">
                                    <div className="p-3 rounded-lg border bg-card">
                                        <p className="text-xs text-muted-foreground mb-1">Trend</p>
                                        <div className="flex items-center gap-2">
                                            {analytics.growth.trend === 'rising' ? (
                                                <TrendingUp className="h-5 w-5 text-green-500" />
                                            ) : (
                                                <TrendingDown className="h-5 w-5 text-red-500" />
                                            )}
                                            <p className="text-lg font-bold capitalize">{analytics.growth.trend}</p>
                                        </div>
                                    </div>
                                    <div className="p-3 rounded-lg border bg-card">
                                        <p className="text-xs text-muted-foreground mb-1">Virality Score</p>
                                        <p className="text-xl font-bold text-purple-600">
                                            {analytics.growth.viralityScore}/10
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
