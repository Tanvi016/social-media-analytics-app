import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Building2, Save, Eye, EyeOff, Instagram, Facebook, Youtube, Upload, Info } from 'lucide-react'
import { businessProfile as initialMockProfile } from '@/data/businessMockData'
import { dataService } from '@/lib/dataService'
import { cn } from '@/lib/utils'

export const BusinessProfile = ({ onProfileUpdate }) => {
    const [profile, setProfile] = useState(initialMockProfile)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)
    const [showPreview, setShowPreview] = useState(false)
    const fileInputRef = useRef(null)
    const [logoUrlInput, setLogoUrlInput] = useState('')

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // For demo purposes using 'business-123' or similar
                const data = await dataService.getBusinessProfile('business-123')
                if (data && Object.keys(data).length > 0) {
                    setProfile(data)
                    setLogoUrlInput(data.website || '')
                }
            } catch (error) {
                console.error("Failed to fetch business profile", error)
            } finally {
                setLoading(false)
            }
        }
        fetchProfile()
    }, [])

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto pb-6 text-center">
                <p className="text-muted-foreground animate-pulse mt-10">Loading business profile...</p>
            </div>
        )
    }

    const getLogoUrl = () => {
        if (profile.companyLogo) return profile.companyLogo;
        const seed = profile.companyName || 'Business';
        return `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(seed)}`;
    }

    const handleSave = () => {
        setIsEditing(false)
        if (onProfileUpdate) {
            onProfileUpdate(profile)
        }
    }

    const handleLogoUpload = (e) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfile({ ...profile, companyLogo: reader.result })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleFetchLogo = () => {
        if (!logoUrlInput) return;
        try {
            const domain = logoUrlInput.replace(/^https?:\/\//, '').replace(/\/$/, '').split('/')[0]
            const newLogoUrl = `https://logo.clearbit.com/${domain}`
            setProfile({ ...profile, companyLogo: newLogoUrl })
        } catch (error) {
            console.error('Error fetching logo:', error)
        }
    }

    const handleLogoError = (e) => {
        const fallback = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(profile.companyName || 'Business')}`;
        if (e.target.src !== fallback) {
            e.target.src = fallback;
        }
    }

    const toggleVisibility = (field) => {
        setProfile({
            ...profile,
            visibilitySettings: {
                ...profile.visibilitySettings,
                [field]: !profile.visibilitySettings[field]
            }
        })
    }

    const socialIcons = {
        instagram: Instagram,
        facebook: Facebook,
        youtube: Youtube
    }

    return (
        <div className="max-w-4xl mx-auto pb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg">
                        <Building2 className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Business Profile</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage your company information and visibility settings
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button
                        onClick={() => setShowPreview(!showPreview)}
                        variant="outline"
                        className="gap-2"
                    >
                        <Eye className="h-4 w-4" />
                        {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </Button>
                    <Button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                    >
                        {isEditing ? (
                            <>
                                <Save className="h-4 w-4" />
                                Save Changes
                            </>
                        ) : (
                            'Edit Profile'
                        )}
                    </Button>
                </div>
            </div>

            {/* Creator-Facing Preview Card */}
            {showPreview && (
                <Card className="border-2 border-primary/20 bg-primary/5 mb-6 shadow-sm overflow-hidden">
                    <CardHeader className="bg-primary/10 border-b border-primary/20 p-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-semibold flex items-center gap-2">
                                <Eye className="h-4 w-4" />
                                Creator-Facing Profile Preview
                            </CardTitle>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowPreview(false)}
                                className="h-8 w-8 p-0"
                            >
                                <EyeOff className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="p-6 rounded-xl border bg-card shadow-sm max-w-2xl mx-auto">
                            <div className="flex items-start gap-5">
                                {profile.visibilitySettings.showLogo && (
                                    <img
                                        src={getLogoUrl()}
                                        alt="Company Logo"
                                        className="h-20 w-20 rounded-xl object-contain bg-white p-3 border shadow-sm"
                                        onError={handleLogoError}
                                    />
                                )}
                                <div className="flex-1">
                                    {profile.visibilitySettings.showCompanyName && (
                                        <h3 className="font-bold text-xl tracking-tight">{profile.companyName}</h3>
                                    )}
                                    {profile.visibilitySettings.showDomain && (
                                        <Badge variant="secondary" className="mt-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border-blue-100">
                                            {profile.domain}
                                        </Badge>
                                    )}
                                    {profile.visibilitySettings.showBio && (
                                        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{profile.bio}</p>
                                    )}
                                    {profile.visibilitySettings.showSocials && profile.socialLinks && (
                                        <div className="flex gap-2.5 mt-4">
                                            {Object.entries(profile.socialLinks).map(([platform, url]) => {
                                                if (!url) return null;
                                                const Icon = socialIcons[platform.toLowerCase()];
                                                return (
                                                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                                                        className="p-2.5 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-all">
                                                        {Icon && <Icon className="h-4 w-4" />}
                                                    </a>
                                                )
                                            })}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 justify-center mt-4 text-xs text-muted-foreground italic">
                            <Info className="h-3 w-3" />
                            This is how creators will see your brand on their dashboard
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-6">
                {/* Logo Section */}
                <Card className="shadow-sm">
                    <CardHeader className="p-4 border-b border-border/50">
                        <CardTitle className="text-base flex items-center justify-between">
                            Company Identity
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleVisibility('showLogo')}
                                className={cn("gap-2 h-8", profile.visibilitySettings.showLogo ? "text-blue-600" : "text-muted-foreground")}
                            >
                                {profile.visibilitySettings.showLogo ? (
                                    <>
                                        <Eye className="h-4 w-4" />
                                        Visible
                                    </>
                                ) : (
                                    <>
                                        <EyeOff className="h-4 w-4" />
                                        Hidden
                                    </>
                                )}
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="relative group">
                                <div className="h-40 w-40 rounded-2xl border-2 border-dashed border-muted-foreground/20 flex items-center justify-center bg-muted/30 overflow-hidden relative">
                                    <img
                                        src={getLogoUrl()}
                                        alt="Company Logo"
                                        className="h-full w-full object-contain p-6"
                                        onError={handleLogoError}
                                    />
                                    {isEditing && (
                                        <div
                                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 cursor-pointer"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Upload className="h-6 w-6 text-white" />
                                            <span className="text-[10px] text-white font-medium uppercase tracking-wider">Change Logo</span>
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleLogoUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                            </div>

                            <div className="flex-1 space-y-5 w-full">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold tracking-tight">Website URL</label>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="https://yourcompany.com"
                                            value={logoUrlInput}
                                            onChange={(e) => setLogoUrlInput(e.target.value)}
                                            disabled={!isEditing}
                                            className="bg-muted/30"
                                        />
                                        <Button
                                            onClick={handleFetchLogo}
                                            disabled={!isEditing || !logoUrlInput}
                                            variant="secondary"
                                            className="whitespace-nowrap h-10 px-4"
                                        >
                                            Fetch Logo
                                        </Button>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground italic pl-1">
                                        We'll try to find your official logo based on your website domain
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Info and Visibility Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="shadow-sm">
                        <CardHeader className="p-4 border-b border-border/50">
                            <CardTitle className="text-base">Company Details</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 space-y-5">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium">Business Name</label>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleVisibility('showCompanyName')}
                                        className={cn("h-6 w-6 p-0", profile.visibilitySettings.showCompanyName ? "text-blue-600" : "text-muted-foreground")}
                                    >
                                        {profile.visibilitySettings.showCompanyName ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                    </Button>
                                </div>
                                <Input
                                    value={profile.companyName}
                                    onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                                    disabled={!isEditing}
                                    className="bg-muted/20"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium">Industry</label>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleVisibility('showDomain')}
                                        className={cn("h-6 w-6 p-0", profile.visibilitySettings.showDomain ? "text-blue-600" : "text-muted-foreground")}
                                    >
                                        {profile.visibilitySettings.showDomain ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                    </Button>
                                </div>
                                <Select
                                    value={profile.domain || ''}
                                    onValueChange={(value) => setProfile({ ...profile, domain: value })}
                                    disabled={!isEditing}
                                >
                                    <SelectTrigger className="bg-muted/20">
                                        <SelectValue placeholder="Select industry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {['Technology & Software', 'Fashion & Apparel', 'Health & Wellness', 'Travel & Tourism', 'Education & E-learning'].map(item => (
                                            <SelectItem key={item} value={item}>{item}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium">Company Bio</label>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleVisibility('showBio')}
                                        className={cn("h-6 w-6 p-0", profile.visibilitySettings.showBio ? "text-blue-600" : "text-muted-foreground")}
                                    >
                                        {profile.visibilitySettings.showBio ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                    </Button>
                                </div>
                                <Textarea
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                    disabled={!isEditing}
                                    rows={4}
                                    className="bg-muted/20 resize-none"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-sm">
                        <CardHeader className="p-4 border-b border-border/50">
                            <CardTitle className="text-base">Contacts & Socials</CardTitle>
                        </CardHeader>
                        <CardContent className="p-5 space-y-5">
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Account Manager</label>
                                        <Input
                                            value={profile.displayName}
                                            onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="Full Name"
                                            className="bg-muted/20 h-9 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Designation</label>
                                        <Input
                                            value={profile.accountOwnerRole}
                                            onChange={(e) => setProfile({ ...profile, accountOwnerRole: e.target.value })}
                                            disabled={!isEditing}
                                            placeholder="e.g. CMO"
                                            className="bg-muted/20 h-9 text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-semibold uppercase text-muted-foreground mb-1 block">Public Email</label>
                                    <Input
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        disabled={!isEditing}
                                        className="bg-muted/20 h-9 text-sm"
                                    />
                                </div>
                            </div>

                            <hr className="border-border/50" />

                            <div className="space-y-3">
                                <div className="flex items-center justify-between mb-1">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Social Links</label>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleVisibility('showSocials')}
                                        className={cn("h-6 w-6 p-0", profile.visibilitySettings.showSocials ? "text-blue-600" : "text-muted-foreground")}
                                    >
                                        {profile.visibilitySettings.showSocials ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                    </Button>
                                </div>

                                {Object.entries(socialIcons).map(([platform, Icon]) => (
                                    <div key={platform} className="flex items-center gap-3">
                                        <div className={cn(
                                            "flex items-center justify-center w-8 h-8 rounded-md text-white shadow-sm",
                                            platform === 'instagram' ? "bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600" :
                                                platform === 'youtube' ? "bg-red-600" : "bg-blue-600"
                                        )}>
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <Input
                                            value={profile.socialLinks?.[platform] || ''}
                                            onChange={(e) => setProfile({
                                                ...profile,
                                                socialLinks: { ...profile.socialLinks, [platform]: e.target.value }
                                            })}
                                            disabled={!isEditing}
                                            placeholder={`https://${platform}.com/company`}
                                            className="bg-muted/20 h-8 text-xs"
                                        />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
