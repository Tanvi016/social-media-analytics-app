import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Briefcase, TrendingUp, DollarSign, Users, Target, Download, FileText, FileSpreadsheet, Plus } from 'lucide-react'
import { mockCampaigns, mockCreators } from '@/data/businessMockData'
import { formatNumber } from '@/lib/utils'
import { InfoTooltip } from './InfoTooltip'
import { CampaignCreator } from './CampaignCreator'
import { exportCampaignToPDF, exportCampaignToCSV, exportCampaignToExcel } from '@/lib/exportUtils'

export const OngoingCampaigns = () => {
    const [campaigns, setCampaigns] = useState(mockCampaigns)
    const [showCampaignCreator, setShowCampaignCreator] = useState(false)

    const activeCampaigns = campaigns.filter(c => c.status === 'Active')
    const totalBudget = campaigns.reduce((sum, c) => sum + c.budget, 0)
    const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0)
    const totalReach = campaigns.reduce((sum, c) => sum + c.metrics.reach, 0)

    const handleExport = (format) => {
        alert(`Exporting analytics report as ${format}...`)
        
    }

    const handleCreateCampaign = (newCampaign) => {
        setCampaigns([...campaigns, newCampaign])
    }

    const getCreatorById = (id) => {
        return mockCreators.find(c => c.id === id)
    }

    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-4 pb-6">
                {}
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
                        <Briefcase className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">Ongoing Campaigns</h1>
                        <p className="text-sm text-muted-foreground">Track and manage your active creator campaigns</p>
                    </div>

                    {}
                    <Button
                        onClick={() => setShowCampaignCreator(true)}
                        className="gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Create Campaign
                    </Button>

                    {}
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleExport('PDF')}
                            className="gap-2"
                        >
                            <FileText className="h-4 w-4" />
                            Export PDF
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleExport('CSV')}
                            className="gap-2"
                        >
                            <FileSpreadsheet className="h-4 w-4" />
                            Export CSV
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleExport('Excel')}
                            className="gap-2"
                        >
                            <Download className="h-4 w-4" />
                            Export Excel
                        </Button>
                    </div>
                </div>

                {}
                <div className="grid grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-muted-foreground">Active Campaigns</p>
                                <Briefcase className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <p className="text-2xl font-bold">{activeCampaigns.length}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-muted-foreground">Total Budget</p>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <p className="text-2xl font-bold text-green-600">${formatNumber(totalBudget)}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-muted-foreground">Total Spent</p>
                                <DollarSign className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <p className="text-2xl font-bold">${formatNumber(totalSpent)}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                                {((totalSpent / totalBudget) * 100).toFixed(1)}% of budget
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm text-muted-foreground">Total Reach</p>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <p className="text-2xl font-bold text-blue-600">{formatNumber(totalReach)}</p>
                        </CardContent>
                    </Card>
                </div>

                {}
                <div className="space-y-4">
                    {campaigns.map((campaign) => {
                        const creator = getCreatorById(campaign.creatorId)
                        const budgetUsed = (campaign.spent / campaign.budget) * 100

                        return (
                            <Card key={campaign.id}>
                                <CardHeader className="p-4 border-b">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-3">
                                            {creator && (
                                                <img
                                                    src={creator.avatar}
                                                    alt={creator.name}
                                                    className="h-12 w-12 rounded-full"
                                                />
                                            )}
                                            <div>
                                                <CardTitle className="text-lg">{campaign.name}</CardTitle>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    with {campaign.creatorName}
                                                </p>
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Badge variant={campaign.status === 'Active' ? 'default' : 'secondary'}>
                                                        {campaign.status}
                                                    </Badge>
                                                    <span className="text-xs text-muted-foreground">
                                                        {campaign.startDate} - {campaign.endDate}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        {}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-sm font-semibold flex items-center gap-2">
                                                    Budget Overview
                                                    <InfoTooltip content="Total budget allocated vs. amount spent on this campaign" />
                                                </h4>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Allocated</span>
                                                    <span className="font-semibold">${formatNumber(campaign.budget)}</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-muted-foreground">Spent</span>
                                                    <span className="font-semibold text-orange-600">
                                                        ${formatNumber(campaign.spent)}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-secondary rounded-full h-2">
                                                    <div
                                                        className="bg-orange-500 h-2 rounded-full transition-all"
                                                        style={{ width: `${budgetUsed}%` }}
                                                    />
                                                </div>
                                                <p className="text-xs text-muted-foreground">
                                                    {budgetUsed.toFixed(1)}% budget used
                                                </p>
                                            </div>
                                        </div>

                                        {}
                                        <div>
                                            <div className="flex items-center justify-between mb-2">
                                                <h4 className="text-sm font-semibold flex items-center gap-2">
                                                    Campaign Performance
                                                    <InfoTooltip content="Key performance indicators for this campaign" />
                                                </h4>
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="p-2 rounded border bg-card">
                                                    <p className="text-xs text-muted-foreground mb-1">Reach</p>
                                                    <p className="font-semibold text-sm">
                                                        {formatNumber(campaign.metrics.reach)}
                                                    </p>
                                                </div>
                                                <div className="p-2 rounded border bg-card">
                                                    <p className="text-xs text-muted-foreground mb-1">Engagement</p>
                                                    <p className="font-semibold text-sm">
                                                        {formatNumber(campaign.metrics.engagement)}
                                                    </p>
                                                </div>
                                                <div className="p-2 rounded border bg-card">
                                                    <p className="text-xs text-muted-foreground mb-1">Conversions</p>
                                                    <p className="font-semibold text-sm text-green-600">
                                                        {formatNumber(campaign.metrics.conversions)}
                                                    </p>
                                                </div>
                                                <div className="p-2 rounded border bg-card">
                                                    <p className="text-xs text-muted-foreground mb-1">ROI</p>
                                                    <p className="font-semibold text-sm text-blue-600">
                                                        {campaign.metrics.roi}x
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {}
                                    <div className="flex gap-2 mt-4 pt-4 border-t">
                                        <Button variant="outline" size="sm">
                                            View Details
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            Message Creator
                                        </Button>
                                        {campaign.status === 'Active' && (
                                            <Button variant="outline" size="sm" className="ml-auto">
                                                End Campaign
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {campaigns.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p>No campaigns found</p>
                        <p className="text-sm mt-1">Start by creating your first campaign</p>
                        <Button
                            onClick={() => setShowCampaignCreator(true)}
                            className="mt-4 gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Create Campaign
                        </Button>
                    </div>
                )}
            </div>

            {}
            {showCampaignCreator && (
                <CampaignCreator
                    onClose={() => setShowCampaignCreator(false)}
                    onCreateCampaign={handleCreateCampaign}
                />
            )}
        </div>
    )
}
