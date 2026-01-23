import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
    X, ChevronRight, ChevronLeft, Check, Target, DollarSign,
    Calendar, Users, Sparkles, TrendingUp
} from 'lucide-react'
import { mockCreators, domains, campaignTemplates, businessProfile } from '@/data/businessMockData'
import { formatNumber } from '@/lib/utils'
import { AdvancedFilters } from './AdvancedFilters'

const STEPS = [
    { id: 1, name: 'Campaign Details', icon: Target },
    { id: 2, name: 'Budget & Goals', icon: DollarSign },
    { id: 3, name: 'Target Criteria', icon: Users },
    { id: 4, name: 'Creator Matching', icon: Sparkles },
    { id: 5, name: 'Review & Launch', icon: Check }
]

export const CampaignCreator = ({ onClose, onCreateCampaign }) => {
    const [currentStep, setCurrentStep] = useState(1)
    const [campaignData, setCampaignData] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        budget: '',
        targetReach: '',
        targetEngagement: '',
        targetConversions: '',
        selectedDomains: [],
        selectedRegions: [],
        selectedTiers: [],
        selectedCreators: []
    })

    const [filters, setFilters] = useState({
        domains: [],
        regions: [],
        tiers: []
    })

    
    const matchedCreators = useMemo(() => {
        return mockCreators.filter(creator => {
            const matchesDomain = campaignData.selectedDomains.length === 0 ||
                creator.domain.some(d => campaignData.selectedDomains.some(sd => d.includes(sd.split(' (')[0])))

            const matchesRegion = campaignData.selectedRegions.length === 0 ||
                campaignData.selectedRegions.includes(creator.region)

            const matchesTier = campaignData.selectedTiers.length === 0 ||
                campaignData.selectedTiers.includes(creator.tier)

            return matchesDomain && matchesRegion && matchesTier
        }).sort((a, b) => {
            
            if (a.isUnlocked && !b.isUnlocked) return -1
            if (!a.isUnlocked && b.isUnlocked) return 1
            if (a.isUnlocked && b.isUnlocked) {
                return b.stats.engagementRate - a.stats.engagementRate
            }
            return b.followers - a.followers
        })
    }, [campaignData.selectedDomains, campaignData.selectedRegions, campaignData.selectedTiers])

    const toggleCreator = (creatorId) => {
        setCampaignData(prev => ({
            ...prev,
            selectedCreators: prev.selectedCreators.includes(creatorId)
                ? prev.selectedCreators.filter(id => id !== creatorId)
                : [...prev.selectedCreators, creatorId]
        }))
    }

    const handleNext = () => {
        if (currentStep < 5) setCurrentStep(currentStep + 1)
    }

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1)
    }

    const handleLaunch = () => {
        const newCampaign = {
            id: Date.now(),
            ...campaignData,
            status: 'Active',
            spent: 0,
            metrics: {
                reach: 0,
                engagement: 0,
                conversions: 0,
                roi: 0
            }
        }
        onCreateCampaign(newCampaign)
        onClose()
    }

    const canProceed = () => {
        switch (currentStep) {
            case 1:
                return campaignData.name && campaignData.description && campaignData.startDate && campaignData.endDate
            case 2:
                return campaignData.budget && campaignData.targetReach
            case 3:
                return campaignData.selectedDomains.length > 0
            case 4:
                return campaignData.selectedCreators.length > 0
            default:
                return true
        }
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <Step1CampaignDetails campaignData={campaignData} setCampaignData={setCampaignData} />
            case 2:
                return <Step2BudgetGoals campaignData={campaignData} setCampaignData={setCampaignData} />
            case 3:
                return <Step3TargetCriteria campaignData={campaignData} setCampaignData={setCampaignData} />
            case 4:
                return <Step4CreatorMatching
                    matchedCreators={matchedCreators}
                    selectedCreators={campaignData.selectedCreators}
                    toggleCreator={toggleCreator}
                />
            case 5:
                return <Step5Review campaignData={campaignData} matchedCreators={matchedCreators} />
            default:
                return null
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <CardHeader className="border-b p-4">
                    <div className="flex items-center justify-between">
                        <CardTitle>Create New Campaign</CardTitle>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {}
                    <div className="flex items-center justify-between mt-4">
                        {STEPS.map((step, index) => {
                            const Icon = step.icon
                            const isActive = currentStep === step.id
                            const isCompleted = currentStep > step.id

                            return (
                                <React.Fragment key={step.id}>
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={`
                                            h-10 w-10 rounded-full flex items-center justify-center transition-colors
                                            ${isCompleted ? 'bg-green-500 text-white' :
                                                isActive ? 'bg-primary text-primary-foreground' :
                                                    'bg-muted text-muted-foreground'}
                                        `}>
                                            {isCompleted ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                                        </div>
                                        <span className={`text-xs ${isActive ? 'font-semibold' : 'text-muted-foreground'}`}>
                                            {step.name}
                                        </span>
                                    </div>
                                    {index < STEPS.length - 1 && (
                                        <div className={`flex-1 h-0.5 mx-2 ${isCompleted ? 'bg-green-500' : 'bg-muted'}`} />
                                    )}
                                </React.Fragment>
                            )
                        })}
                    </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-6">
                    {renderStepContent()}
                </CardContent>

                <div className="border-t p-4 flex items-center justify-between">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className="gap-2"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Back
                    </Button>

                    {currentStep < 5 ? (
                        <Button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className="gap-2"
                        >
                            Next
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            onClick={handleLaunch}
                            disabled={!canProceed()}
                            className="gap-2"
                        >
                            <Check className="h-4 w-4" />
                            Launch Campaign
                        </Button>
                    )}
                </div>
            </Card>
        </div>
    )
}


const Step1CampaignDetails = ({ campaignData, setCampaignData }) => (
    <div className="space-y-4">
        <div>
            <label className="text-sm font-medium mb-2 block">Campaign Name *</label>
            <Input
                placeholder="e.g., Summer Product Launch 2026"
                value={campaignData.name}
                onChange={(e) => setCampaignData({ ...campaignData, name: e.target.value })}
            />
        </div>

        <div>
            <label className="text-sm font-medium mb-2 block">Description *</label>
            <Textarea
                placeholder="Describe your campaign goals, target audience, and key messages..."
                value={campaignData.description}
                onChange={(e) => setCampaignData({ ...campaignData, description: e.target.value })}
                rows={4}
            />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="text-sm font-medium mb-2 block">Start Date *</label>
                <Input
                    type="date"
                    value={campaignData.startDate}
                    onChange={(e) => setCampaignData({ ...campaignData, startDate: e.target.value })}
                />
            </div>
            <div>
                <label className="text-sm font-medium mb-2 block">End Date *</label>
                <Input
                    type="date"
                    value={campaignData.endDate}
                    onChange={(e) => setCampaignData({ ...campaignData, endDate: e.target.value })}
                />
            </div>
        </div>

        {}
        <div>
            <label className="text-sm font-medium mb-2 block">Use Template (Optional)</label>
            <div className="grid grid-cols-2 gap-2">
                {campaignTemplates.map(template => (
                    <Button
                        key={template.id}
                        variant="outline"
                        className="h-auto p-3 flex flex-col items-start"
                        onClick={() => setCampaignData({
                            ...campaignData,
                            budget: template.suggestedBudget.toString(),
                            targetReach: template.targetMetrics.reach.toString(),
                            targetEngagement: template.targetMetrics.engagement.toString(),
                            targetConversions: template.targetMetrics.conversions.toString()
                        })}
                    >
                        <span className="font-semibold">{template.name}</span>
                        <span className="text-xs text-muted-foreground">{template.description}</span>
                    </Button>
                ))}
            </div>
        </div>
    </div>
)

const Step2BudgetGoals = ({ campaignData, setCampaignData }) => (
    <div className="space-y-4">
        <div>
            <label className="text-sm font-medium mb-2 block">Campaign Budget *</label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                    type="number"
                    placeholder="15000"
                    value={campaignData.budget}
                    onChange={(e) => setCampaignData({ ...campaignData, budget: e.target.value })}
                    className="pl-7"
                />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
                Available budget: ${formatNumber(businessProfile.availableBudget)}
            </p>
        </div>

        <div className="grid grid-cols-3 gap-4">
            <div>
                <label className="text-sm font-medium mb-2 block">Target Reach *</label>
                <Input
                    type="number"
                    placeholder="500000"
                    value={campaignData.targetReach}
                    onChange={(e) => setCampaignData({ ...campaignData, targetReach: e.target.value })}
                />
            </div>
            <div>
                <label className="text-sm font-medium mb-2 block">Target Engagement</label>
                <Input
                    type="number"
                    placeholder="25000"
                    value={campaignData.targetEngagement}
                    onChange={(e) => setCampaignData({ ...campaignData, targetEngagement: e.target.value })}
                />
            </div>
            <div>
                <label className="text-sm font-medium mb-2 block">Target Conversions</label>
                <Input
                    type="number"
                    placeholder="1000"
                    value={campaignData.targetConversions}
                    onChange={(e) => setCampaignData({ ...campaignData, targetConversions: e.target.value })}
                />
            </div>
        </div>

        {campaignData.budget && campaignData.targetReach && (
            <Card className="bg-muted/50">
                <CardContent className="p-4">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Projected Metrics
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                            <p className="text-muted-foreground">Cost per Reach</p>
                            <p className="font-semibold">
                                ${(parseFloat(campaignData.budget) / parseFloat(campaignData.targetReach)).toFixed(3)}
                            </p>
                        </div>
                        <div>
                            <p className="text-muted-foreground">Expected ROI</p>
                            <p className="font-semibold text-green-600">3.2x</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        )}
    </div>
)

const Step3TargetCriteria = ({ campaignData, setCampaignData }) => {
    const toggleDomain = (domain) => {
        const newDomains = campaignData.selectedDomains.includes(domain)
            ? campaignData.selectedDomains.filter(d => d !== domain)
            : [...campaignData.selectedDomains, domain]
        setCampaignData({ ...campaignData, selectedDomains: newDomains })
    }

    const toggleRegion = (region) => {
        const newRegions = campaignData.selectedRegions.includes(region)
            ? campaignData.selectedRegions.filter(r => r !== region)
            : [...campaignData.selectedRegions, region]
        setCampaignData({ ...campaignData, selectedRegions: newRegions })
    }

    const toggleTier = (tier) => {
        const newTiers = campaignData.selectedTiers.includes(tier)
            ? campaignData.selectedTiers.filter(t => t !== tier)
            : [...campaignData.selectedTiers, tier]
        setCampaignData({ ...campaignData, selectedTiers: newTiers })
    }

    return (
        <div className="space-y-6">
            <div>
                <label className="text-sm font-medium mb-3 block">Target Domains *</label>
                <div className="grid grid-cols-2 gap-2">
                    {domains.map(domain => {
                        const isSelected = campaignData.selectedDomains.includes(domain)
                        return (
                            <Button
                                key={domain}
                                variant={isSelected ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleDomain(domain)}
                                className="justify-start"
                            >
                                {domain}
                            </Button>
                        )
                    })}
                </div>
            </div>

            <div>
                <label className="text-sm font-medium mb-3 block">Target Regions (Optional)</label>
                <div className="grid grid-cols-3 gap-2">
                    {['North America', 'Europe', 'Asia', 'South America', 'Africa', 'Oceania'].map(region => {
                        const isSelected = campaignData.selectedRegions.includes(region)
                        return (
                            <Button
                                key={region}
                                variant={isSelected ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleRegion(region)}
                            >
                                {region}
                            </Button>
                        )
                    })}
                </div>
            </div>

            <div>
                <label className="text-sm font-medium mb-3 block">Creator Tier (Optional)</label>
                <div className="grid grid-cols-2 gap-2">
                    {['Top-tier', 'Micro-influencer'].map(tier => {
                        const isSelected = campaignData.selectedTiers.includes(tier)
                        return (
                            <Button
                                key={tier}
                                variant={isSelected ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleTier(tier)}
                            >
                                {tier}
                            </Button>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const Step4CreatorMatching = ({ matchedCreators, selectedCreators, toggleCreator }) => (
    <div className="space-y-4">
        <div className="flex items-center justify-between">
            <div>
                <h3 className="font-semibold">Matched Creators</h3>
                <p className="text-sm text-muted-foreground">
                    {matchedCreators.length} creators match your criteria
                </p>
            </div>
            <Badge variant="secondary">
                {selectedCreators.length} selected
            </Badge>
        </div>

        <div className="grid grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {matchedCreators.map(creator => {
                const isSelected = selectedCreators.includes(creator.id)
                return (
                    <Card
                        key={creator.id}
                        className={`cursor-pointer transition-all ${isSelected ? 'ring-2 ring-primary' : 'hover:shadow-md'
                            }`}
                        onClick={() => toggleCreator(creator.id)}
                    >
                        <CardContent className="p-3">
                            <div className="flex items-start gap-3">
                                <img
                                    src={creator.avatar}
                                    alt={creator.name}
                                    className="h-12 w-12 rounded-full"
                                />
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold text-sm truncate">{creator.name}</h4>
                                    <p className="text-xs text-muted-foreground">{creator.username}</p>
                                    <div className="flex gap-1 mt-1">
                                        <Badge variant="outline" className="text-xs">
                                            {formatNumber(creator.followers)}
                                        </Badge>
                                        {creator.isUnlocked && creator.stats && (
                                            <Badge variant="secondary" className="text-xs">
                                                {creator.stats.engagementRate}% eng.
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                                {isSelected && (
                                    <Check className="h-5 w-5 text-primary flex-shrink-0" />
                                )}
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>

        {matchedCreators.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No creators match your criteria</p>
                <p className="text-sm mt-1">Try adjusting your target criteria</p>
            </div>
        )}
    </div>
)

const Step5Review = ({ campaignData, matchedCreators }) => {
    const selectedCreatorsList = matchedCreators.filter(c => campaignData.selectedCreators.includes(c.id))

    return (
        <div className="space-y-6">
            <div>
                <h3 className="font-semibold mb-3">Campaign Summary</h3>
                <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-medium">{campaignData.name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Duration:</span>
                        <span className="font-medium">{campaignData.startDate} to {campaignData.endDate}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="font-medium text-green-600">${formatNumber(campaignData.budget)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Target Reach:</span>
                        <span className="font-medium">{formatNumber(campaignData.targetReach)}</span>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-3">Target Criteria</h3>
                <div className="flex flex-wrap gap-2">
                    {campaignData.selectedDomains.map(domain => (
                        <Badge key={domain} variant="secondary">{domain}</Badge>
                    ))}
                    {campaignData.selectedRegions.map(region => (
                        <Badge key={region} variant="outline">{region}</Badge>
                    ))}
                    {campaignData.selectedTiers.map(tier => (
                        <Badge key={tier} variant="outline">{tier}</Badge>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-3">Selected Creators ({selectedCreatorsList.length})</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {selectedCreatorsList.map(creator => (
                        <div key={creator.id} className="flex items-center gap-3 p-2 rounded border">
                            <img src={creator.avatar} alt={creator.name} className="h-8 w-8 rounded-full" />
                            <div className="flex-1">
                                <p className="text-sm font-medium">{creator.name}</p>
                                <p className="text-xs text-muted-foreground">{formatNumber(creator.followers)} followers</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
