import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Building2, Save, Eye, EyeOff, Image as ImageIcon } from 'lucide-react'
import { businessProfile as initialProfile } from '@/data/businessMockData'
import { cn } from '@/lib/utils'

export const BusinessProfile = ({ onProfileUpdate }) => {
    const [profile, setProfile] = useState(initialProfile)
    const [isEditing, setIsEditing] = useState(false)
    const [logoUrl, setLogoUrl] = useState(profile.companyUrl)

    const handleSave = () => {
        setIsEditing(false)
        if (onProfileUpdate) {
            onProfileUpdate(profile)
        }
    }

    const handleFetchLogo = () => {
        
        const newLogoUrl = `https://logo.clearbit.com/${logoUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}`
        setProfile({ ...profile, companyLogo: newLogoUrl })
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

    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-4xl mx-auto space-y-6 pb-6">
                {}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                            <Building2 className="h-6 w-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Business Profile</h1>
                            <p className="text-sm text-muted-foreground">
                                Manage your company information and visibility settings
                            </p>
                        </div>
                    </div>
                    <Button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className="gap-2"
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

                {}
                <Card>
                    <CardHeader className="p-4">
                        <CardTitle className="text-base flex items-center justify-between">
                            Company Logo
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleVisibility('showLogo')}
                                className="gap-2"
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
                    <CardContent className="p-4 pt-0">
                        <div className="flex items-center gap-4">
                            <div className="h-20 w-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center bg-muted">
                                {profile.companyLogo ? (
                                    <img
                                        src={profile.companyLogo}
                                        alt="Company Logo"
                                        className="h-full w-full object-contain rounded-lg"
                                        onError={(e) => {
                                            e.target.style.display = 'none'
                                            e.target.parentElement.innerHTML = '<div class="text-muted-foreground"><svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg></div>'
                                        }}
                                    />
                                ) : (
                                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                                )}
                            </div>
                            <div className="flex-1 space-y-2">
                                <label className="text-sm font-medium">Company Website URL</label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="https://yourcompany.com"
                                        value={logoUrl}
                                        onChange={(e) => setLogoUrl(e.target.value)}
                                        disabled={!isEditing}
                                    />
                                    <Button
                                        onClick={handleFetchLogo}
                                        disabled={!isEditing || !logoUrl}
                                        variant="outline"
                                    >
                                        Fetch Logo
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Enter your website URL to automatically fetch your company logo
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {}
                <Card>
                    <CardHeader className="p-4">
                        <CardTitle className="text-base">Company Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 space-y-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium">Company Name</label>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleVisibility('showCompanyName')}
                                    className="gap-1 h-auto p-1"
                                >
                                    {profile.visibilitySettings.showCompanyName ? (
                                        <Eye className="h-3 w-3" />
                                    ) : (
                                        <EyeOff className="h-3 w-3" />
                                    )}
                                </Button>
                            </div>
                            <Input
                                value={profile.companyName}
                                onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium">Industry/Domain</label>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleVisibility('showDomain')}
                                    className="gap-1 h-auto p-1"
                                >
                                    {profile.visibilitySettings.showDomain ? (
                                        <Eye className="h-3 w-3" />
                                    ) : (
                                        <EyeOff className="h-3 w-3" />
                                    )}
                                </Button>
                            </div>
                            <Input
                                value={profile.domain}
                                onChange={(e) => setProfile({ ...profile, domain: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium">Company Bio/Description</label>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => toggleVisibility('showBio')}
                                    className="gap-1 h-auto p-1"
                                >
                                    {profile.visibilitySettings.showBio ? (
                                        <Eye className="h-3 w-3" />
                                    ) : (
                                        <EyeOff className="h-3 w-3" />
                                    )}
                                </Button>
                            </div>
                            <Textarea
                                value={profile.bio}
                                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                disabled={!isEditing}
                                rows={3}
                            />
                        </div>
                    </CardContent>
                </Card>

                {}
                <Card>
                    <CardHeader className="p-4">
                        <CardTitle className="text-base flex items-center justify-between">
                            Main Team Leads
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleVisibility('showLeads')}
                                className="gap-2"
                            >
                                {profile.visibilitySettings.showLeads ? (
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
                    <CardContent className="p-4 pt-0 space-y-4">
                        {profile.leads.map((lead, index) => (
                            <Card key={index} className="bg-muted/50">
                                <CardContent className="p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <Badge variant="outline">Lead {index + 1}</Badge>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-xs text-muted-foreground">Name</label>
                                            <Input
                                                value={lead.name}
                                                onChange={(e) => {
                                                    const newLeads = [...profile.leads]
                                                    newLeads[index].name = e.target.value
                                                    setProfile({ ...profile, leads: newLeads })
                                                }}
                                                disabled={!isEditing}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-muted-foreground">Title</label>
                                            <Input
                                                value={lead.title}
                                                onChange={(e) => {
                                                    const newLeads = [...profile.leads]
                                                    newLeads[index].title = e.target.value
                                                    setProfile({ ...profile, leads: newLeads })
                                                }}
                                                disabled={!isEditing}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-muted-foreground">Email</label>
                                            <Input
                                                type="email"
                                                value={lead.email}
                                                onChange={(e) => {
                                                    const newLeads = [...profile.leads]
                                                    newLeads[index].email = e.target.value
                                                    setProfile({ ...profile, leads: newLeads })
                                                }}
                                                disabled={!isEditing}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs text-muted-foreground">Phone</label>
                                            <Input
                                                type="tel"
                                                value={lead.phone}
                                                onChange={(e) => {
                                                    const newLeads = [...profile.leads]
                                                    newLeads[index].phone = e.target.value
                                                    setProfile({ ...profile, leads: newLeads })
                                                }}
                                                disabled={!isEditing}
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>

                {}
                <Card>
                    <CardHeader className="p-4">
                        <CardTitle className="text-base">Creator-Facing Profile Preview</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="p-4 rounded-lg border bg-muted/30">
                            <div className="flex items-start gap-4">
                                {profile.visibilitySettings.showLogo && profile.companyLogo && (
                                    <img
                                        src={profile.companyLogo}
                                        alt="Company Logo"
                                        className="h-16 w-16 rounded-lg object-contain bg-white p-2"
                                    />
                                )}
                                <div className="flex-1">
                                    {profile.visibilitySettings.showCompanyName && (
                                        <h3 className="font-bold text-lg">{profile.companyName}</h3>
                                    )}
                                    {profile.visibilitySettings.showDomain && (
                                        <Badge variant="secondary" className="mt-1">{profile.domain}</Badge>
                                    )}
                                    {profile.visibilitySettings.showBio && (
                                        <p className="text-sm text-muted-foreground mt-2">{profile.bio}</p>
                                    )}
                                    {profile.visibilitySettings.showLeads && (
                                        <div className="mt-3 space-y-2">
                                            <p className="text-xs font-semibold">Contact Team:</p>
                                            {profile.leads.map((lead, index) => (
                                                <div key={index} className="text-xs">
                                                    <span className="font-medium">{lead.name}</span>
                                                    <span className="text-muted-foreground"> - {lead.title}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            This is how creators will see your profile. Use the eye icons to control visibility.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
