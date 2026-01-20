import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Edit, Save, X, TrendingUp, DollarSign, Sparkles, Instagram, Youtube, Facebook as FacebookIcon, Plus, ExternalLink, Eye, EyeOff } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [connectedAccounts, setConnectedAccounts] = useState([
        { platform: 'instagram', username: '@johndoe', url: 'https://instagram.com/johndoe', icon: Instagram, color: 'text-pink-500' },
        { platform: 'youtube', username: '@johndoe', url: 'https://youtube.com/@johndoe', icon: Youtube, color: 'text-red-500' },
    ])
    const [businessVisibility, setBusinessVisibility] = useState({
        followerCount: false,
        engagementRate: false,
        customerChurn: false,
        sentimentAnalysis: false,
        bestFormat: false,
    })

    const availablePlatforms = [
        { platform: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
        { platform: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-500' },
        { platform: 'facebook', name: 'Facebook', icon: FacebookIcon, color: 'text-blue-500' },
    ]

    const handleAddAccount = (platform) => {
        const platformData = availablePlatforms.find(p => p.platform === platform)
        const newAccount = {
            platform,
            username: `@johndoe_${platform}`,
            url: `https://${platform}.com/johndoe`,
            icon: platformData.icon,
            color: platformData.color,
        }
        setConnectedAccounts([...connectedAccounts, newAccount])
    }

    const handleRemoveAccount = (platform) => {
        setConnectedAccounts(connectedAccounts.filter(acc => acc.platform !== platform))
    }

    const handleOpenSocial = (url, platform) => {
        const confirmed = window.confirm(`Open ${platform} in a new tab?`)
        if (confirmed) {
            window.open(url, '_blank', 'noopener,noreferrer')
        }
    }

    const unconnectedPlatforms = availablePlatforms.filter(
        p => !connectedAccounts.find(acc => acc.platform === p.platform)
    )

    const revenueData = [
        { platform: 'YouTube', revenue: 4250, icon: Youtube, growth: 12.5, color: 'text-red-500' },
        { platform: 'Instagram', revenue: 2890, icon: Instagram, growth: 8.3, color: 'text-pink-500' },
        { platform: 'Facebook', revenue: 1560, icon: FacebookIcon, growth: -2.1, color: 'text-blue-500' },
    ]

    const contentPerformance = [
        { type: 'Reels', engagement: 8.5, revenue: 3200, conversion: 4.2 },
        { type: 'Long-form Videos', engagement: 12.3, revenue: 4100, conversion: 5.8 },
        { type: 'Carousels', engagement: 6.2, revenue: 1800, conversion: 3.1 },
        { type: 'Static Posts', engagement: 4.1, revenue: 950, conversion: 2.3 },
    ]

    const aiRecommendations = [
        { title: 'Optimize Posting Schedule', insight: 'Post YouTube videos at 6 PM for 23% higher engagement', priority: 'high' },
        { title: 'Content Format Shift', insight: 'Long-form videos generate 28% more revenue than Reels', priority: 'high' },
        { title: 'Platform Focus', insight: 'YouTube shows strongest growth - increase posting frequency by 2x', priority: 'medium' },
    ]

    const businessMetrics = {
        followerCount: { value: '241.5K', growth: '+12.3%' },
        engagementRate: { value: '8.7%', growth: '+2.1%' },
        customerChurn: { value: '3.2%', growth: '-0.8%' },
        sentimentAnalysis: { positive: 78.5, negative: 12.3, neutral: 9.2 },
        bestFormat: { name: 'Long-form Videos', performance: '12.3%' },
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-4">
                {}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                                    JD
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">John Doe</h2>
                                    <p className="text-sm text-muted-foreground mb-2">Content Creator</p>

                                    {}
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {connectedAccounts.map((account) => {
                                            const Icon = account.icon
                                            return (
                                                <button
                                                    key={account.platform}
                                                    onClick={() => handleOpenSocial(account.url, account.platform)}
                                                    className="flex items-center gap-1 px-2 py-1 rounded-lg border hover:bg-accent transition-colors"
                                                >
                                                    <Icon className={`h-4 w-4 ${account.color}`} />
                                                    <span className="text-xs font-medium">{account.username}</span>
                                                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                                </button>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="max-w-3xl mx-auto space-y-4">
                    {}
                    <Card>
                        <CardHeader className="p-3 pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-sm">Connected Accounts</CardTitle>
                                {unconnectedPlatforms.length > 0 && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="sm" variant="outline">
                                                <Plus className="h-3 w-3 mr-1" />
                                                Add
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Add Platform</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            {unconnectedPlatforms.map((platform) => {
                                                const Icon = platform.icon
                                                return (
                                                    <DropdownMenuItem
                                                        key={platform.platform}
                                                        onClick={() => handleAddAccount(platform.platform)}
                                                    >
                                                        <Icon className={`h-4 w-4 mr-2 ${platform.color}`} />
                                                        {platform.name}
                                                    </DropdownMenuItem>
                                                )
                                            })}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="p-3 pt-0 space-y-2">
                            {connectedAccounts.map((account) => {
                                const Icon = account.icon
                                return (
                                    <div key={account.platform} className="flex items-center justify-between p-2 rounded-lg border bg-card">
                                        <div className="flex items-center gap-2">
                                            <Icon className={`h-4 w-4 ${account.color}`} />
                                            <div>
                                                <p className="text-xs font-semibold capitalize">{account.platform}</p>
                                                <p className="text-xs text-muted-foreground">{account.username}</p>
                                            </div>
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => handleRemoveAccount(account.platform)}
                                            className="h-6 w-6 p-0"
                                        >
                                            <X className="h-3 w-3 text-destructive" />
                                        </Button>
                                    </div>
                                )
                            })}
                            {connectedAccounts.length === 0 && (
                                <p className="text-xs text-muted-foreground text-center py-4">
                                    No accounts connected. Click "Add" to connect a platform.
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {}
                    <Card>
                        <CardHeader className="p-3 pb-2">
                            <CardTitle className="text-sm">Business Account Visibility</CardTitle>
                            <p className="text-xs text-muted-foreground mt-1">
                                Toggle what business accounts can see
                            </p>
                        </CardHeader>
                        <CardContent className="p-3 pt-0 space-y-2">
                            {Object.entries(businessVisibility).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between p-2 rounded-lg border bg-card">
                                    <span className="text-xs font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                    <Button
                                        size="sm"
                                        variant={value ? 'default' : 'outline'}
                                        onClick={() => setBusinessVisibility({ ...businessVisibility, [key]: !value })}
                                        className="h-6 px-2"
                                    >
                                        {value ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                                        <span className="text-xs">{value ? 'Visible' : 'Hidden'}</span>
                                    </Button>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    {}
                    {Object.values(businessVisibility).some(v => v) && (
                        <Card>
                            <CardHeader className="p-3 pb-2">
                                <CardTitle className="text-sm">Business Metrics</CardTitle>
                                <Badge variant="secondary" className="text-xs">Visible to Business Accounts</Badge>
                            </CardHeader>
                            <CardContent className="p-3 pt-0 space-y-2">
                                {businessVisibility.followerCount && (
                                    <div className="p-2 rounded-lg border bg-card">
                                        <p className="text-xs text-muted-foreground">Follower Count</p>
                                        <p className="text-lg font-bold">{businessMetrics.followerCount.value}</p>
                                        <p className="text-xs text-green-600">{businessMetrics.followerCount.growth}</p>
                                    </div>
                                )}
                                {businessVisibility.engagementRate && (
                                    <div className="p-2 rounded-lg border bg-card">
                                        <p className="text-xs text-muted-foreground">Engagement Rate</p>
                                        <p className="text-lg font-bold">{businessMetrics.engagementRate.value}</p>
                                        <p className="text-xs text-green-600">{businessMetrics.engagementRate.growth}</p>
                                    </div>
                                )}
                                {businessVisibility.customerChurn && (
                                    <div className="p-2 rounded-lg border bg-card">
                                        <p className="text-xs text-muted-foreground">Customer Churn</p>
                                        <p className="text-lg font-bold">{businessMetrics.customerChurn.value}</p>
                                        <p className="text-xs text-green-600">{businessMetrics.customerChurn.growth}</p>
                                    </div>
                                )}
                                {businessVisibility.sentimentAnalysis && (
                                    <div className="p-2 rounded-lg border bg-card">
                                        <p className="text-xs text-muted-foreground mb-1">Sentiment Analysis</p>
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between text-xs">
                                                <span>Positive</span>
                                                <span className="font-semibold text-green-600">{businessMetrics.sentimentAnalysis.positive}%</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span>Negative</span>
                                                <span className="font-semibold text-red-600">{businessMetrics.sentimentAnalysis.negative}%</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {businessVisibility.bestFormat && (
                                    <div className="p-2 rounded-lg border bg-card">
                                        <p className="text-xs text-muted-foreground">Best Format</p>
                                        <p className="text-sm font-bold">{businessMetrics.bestFormat.name}</p>
                                        <p className="text-xs text-green-600">{businessMetrics.bestFormat.performance} engagement</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {}
                    <Card>
                        <CardHeader className="p-3 pb-2">
                            <CardTitle className="text-sm flex items-center gap-2">
                                <DollarSign className="h-4 w-4 text-green-500" />
                                Revenue by Platform
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0 space-y-2">
                            {revenueData.map((item) => {
                                const Icon = item.icon
                                return (
                                    <div key={item.platform} className="p-2 rounded-lg border bg-card">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <Icon className={`h-4 w-4 ${item.color}`} />
                                                <span className="text-xs font-semibold">{item.platform}</span>
                                            </div>
                                            <p className="text-lg font-bold text-green-600">${item.revenue}</p>
                                        </div>
                                        <div className={`flex items-center gap-1 text-xs ${item.growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            <TrendingUp className={`h-3 w-3 ${item.growth < 0 ? 'rotate-180' : ''}`} />
                                            <span>{Math.abs(item.growth)}% this month</span>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className="pt-2 border-t">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-medium">Total Revenue</span>
                                    <span className="text-xl font-bold text-green-600">$8,700</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
