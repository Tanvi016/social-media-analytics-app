import React, { useState, useEffect } from 'react'
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

import { useParams } from 'react-router-dom'
import { userProfiles, getFallbackProfile } from '@/data/userMockData'
import { dataService } from '@/lib/dataService'

export const ProfilePage = () => {
    const { username } = useParams()
    const profile = userProfiles[username] || getFallbackProfile(username)

    const [isEditing, setIsEditing] = useState(false)
    const initialAccounts = Object.entries(profile.platforms).map(([platform, data]) => {
        const pData = [
            { platform: 'instagram', icon: Instagram, color: 'text-pink-500' },
            { platform: 'youtube', icon: Youtube, color: 'text-red-500' },
            { platform: 'facebook', icon: FacebookIcon, color: 'text-blue-500' },
            { platform: 'tiktok', icon: Sparkles, color: 'text-purple-500' },
            { platform: 'twitter', icon: Sparkles, color: 'text-blue-400' },
            { platform: 'linkedin', icon: Sparkles, color: 'text-blue-700' },
        ].find(p => p.platform === platform) || { platform, icon: Sparkles, color: 'text-gray-500' }

        return {
            platform,
            username: `@${username}_${platform}`,
            url: `https://${platform}.com/${username}`,
            icon: pData.icon,
            color: pData.color
        }
    })

    const [connectedAccounts, setConnectedAccounts] = useState(initialAccounts)
    const [profileImage, setProfileImage] = useState(null)
    const [metrics, setMetrics] = useState(null)
    const [loadingMetrics, setLoadingMetrics] = useState(true)

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const data = await dataService.getProfileMetrics(profile.id, username)
                setMetrics(data)
            } catch (error) {
                console.error("Failed to fetch profile metrics", error)
            } finally {
                setLoadingMetrics(false)
            }
        }
        fetchMetrics()
    }, [profile.id, username])

    const businessVisibilityMetrics = metrics || {
        follower_count: { value: '0', growth: '0%' },
        engagement_rate: { value: '0%', growth: '0%' },
        audience_retention: { value: '0%', growth: '0%' },
        audience_sentiment: { positive: 0, negative: 0, neutral: 0 },
        best_format: { name: 'N/A', performance: '0%' },
    }

    const [businessVisibility, setBusinessVisibility] = useState({
        followerCount: false,
        engagementRate: false,
        audienceRetention: false,
        audienceSentiment: false,
        bestFormat: false,
    })
    const [aiCategories, setAiCategories] = useState(profile.niche)
    const [isFetchingThemes, setIsFetchingThemes] = useState(false)

    const availablePlatforms = [
        { platform: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-500' },
        { platform: 'youtube', name: 'YouTube', icon: Youtube, color: 'text-red-500' },
        { platform: 'facebook', name: 'Facebook', icon: FacebookIcon, color: 'text-blue-500' },
    ]

    const handleAddAccount = (platform) => {
        setIsFetchingThemes(true)
        const platformData = availablePlatforms.find(p => p.platform === platform)
        const newAccount = {
            platform,
            username: `@johndoe_${platform}`,
            url: `https://${platform}.com/johndoe`,
            icon: platformData.icon,
            color: platformData.color,
        }

        // Simulate AI Content Detection
        setTimeout(() => {
            setConnectedAccounts([...connectedAccounts, newAccount])
            setIsFetchingThemes(false)
        }, 2000)
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

    const businessMetrics = {
        followerCount: businessVisibilityMetrics.follower_count,
        engagementRate: businessVisibilityMetrics.engagement_rate,
        audienceRetention: businessVisibilityMetrics.audience_retention,
        audienceSentiment: businessVisibilityMetrics.audience_sentiment,
        bestFormat: businessVisibilityMetrics.best_format,
    }

    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileImage(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-4">
                { }
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative group">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-3xl font-bold overflow-hidden border-2 border-primary/20">
                                        {profileImage ? (
                                            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            profile.name.split(' ').map(n => n[0]).join('')
                                        )}
                                    </div>
                                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                                        <Plus className="h-6 w-6" />
                                        <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                                    </label>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
                                    <p className="text-sm text-muted-foreground mb-2">{profile.bio}</p>

                                    { }
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
                    { }
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

                    { }
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

                    { }
                    <Card>
                        <CardHeader className="p-3 pb-2">
                            <CardTitle className="text-sm flex items-center gap-2">
                                <Sparkles className="h-4 w-4 text-purple-500" />
                                AI Content Categorization
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-3 pt-0">
                            {isFetchingThemes ? (
                                <div className="flex flex-col items-center py-4 space-y-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                                    <p className="text-xs text-muted-foreground">Fetching content themes from social links...</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Primary Niche</p>
                                        <Badge variant="default" className="bg-primary/20 text-primary border-primary/20 hover:bg-primary/30">
                                            {aiCategories.primary}
                                        </Badge>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Secondary Tags</p>
                                        <div className="flex flex-wrap gap-2">
                                            {aiCategories.secondary.map((tag, i) => (
                                                <Badge key={i} variant="secondary" className="text-[10px]">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            <Button variant="ghost" className="h-5 px-1 text-[10px] flex items-center gap-1">
                                                <Plus className="h-3 w-3" />
                                                Add Tag
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-[10px] text-muted-foreground italic">
                                        * AI auto-detected based on your captions and hashtags
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    { }
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
                                {businessVisibility.audienceRetention && (
                                    <div className="p-2 rounded-lg border bg-card">
                                        <p className="text-xs text-muted-foreground">Audience Retention</p>
                                        <p className="text-lg font-bold">{businessMetrics.audienceRetention.value}</p>
                                        <p className="text-xs text-green-600">{businessMetrics.audienceRetention.growth}</p>
                                    </div>
                                )}
                                {businessVisibility.audienceSentiment && (
                                    <div className="p-2 rounded-lg border bg-card">
                                        <p className="text-xs text-muted-foreground mb-1">Audience Sentiment</p>
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between text-xs">
                                                <span>Positive</span>
                                                <span className="font-semibold text-green-600">{businessMetrics.audienceSentiment.positive}%</span>
                                            </div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span>Negative</span>
                                                <span className="font-semibold text-red-600">{businessMetrics.audienceSentiment.negative}%</span>
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

                    { }
                </div>
            </div>
        </div>
    )
}
