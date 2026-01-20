import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DollarSign, TrendingUp, Sparkles, Instagram, Youtube, Facebook, Zap, Target, BarChart3 } from 'lucide-react'
import { formatNumber } from '@/lib/utils'

export const RecommendationsPage = ({ platformFilter }) => {
    const revenueData = {
        all: [
            { platform: 'YouTube', revenue: 4250, icon: Youtube, growth: 12.5, color: 'text-red-500' },
            { platform: 'Instagram', revenue: 2890, icon: Instagram, growth: 8.3, color: 'text-pink-500' },
            { platform: 'Facebook', revenue: 1560, icon: Facebook, growth: -2.1, color: 'text-blue-500' },
        ],
        instagram: [
            { platform: 'Instagram', revenue: 2890, icon: Instagram, growth: 8.3, color: 'text-pink-500' },
        ],
        youtube: [
            { platform: 'YouTube', revenue: 4250, icon: Youtube, growth: 12.5, color: 'text-red-500' },
        ],
        facebook: [
            { platform: 'Facebook', revenue: 1560, icon: Facebook, growth: -2.1, color: 'text-blue-500' },
        ],
    }

    const contentPerformance = {
        all: [
            { type: 'Long-form Videos', engagement: 12.3, revenue: 4100, conversion: 5.8, platform: 'YouTube' },
            { type: 'Reels', engagement: 8.5, revenue: 3200, conversion: 4.2, platform: 'Instagram' },
            { type: 'Carousels', engagement: 6.2, revenue: 1800, conversion: 3.1, platform: 'Instagram' },
            { type: 'Static Posts', engagement: 4.1, revenue: 950, conversion: 2.3, platform: 'Facebook' },
        ],
        instagram: [
            { type: 'Reels', engagement: 8.5, revenue: 1800, conversion: 4.2 },
            { type: 'Carousels', engagement: 6.2, revenue: 850, conversion: 3.1 },
            { type: 'Static Posts', engagement: 4.1, revenue: 240, conversion: 2.1 },
        ],
        youtube: [
            { type: 'Long-form Videos', engagement: 12.3, revenue: 3100, conversion: 5.8 },
            { type: 'Shorts', engagement: 7.2, revenue: 1150, conversion: 3.9 },
        ],
        facebook: [
            { type: 'Videos', engagement: 5.8, revenue: 680, conversion: 2.8 },
            { type: 'Carousels', engagement: 4.5, revenue: 520, conversion: 2.5 },
            { type: 'Static Posts', engagement: 3.2, revenue: 360, conversion: 1.9 },
        ],
    }

    const aiRecommendations = {
        all: [
            { title: 'Optimize Posting Schedule', insight: 'Post YouTube videos at 6 PM for 23% higher engagement', priority: 'high' },
            { title: 'Content Format Shift', insight: 'Long-form videos generate 28% more revenue than Reels', priority: 'high' },
            { title: 'Platform Focus', insight: 'YouTube shows strongest growth - increase posting frequency by 2x', priority: 'medium' },
            { title: 'Engagement Boost', insight: 'Add carousel posts on Instagram - 45% better conversion rate', priority: 'medium' },
        ],
        instagram: [
            { title: 'Optimal Posting Time', insight: 'Post Reels at 6 PM for +23% engagement', priority: 'high' },
            { title: 'Content Mix', insight: 'Add more carousel posts - 45% better conversion rate', priority: 'high' },
            { title: 'Story Engagement', insight: 'Use interactive stickers to boost story engagement by 35%', priority: 'medium' },
        ],
        youtube: [
            { title: 'Posting Frequency', insight: 'Increase posting frequency by 2x for maximum growth', priority: 'high' },
            { title: 'Content Length', insight: 'Long-form videos outperform Shorts by 49% in revenue', priority: 'high' },
            { title: 'Thumbnail Optimization', insight: 'A/B test thumbnails to increase CTR by 18%', priority: 'medium' },
        ],
        facebook: [
            { title: 'Content Strategy', insight: 'Reduce static posts - showing -2.1% growth', priority: 'high' },
            { title: 'Video Focus', insight: 'Shift to video content for better engagement', priority: 'high' },
            { title: 'Cross-posting', insight: 'Share Instagram Reels to Facebook for 25% more reach', priority: 'medium' },
        ],
    }

    const totalRevenue = {
        all: 8700,
        instagram: 2890,
        youtube: 4250,
        facebook: 1560,
    }

    const projectedIncrease = {
        all: 2340,
        instagram: 890,
        youtube: 1250,
        facebook: 200,
    }

    const currentRevenue = revenueData[platformFilter] || revenueData.all
    const currentContent = contentPerformance[platformFilter] || contentPerformance.all
    const currentRecommendations = aiRecommendations[platformFilter] || aiRecommendations.all
    const currentTotal = totalRevenue[platformFilter] || totalRevenue.all
    const currentProjected = projectedIncrease[platformFilter] || projectedIncrease.all

    return (
        <div className="h-full overflow-y-auto p-6">
            <div className="max-w-6xl mx-auto space-y-4">
                {}
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                        <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">AI-Powered Recommendations</h1>
                        <p className="text-sm text-muted-foreground">Automated insights to optimize your content strategy</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {}
                    <div className="col-span-2 space-y-4">
                        {}
                        <Card>
                            <CardHeader className="p-4">
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="h-5 w-5 text-yellow-500" />
                                    Priority Recommendations
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 space-y-3">
                                {currentRecommendations.map((rec, index) => (
                                    <div
                                        key={index}
                                        className={`p-4 rounded-lg border ${rec.priority === 'high'
                                            ? 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800'
                                            : 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-semibold">{rec.title}</h4>
                                            <Badge
                                                variant={rec.priority === 'high' ? 'destructive' : 'secondary'}
                                                className="text-xs"
                                            >
                                                {rec.priority}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{rec.insight}</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        {}
                        <Card>
                            <CardHeader className="p-4">
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-5 w-5 text-green-500" />
                                    Revenue Optimization Strategy
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <div className="p-4 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-950 dark:to-blue-950 rounded-lg border border-purple-200 dark:border-purple-800">
                                    <h4 className="font-bold mb-3 flex items-center gap-2">
                                        <Sparkles className="h-4 w-4" />
                                        Action Plan
                                    </h4>
                                    <ul className="space-y-2">
                                        {platformFilter === 'all' && (
                                            <>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-0.5">✓</span>
                                                    <span className="text-sm">Focus on YouTube long-form content (+28% revenue)</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-0.5">✓</span>
                                                    <span className="text-sm">Post Instagram Reels at 6 PM (+23% engagement)</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-0.5">✓</span>
                                                    <span className="text-sm">Reduce Facebook static posts (-2.1% growth)</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-0.5">✓</span>
                                                    <span className="text-sm">Increase carousel usage (+45% conversion)</span>
                                                </li>
                                            </>
                                        )}
                                        {platformFilter === 'instagram' && (
                                            <>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-0.5">✓</span>
                                                    <span className="text-sm">Post Reels at 6 PM for maximum engagement</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-0.5">✓</span>
                                                    <span className="text-sm">Increase carousel posts by 50%</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-0.5">✓</span>
                                                    <span className="text-sm">Use trending audio in Reels</span>
                                                </li>
                                            </>
                                        )}
                                        {platformFilter === 'youtube' && (
                                            <>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-0.5">✓</span>
                                                    <span className="text-sm">Double your posting frequency</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-0.5">✓</span>
                                                    <span className="text-sm">Focus on long-form content (10+ minutes)</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-0.5">✓</span>
                                                    <span className="text-sm">Optimize thumbnails and titles</span>
                                                </li>
                                            </>
                                        )}
                                        {platformFilter === 'facebook' && (
                                            <>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-0.5">✓</span>
                                                    <span className="text-sm">Shift from static posts to videos</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-0.5">✓</span>
                                                    <span className="text-sm">Cross-post Instagram Reels</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-green-600 mt-0.5">✓</span>
                                                    <span className="text-sm">Focus on video content</span>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                    <div className="mt-4 pt-4 border-t border-purple-300 dark:border-purple-700">
                                        <p className="font-semibold text-purple-900 dark:text-purple-100">
                                            Projected Revenue Increase: <span className="text-green-600">+${formatNumber(currentProjected)}/month</span>
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {}
                        <Card>
                            <CardHeader className="p-4">
                                <CardTitle className="flex items-center gap-2">
                                    <BarChart3 className="h-5 w-5 text-blue-500" />
                                    Content Type Performance
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <div className="space-y-3">
                                    {currentContent.map((item, index) => (
                                        <div key={index} className="p-3 rounded-lg border bg-card">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold">{item.type}</span>
                                                    {item.platform && (
                                                        <Badge variant="outline" className="text-xs">
                                                            {item.platform === 'Instagram' && <Instagram className="h-3 w-3 mr-1" />}
                                                            {item.platform === 'YouTube' && <Youtube className="h-3 w-3 mr-1" />}
                                                            {item.platform === 'Facebook' && <Facebook className="h-3 w-3 mr-1" />}
                                                            {item.platform}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <Badge variant="secondary" className="text-xs">
                                                    {item.conversion}% conversion
                                                </Badge>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3 text-sm">
                                                <div>
                                                    <p className="text-muted-foreground text-xs">Engagement</p>
                                                    <p className="font-semibold">{item.engagement}%</p>
                                                </div>
                                                <div>
                                                    <p className="text-muted-foreground text-xs">Revenue</p>
                                                    <p className="font-semibold text-green-600">${formatNumber(item.revenue)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {}
                    <div className="space-y-4">
                        {}
                        <Card>
                            <CardHeader className="p-4">
                                <CardTitle className="flex items-center gap-2 text-base">
                                    <DollarSign className="h-5 w-5 text-green-500" />
                                    Total Revenue
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                                <p className="text-3xl font-bold text-green-600">${formatNumber(currentTotal)}</p>
                                <p className="text-xs text-muted-foreground mt-1">Current month</p>
                            </CardContent>
                        </Card>

                        {}
                        <Card>
                            <CardHeader className="p-4">
                                <CardTitle className="text-base">Revenue Breakdown</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 space-y-3">
                                {currentRevenue.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <div key={item.platform} className="p-3 rounded-lg border bg-card">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <Icon className={`h-4 w-4 ${item.color}`} />
                                                    <span className="text-sm font-semibold">{item.platform}</span>
                                                </div>
                                                <p className="text-lg font-bold text-green-600">${formatNumber(item.revenue)}</p>
                                            </div>
                                            <div className={`flex items-center gap-1 text-xs ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                <TrendingUp className={`h-3 w-3 ${item.growth < 0 ? 'rotate-180' : ''}`} />
                                                <span>{Math.abs(item.growth)}% this month</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </CardContent>
                        </Card>

                        {}
                        <Card>
                            <CardContent className="p-4">
                                <Button className="w-full" size="sm">
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Get More AI Insights
                                </Button>
                                <p className="text-xs text-muted-foreground text-center mt-2">
                                    Connect AI model for deeper analysis
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
