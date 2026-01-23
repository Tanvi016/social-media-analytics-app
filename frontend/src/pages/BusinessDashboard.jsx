import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { LogOut, User } from 'lucide-react'
import { BusinessSidebar } from '../components/business/BusinessSidebar'
import { ThemeToggle } from '../components/ThemeToggle'
import { NotificationBell } from '../components/NotificationBell'
import { CreatorSearch } from '../components/business/CreatorSearch'
import { CommunicationCenter } from '../components/business/CommunicationCenter'
import { OngoingCampaigns } from '../components/business/OngoingCampaigns'
import { BusinessProfile } from '../components/business/BusinessProfile'
import { BusinessAnalytics } from '../components/business/BusinessAnalytics'
import { BudgetManager } from '../components/business/BudgetManager'
import { ContactCreatorModal } from '../components/business/ContactCreatorModal'
import { Button } from '../components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { TrendingUp, Users, DollarSign, Briefcase } from 'lucide-react'
import { mockCampaigns, mockCreators } from '../data/businessMockData'
import { formatNumber } from '../lib/utils'

export const BusinessDashboard = () => {
    const { username } = useParams()
    const [activeTab, setActiveTab] = useState('dashboard')
    const [selectedCreator, setSelectedCreator] = useState(null)

    const businessInfo = {
        name: username || 'Your Business',
        email: 'business@company.com'
    }

    const handleLogout = () => {
        alert('Logout functionality - would redirect to login page')
    }

    const getPageTitle = () => {
        switch (activeTab) {
            case 'dashboard':
                return 'Business Dashboard'
            case 'connect':
                return 'Creator Search & Match'
            case 'campaigns':
                return 'Ongoing Campaigns'
            case 'messages':
                return 'Messages & Communication'
            case 'analytics':
                return 'Analytics & Insights'
            case 'profile':
                return 'Profile Settings'
            default:
                return 'Dashboard'
        }
    }

    const handleContactCreator = (creator) => {
        setSelectedCreator(creator)
    }

    const handleCloseModal = (success) => {
        setSelectedCreator(null)
        if (success) {
            setActiveTab('messages')
        }
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <DashboardOverview setActiveTab={setActiveTab} />

            case 'connect':
                return <CreatorSearch onContactCreator={handleContactCreator} />

            case 'campaigns':
                return <OngoingCampaigns />

            case 'messages':
                return <CommunicationCenter />

            case 'analytics':
                return <BusinessAnalytics />

            case 'profile':
                return <BusinessProfile />

            default:
                return <div>Page not found</div>
        }
    }

    return (
        <div className="flex h-screen bg-background">
            { }
            <BusinessSidebar activeTab={activeTab} onTabChange={setActiveTab} />

            { }
            <div className="flex-1 flex flex-col overflow-hidden">
                { }
                <header className="border-b bg-card px-6 py-3 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">{getPageTitle()}</h1>
                        <p className="text-xs text-muted-foreground">Welcome back, {username}!</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <NotificationBell />
                        <ThemeToggle />

                        { }
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="rounded-full">
                                    <User className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setActiveTab('profile')}>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                { }
                <main className="flex-1 overflow-y-auto p-6">
                    {renderContent()}
                </main>
            </div>

            {selectedCreator && (
                <ContactCreatorModal
                    creator={selectedCreator}
                    businessInfo={businessInfo}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    )
}


const DashboardOverview = ({ setActiveTab }) => {
    const activeCampaigns = mockCampaigns.filter(c => c.status === 'Active')
    const totalCreators = mockCreators.length
    const unlockedCreators = mockCreators.filter(c => c.isUnlocked).length
    const totalBudget = mockCampaigns.reduce((sum, c) => sum + c.budget, 0)
    const totalReach = mockCampaigns.reduce((sum, c) => sum + c.metrics.reach, 0)

    return (
        <div className="space-y-6">
            <div className="max-w-[1600px] mx-auto pb-6">
                { }
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-2">Welcome to Your Business Hub</h2>
                    <p className="text-muted-foreground">
                        Manage your creator partnerships, track campaigns, and grow your brand presence.
                    </p>
                </div>

                <Card className="border-l-4 border-green-500 bg-green-50 dark:bg-slate-800 mb-6">
                    <CardContent className="p-3 text-sm">
                        <strong>Key Insight:</strong>{' '}
                        Active campaigns are generating strong ROI, with reach scaling efficiently across current creator partnerships.
                    </CardContent>
                </Card>

                <div className="grid grid-cols-[1fr_380px] gap-6">
                    { }
                    <div className="space-y-6">
                        { }
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <Button
                                        className="h-auto py-4 flex-col gap-2"
                                        variant="outline"
                                        onClick={() => setActiveTab('connect')}
                                    >
                                        <Users className="h-6 w-6" />
                                        <span>Find Creators</span>
                                    </Button>
                                    <Button
                                        className="h-auto py-4 flex-col gap-2"
                                        variant="outline"
                                        onClick={() => setActiveTab('campaigns')}
                                    >
                                        <Briefcase className="h-6 w-6" />
                                        <span>View Campaigns</span>
                                    </Button>
                                    <Button
                                        className="h-auto py-4 flex-col gap-2"
                                        variant="outline"
                                        onClick={() => setActiveTab('analytics')}
                                    >
                                        <TrendingUp className="h-6 w-6" />
                                        <span>View Analytics</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        { }
                        <div className="grid grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm text-muted-foreground">Active Campaigns</p>
                                        <Briefcase className="h-4 w-4 text-orange-500" />
                                    </div>
                                    <p className="text-3xl font-bold">{activeCampaigns.length}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {mockCampaigns.length} total campaigns
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm text-muted-foreground">Total Creators</p>
                                        <Users className="h-4 w-4 text-blue-500" />
                                    </div>
                                    <p className="text-3xl font-bold">{totalCreators}</p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {unlockedCreators} with unlocked analytics
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm text-muted-foreground">Total Budget</p>
                                        <DollarSign className="h-4 w-4 text-green-500" />
                                    </div>
                                    <p className="text-3xl font-bold text-green-600">
                                        ${formatNumber(totalBudget)}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Across all campaigns
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm text-muted-foreground">Total Reach</p>
                                        <TrendingUp className="h-4 w-4 text-purple-500" />
                                    </div>
                                    <p className="text-3xl font-bold text-purple-600">
                                        {formatNumber(totalReach)}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Combined audience reach
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        { }
                        <BudgetManager />
                    </div>

                    { }
                    <div className="space-y-4">
                        <Card className="sticky top-0">
                            <CardHeader className="p-4 border-b">
                                <CardTitle className="text-base">Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    {activeCampaigns.slice(0, 5).map(campaign => (
                                        <div key={campaign.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-accent transition-colors cursor-pointer">
                                            <div className="p-2 rounded-full bg-primary/10">
                                                <Briefcase className="h-4 w-4 text-primary" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">{campaign.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    with {campaign.creatorName}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <div className="text-xs">
                                                        <span className="text-muted-foreground">Reach: </span>
                                                        <span className="font-semibold text-purple-600">
                                                            {formatNumber(campaign.metrics.reach)}
                                                        </span>
                                                    </div>
                                                    <div className="text-xs">
                                                        <span className="text-muted-foreground">ROI: </span>
                                                        <span className="font-semibold text-green-600">
                                                            {campaign.metrics.roi}x
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {activeCampaigns.length === 0 && (
                                        <div className="text-center py-8 text-muted-foreground">
                                            <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                            <p className="text-sm">No recent activity</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
