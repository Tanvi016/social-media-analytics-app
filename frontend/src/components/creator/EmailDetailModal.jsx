import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import {
    X, Building2, CalendarDays, DollarSign, CheckCircle2,
    XCircle, Mail, User, Target, List
} from 'lucide-react'

export const EmailDetailModal = ({ email, onClose, onUpdateStatus }) => {
    const [response, setResponse] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleAccept = async () => {
        setIsSubmitting(true)
        
        await new Promise(resolve => setTimeout(resolve, 500))
        onUpdateStatus('accepted')
        setIsSubmitting(false)
    }

    const handleReject = async () => {
        setIsSubmitting(true)
        
        await new Promise(resolve => setTimeout(resolve, 500))
        onUpdateStatus('rejected')
        setIsSubmitting(false)
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            case 'rejected':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
                <CardHeader className="border-b flex-shrink-0">
                    <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                            <img
                                src={email.companyLogo}
                                alt={email.company}
                                className="h-16 w-16 rounded-lg"
                            />
                            <div className="flex-1">
                                <CardTitle className="text-xl mb-2">{email.subject}</CardTitle>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
                                    <div className="flex items-center gap-1">
                                        <Building2 className="h-4 w-4" />
                                        <span className="font-medium">{email.company}</span>
                                    </div>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        <span>{email.from}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{new Date(email.timestamp).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    <Badge className={getStatusColor(email.status)}>
                                        {email.status.charAt(0).toUpperCase() + email.status.slice(1)}
                                    </Badge>
                                    {email.tags.map(tag => (
                                        <Badge key={tag} variant="outline">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            className="flex-shrink-0"
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="p-6 overflow-y-auto flex-1">
                    <div className="space-y-6">
                        {}
                        <div>
                            <h3 className="font-semibold mb-2 flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                Message
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {email.message}
                            </p>
                        </div>

                        {}
                        <div>
                            <h3 className="font-semibold mb-3 flex items-center gap-2">
                                <Target className="h-4 w-4" />
                                Campaign Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                            <DollarSign className="h-4 w-4" />
                                            Budget
                                        </div>
                                        <p className="text-2xl font-bold text-green-600">
                                            ${email.campaignDetails.budget.toLocaleString()}
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-4">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                            <CalendarDays className="h-4 w-4" />
                                            Timeline
                                        </div>
                                        <p className="text-sm font-medium">
                                            {email.campaignDetails.timeline}
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            <div className="mt-4 space-y-3">
                                <div>
                                    <h4 className="text-sm font-medium mb-2">Campaign Name</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {email.campaignDetails.name}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                                        <List className="h-4 w-4" />
                                        Deliverables
                                    </h4>
                                    <ul className="space-y-1">
                                        {email.campaignDetails.deliverables.map((item, index) => (
                                            <li
                                                key={index}
                                                className="text-sm text-muted-foreground flex items-start gap-2"
                                            >
                                                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-2">Target Audience</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {email.campaignDetails.targetAudience}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-medium mb-2">Campaign Objectives</h4>
                                    <p className="text-sm text-muted-foreground">
                                        {email.campaignDetails.objectives}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {}
                        {email.status === 'pending' && (
                            <div>
                                <h3 className="font-semibold mb-2">Your Response (Optional)</h3>
                                <Textarea
                                    placeholder="Add a message to your response..."
                                    value={response}
                                    onChange={(e) => setResponse(e.target.value)}
                                    rows={4}
                                    className="mb-3"
                                />
                                <div className="flex gap-3">
                                    <Button
                                        onClick={handleAccept}
                                        disabled={isSubmitting}
                                        className="flex-1 bg-green-600 hover:bg-green-700"
                                    >
                                        <CheckCircle2 className="h-4 w-4 mr-2" />
                                        Accept Collaboration
                                    </Button>
                                    <Button
                                        onClick={handleReject}
                                        disabled={isSubmitting}
                                        variant="destructive"
                                        className="flex-1"
                                    >
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Decline
                                    </Button>
                                </div>
                            </div>
                        )}

                        {}
                        {email.status !== 'pending' && (
                            <div className={`p-4 rounded-lg ${email.status === 'accepted'
                                    ? 'bg-green-50 dark:bg-green-950'
                                    : 'bg-red-50 dark:bg-red-950'
                                }`}>
                                <p className={`text-sm font-medium ${email.status === 'accepted'
                                        ? 'text-green-800 dark:text-green-200'
                                        : 'text-red-800 dark:text-red-200'
                                    }`}>
                                    {email.status === 'accepted'
                                        ? '✓ You have accepted this collaboration'
                                        : '✗ You have declined this collaboration'
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
