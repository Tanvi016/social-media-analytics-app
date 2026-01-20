import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Download, LogOut, User, Lightbulb, FileText, FileSpreadsheet, Mail } from 'lucide-react'
import { Sidebar } from '../components/Sidebar'
import { ThemeToggle } from '../components/ThemeToggle'
import { NotificationBell } from '../components/NotificationBell'
import { PlatformFilter, ContentTypeFilter } from '../components/Filters'
import { ProfilePage } from '../components/ProfilePage'
import { AIChatInterface } from '../components/AIChatInterface'
import { RecommendationsPage } from '../components/RecommendationsPage'
import { OverviewAnalytics } from '../components/panels/OverviewAnalytics'
import { ContentPerformance } from '../components/panels/ContentPerformance'
import { PostingTimeIntelligence } from '../components/panels/PostingTimeIntelligence'
import { AudienceBehavior } from '../components/panels/AudienceBehavior'
import { RevenueMetrics } from '../components/panels/RevenueMetrics'
import { PlatformComparison } from '../components/panels/PlatformComparison'
import { PostingHeatmap } from '../components/panels/PostingHeatmap'
import { AudienceInsights } from '../components/panels/AudienceInsights'
import { AIChatBubble } from '../components/AIChatBubble'
import { CreatorInbox } from '../components/creator/CreatorInbox'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { mockEmails, getUnreadEmailCount } from '../data/mockEmails'
import { exportCreatorDashboardToPDF, exportCreatorMetricsToCSV, exportCreatorDataToExcel } from '../lib/creatorExportUtils'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'

export const CreatorDashboard = () => {
    const { username } = useParams()
    const [activeTab, setActiveTab] = useState('analytics')
    const [selectedPlatform, setSelectedPlatform] = useState('all')
    const [selectedContentType, setSelectedContentType] = useState('all')
    const [emails, setEmails] = useState(mockEmails)

    const unreadCount = getUnreadEmailCount(emails)

    const handleUpdateEmail = (emailId, updates) => {
        setEmails(emails.map(email =>
            email.id === emailId ? { ...email, ...updates } : email
        ))
    }

    const handleExportPDF = async (event) => {
        try {
            console.log('Starting PDF export...')

            
            const button = event?.currentTarget
            if (button) {
                button.disabled = true
                button.textContent = 'Generating...'
            }

            
            const creatorData = {
                name: username,
                totalFollowers: 125000,
                projectsCompleted: 12,
                avgEngagement: 8.5,
                metrics: {
                    totalReach: 2500000,
                    engagementRate: 8.5,
                    contentPosted: 45,
                    avgViews: 55000
                },
                platforms: {
                    Instagram: { followers: 75000, engagement: 9.2, posts: 28 },
                    YouTube: { followers: 40000, engagement: 7.8, posts: 12 },
                    TikTok: { followers: 10000, engagement: 8.1, posts: 5 }
                },
                revenue: {
                    thisMonth: 8500,
                    lastMonth: 7200,
                    yearlyTotal: 95000,
                    monthlyProjects: 3,
                    lastMonthProjects: 2,
                    yearlyProjects: 12
                }
            }

            console.log('Creator data:', creatorData)

            
            const chartIds = [
                'overview-analytics-chart',
                'content-performance-chart',
                'platform-comparison-chart',
                'posting-time-chart',
                'audience-behavior-chart',
                'audience-insights-chart'
            ]

            console.log('Chart IDs to capture:', chartIds)

            
            await new Promise(resolve => setTimeout(resolve, 500))

            await exportCreatorDashboardToPDF(creatorData, chartIds)

            console.log('PDF export completed successfully')

            
            if (button) {
                button.disabled = false
                button.textContent = 'PDF'
            }
        } catch (error) {
            console.error('PDF export failed:', error)
            alert(`PDF export failed: ${error.message}. Check console for details.`)
            
            const button = event?.currentTarget
            if (button) {
                button.disabled = false
                button.textContent = 'PDF'
            }
        }
    }

    const handleExportCSV = () => {
        const creatorData = {
            name: username,
            totalFollowers: 125000,
            projectsCompleted: 12,
            avgEngagement: 8.5,
            metrics: {
                totalReach: 2500000,
                engagementRate: 8.5,
                contentPosted: 45,
                avgViews: 55000
            },
            platforms: {
                Instagram: { followers: 75000, engagement: 9.2, posts: 28 },
                YouTube: { followers: 40000, engagement: 7.8, posts: 12 },
                TikTok: { followers: 10000, engagement: 8.1, posts: 5 }
            }
        }
        exportCreatorMetricsToCSV(creatorData)
    }

    const handleExportExcel = () => {
        const creatorData = {
            name: username,
            totalFollowers: 125000,
            projectsCompleted: 12,
            avgEngagement: 8.5,
            metrics: {
                totalReach: 2500000,
                engagementRate: 8.5,
                contentPosted: 45,
                avgViews: 55000
            },
            platforms: {
                Instagram: { followers: 75000, engagement: 9.2, posts: 28 },
                YouTube: { followers: 40000, engagement: 7.8, posts: 12 },
                TikTok: { followers: 10000, engagement: 8.1, posts: 5 }
            },
            revenue: {
                thisMonth: 8500,
                lastMonth: 7200,
                yearlyTotal: 95000,
                monthlyProjects: 3,
                lastMonthProjects: 2,
                yearlyProjects: 12
            }
        }
        exportCreatorDataToExcel(creatorData)
    }

    const handleLogout = () => {
        alert('Logout functionality - would redirect to login page')
    }

    const getPageTitle = () => {
        switch (activeTab) {
            case 'analytics':
                return 'Analytics Dashboard'
            case 'recommendations':
                return 'Recommendations & Insights'
            case 'chat':
                return 'AI Assistant'
            case 'inbox':
                return 'Collaboration Inbox'
            case 'profile':
                return 'Profile Settings'
            default:
                return 'Dashboard'
        }
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'analytics':
                return (
                    <div className="space-y-3">
                        {}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <PlatformFilter
                                    selectedPlatform={selectedPlatform}
                                    onPlatformChange={setSelectedPlatform}
                                />
                                <ContentTypeFilter
                                    selectedType={selectedContentType}
                                    onTypeChange={setSelectedContentType}
                                />
                            </div>

                            {}
                            <Button
                                onClick={() => setActiveTab('recommendations')}
                                className="bg-yellow-500 hover:bg-yellow-600 text-black gap-2"
                                size="sm"
                            >
                                <Lightbulb className="h-4 w-4" />
                                Recommendation
                            </Button>
                        </div>

                        {}
                        <div className="grid grid-cols-3 gap-4" style={{ height: 'calc(100vh - 200px)' }}>
                            {}
                            <div className="space-y-4 overflow-y-auto pr-2">
                                <div id="overview-analytics-chart" className="bg-white dark:bg-slate-900 p-4 rounded-lg">
                                    <OverviewAnalytics
                                        platformFilter={selectedPlatform}
                                        contentTypeFilter={selectedContentType}
                                    />
                                </div>
                                <div id="platform-comparison-chart" className="bg-white dark:bg-slate-900 p-4 rounded-lg">
                                    <PlatformComparison />
                                </div>
                            </div>

                            {}
                            <div className="space-y-4 overflow-y-auto pr-2">
                                <div id="content-performance-chart" className="bg-white dark:bg-slate-900 p-4 rounded-lg">
                                    <ContentPerformance
                                        platformFilter={selectedPlatform}
                                        contentTypeFilter={selectedContentType}
                                    />
                                </div>
                                <div id="posting-time-chart" className="bg-white dark:bg-slate-900 p-4 rounded-lg">
                                    <PostingTimeIntelligence
                                        platformFilter={selectedPlatform}
                                    />
                                </div>
                                <div id="posting-heatmap-chart" className="bg-white dark:bg-slate-900 p-4 rounded-lg">
                                    <PostingHeatmap />
                                </div>
                            </div>

                            {}
                            <div className="space-y-4 overflow-y-auto pr-2">
                                <div id="audience-behavior-chart" className="bg-white dark:bg-slate-900 p-4 rounded-lg">
                                    <AudienceBehavior
                                        platformFilter={selectedPlatform}
                                    />
                                </div>
                                <div id="audience-insights-chart" className="bg-white dark:bg-slate-900 p-4 rounded-lg">
                                    <AudienceInsights />
                                </div>
                            </div>
                        </div>
                    </div>
                )

            case 'recommendations':
                return (
                    <div className="h-full flex flex-col gap-3">
                        {}
                        <div className="flex items-center gap-2">
                            <PlatformFilter
                                selectedPlatform={selectedPlatform}
                                onPlatformChange={setSelectedPlatform}
                            />
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <RecommendationsPage platformFilter={selectedPlatform} />
                        </div>
                    </div>
                )

            case 'chat':
                return <AIChatInterface />

            case 'inbox':
                return <CreatorInbox emails={emails} onUpdateEmail={handleUpdateEmail} />

            case 'profile':
                return <ProfilePage />

            default:
                return <div>Page not found</div>
        }
    }

    return (
        <div className="flex h-screen bg-background">
            {}
            <Sidebar activeTab={activeTab} onTabChange={setActiveTab} unreadCount={unreadCount} />

            {}
            <div className="flex-1 flex flex-col overflow-hidden">
                {}
                <header className="border-b bg-card px-6 py-3 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold">{getPageTitle()}</h1>
                        <p className="text-xs text-muted-foreground">Welcome back, {username}!</p>
                    </div>

                    <div className="flex items-center gap-3">
                        {}
                        {activeTab === 'analytics' && (
                            <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={handleExportPDF} className="gap-2">
                                    <FileText className="h-4 w-4" />
                                    PDF
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-2">
                                    <FileSpreadsheet className="h-4 w-4" />
                                    CSV
                                </Button>
                                <Button variant="outline" size="sm" onClick={handleExportExcel} className="gap-2">
                                    <Download className="h-4 w-4" />
                                    Excel
                                </Button>
                            </div>
                        )}

                        <NotificationBell />
                        <ThemeToggle />

                        {}
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

                {}
                <main className="flex-1 overflow-hidden p-6">
                    {renderContent()}
                </main>
            </div>

            {}
            {activeTab !== 'chat' && <AIChatBubble />}
        </div>
    )
}
