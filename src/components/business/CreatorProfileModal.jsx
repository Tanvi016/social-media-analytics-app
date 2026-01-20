import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Users,
    CheckCircle2,
    TrendingUp,
    Lock,
    Instagram,
    Youtube,
    Facebook,
    Linkedin,
    Twitter,
    BarChart3
} from 'lucide-react'
import { formatNumber } from '@/lib/utils'
import { InfoTooltip } from './InfoTooltip'
import { metricDefinitions } from '@/data/businessMockData'
import { CreatorAnalyticsView } from './CreatorAnalyticsView'

const PlatformIcon = ({ platform }) => {
    const icons = {
        Instagram: Instagram,
        YouTube: Youtube,
        Facebook: Facebook,
        LinkedIn: Linkedin,
        Twitter: Twitter,
        TikTok: Users
    }
    const Icon = icons[platform] || Users
    return <Icon className="h-4 w-4" />
}

export const CreatorProfileModal = ({ creator, onContact, onClose }) => {
    const [showFullAnalytics, setShowFullAnalytics] = useState(false)

    if (!creator) return null

    
    if (showFullAnalytics && creator.analytics) {
        return (
            <CreatorAnalyticsView
                creator={creator}
                onClose={() => setShowFullAnalytics(false)}
            />
        )
    }

    const isLocked = !creator.isUnlocked

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <Card className="border-0">
                    <CardHeader className="border-b">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <img
                                    src={creator.avatar}
                                    alt={creator.name}
                                    className="h-20 w-20 rounded-full"
                                />
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <CardTitle className="text-2xl">{creator.name}</CardTitle>
                                        {creator.verified && (
                                            <CheckCircle2 className="h-5 w-5 text-blue-500" />
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-2">{creator.username}</p>
                                    <p className="text-sm mb-3">{creator.bio}</p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Badge variant="outline" className="gap-1">
                                            <Users className="h-3 w-3" />
                                            {formatNumber(creator.followers)} followers
                                        </Badge>
                                        <Badge variant="secondary">{creator.tier}</Badge>
                                        <Badge variant="secondary">{creator.region}</Badge>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={onClose}>
                                ✕
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent className="p-6">
                        {}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold mb-2">Active Platforms</h3>
                            <div className="flex gap-2">
                                {creator.platforms.map(platform => (
                                    <Badge key={platform} variant="outline" className="gap-1">
                                        <PlatformIcon platform={platform} />
                                        {platform}
                                    </Badge>
                                ))}
                            </div>
                        </div>

                        {}
                        <div className="mb-6">
                            <h3 className="text-sm font-semibold mb-2">Domains</h3>
                            <div className="flex gap-2 flex-wrap">
                                {creator.domain.map(d => (
                                    <Badge key={d} variant="secondary">{d}</Badge>
                                ))}
                            </div>
                        </div>

                        {}
                        {isLocked ? (
                            <div className="bg-muted/50 rounded-lg p-8 text-center">
                                <Lock className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                                <h3 className="text-lg font-semibold mb-2">Detailed Analytics Locked</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    This creator hasn't unlocked their detailed analytics yet. Contact them to request access.
                                </p>
                                <Button onClick={() => onContact(creator)}>
                                    Contact Creator
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">Performance Analytics</h3>
                                    {creator.analytics && (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowFullAnalytics(true)}
                                            className="gap-2"
                                        >
                                            <BarChart3 className="h-4 w-4" />
                                            View Full Analytics
                                        </Button>
                                    )}
                                </div>

                                {/* Rest of the existing analytics preview code remains the same */}
                                {/* Key Metrics Grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <Card>
                                        <CardContent className="p-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-xs text-muted-foreground">Revenue Est.</p>
                                                <InfoTooltip content={metricDefinitions.revenueEstimate} />
                                            </div>
                                            <p className="text-lg font-bold text-green-600">
                                                ${formatNumber(creator.stats.revenueEstimate)}
                                            </p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="p-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-xs text-muted-foreground">ROI</p>
                                                <InfoTooltip content={metricDefinitions.roi} />
                                            </div>
                                            <p className="text-lg font-bold">{creator.stats.roi}x</p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="p-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-xs text-muted-foreground">Engagement</p>
                                                <InfoTooltip content={metricDefinitions.engagementRate} />
                                            </div>
                                            <p className="text-lg font-bold">{creator.stats.engagementRate}%</p>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardContent className="p-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-xs text-muted-foreground">Churn Rate</p>
                                                <InfoTooltip content={metricDefinitions.customerChurn} />
                                            </div>
                                            <p className="text-lg font-bold">{creator.stats.customerChurn}%</p>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Platform & Content Performance */}
                                <div className="grid grid-cols-2 gap-4">
                                    <Card>
                                        <CardHeader className="p-3">
                                            <CardTitle className="text-sm flex items-center gap-2">
                                                Best Platform
                                                <InfoTooltip content={metricDefinitions.bestPlatform} />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-3 pt-0">
                                            <Badge variant="outline" className="gap-1">
                                                <PlatformIcon platform={creator.stats.bestPlatform} />
                                                {creator.stats.bestPlatform}
                                            </Badge>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader className="p-3">
                                            <CardTitle className="text-sm flex items-center gap-2">
                                                Best Content Type
                                                <InfoTooltip content={metricDefinitions.bestContentType} />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-3 pt-0">
                                            <Badge variant="secondary">{creator.stats.bestContentType}</Badge>
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Audience Sentiment */}
                                <Card>
                                    <CardHeader className="p-3">
                                        <CardTitle className="text-sm flex items-center gap-2">
                                            Audience Sentiment
                                            <InfoTooltip content={metricDefinitions.audienceSentiment} />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-3 pt-0">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <span>Positive</span>
                                                <span className="font-semibold text-green-600">
                                                    {creator.stats.audienceSentiment.positive}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-secondary rounded-full h-2">
                                                <div
                                                    className="bg-green-500 h-2 rounded-full"
                                                    style={{ width: `${creator.stats.audienceSentiment.positive}%` }}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <span>Neutral</span>
                                                <span className="font-semibold">
                                                    {creator.stats.audienceSentiment.neutral}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-secondary rounded-full h-2">
                                                <div
                                                    className="bg-gray-400 h-2 rounded-full"
                                                    style={{ width: `${creator.stats.audienceSentiment.neutral}%` }}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <span>Negative</span>
                                                <span className="font-semibold text-red-600">
                                                    {creator.stats.audienceSentiment.negative}%
                                                </span>
                                            </div>
                                            <div className="w-full bg-secondary rounded-full h-2">
                                                <div
                                                    className="bg-red-500 h-2 rounded-full"
                                                    style={{ width: `${creator.stats.audienceSentiment.negative}%` }}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Follower Growth */}
                                <Card>
                                    <CardHeader className="p-3">
                                        <CardTitle className="text-sm flex items-center gap-2">
                                            Follower Growth
                                            <InfoTooltip content={metricDefinitions.followerGrowth} />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-3 pt-0">
                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1">Week</p>
                                                <p className="font-semibold flex items-center gap-1 text-green-600">
                                                    <TrendingUp className="h-3 w-3" />
                                                    {creator.stats.followerGrowth.week}%
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1">Month</p>
                                                <p className="font-semibold flex items-center gap-1 text-green-600">
                                                    <TrendingUp className="h-3 w-3" />
                                                    {creator.stats.followerGrowth.month}%
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1">Year</p>
                                                <p className="font-semibold flex items-center gap-1 text-green-600">
                                                    <TrendingUp className="h-3 w-3" />
                                                    {creator.stats.followerGrowth.year}%
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Content Performance */}
                                <Card>
                                    <CardHeader className="p-3">
                                        <CardTitle className="text-sm flex items-center gap-2">
                                            Content Performance
                                            <InfoTooltip content={metricDefinitions.contentPerformance} />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-3 pt-0">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1">Reels</p>
                                                <p className="font-semibold">{creator.stats.contentPerformance.reels}%</p>
                                                <div className="w-full bg-secondary rounded-full h-2 mt-1">
                                                    <div
                                                        className="bg-primary h-2 rounded-full"
                                                        style={{ width: `${creator.stats.contentPerformance.reels}%` }}
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1">Static Posts</p>
                                                <p className="font-semibold">{creator.stats.contentPerformance.static}%</p>
                                                <div className="w-full bg-secondary rounded-full h-2 mt-1">
                                                    <div
                                                        className="bg-purple-500 h-2 rounded-full"
                                                        style={{ width: `${creator.stats.contentPerformance.static}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-4">
                                    <Button onClick={() => onContact(creator)} className="flex-1">
                                        Contact Creator
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        Add to Campaign
                                    </Button>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
