import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { X, Send, CheckCircle2, AlertCircle, Loader2, TrendingUp, Users2, Clock } from 'lucide-react'
import { businessApi } from '@/api/businessApi'

const CAMPAIGN_GOALS = [
    'Product awareness',
    'Brand collaboration',
    'Launch campaign',
    'Event promotion',
    'Content partnership',
    'Sponsored content',
    'Product review',
    'Brand ambassadorship'
]

export const ContactCreatorModal = ({ creator, businessInfo, onClose }) => {
    const [campaignGoal, setCampaignGoal] = useState('')
    const [additionalMessage, setAdditionalMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(null)
    const [emailPreview, setEmailPreview] = useState(null)

    const handleSend = async () => {
        if (!campaignGoal) {
            setStatus({ type: 'error', message: 'Please select a campaign goal' })
            return
        }

        setLoading(true)
        setStatus(null)

        const payload = {
            sender_id: "business-123", // TODO: Replace with real logged-in user ID
            receiver_id: creator.id.toString(),
            business_name: businessInfo.name,
            business_email: businessInfo.email, // backend doesn't explicitly use this but it's fine to pass extra? model check: ContactRequest doesn't have business_email. It has business_name.
            // Wait, backend ContactRequest has: sender_id, receiver_id, business_name, campaign_goal, metrics_justification, best_content_type, best_posting_time, subject, body.
            // It DOES NOT have business_email. It has body.
            // Frontend sends: campaign_goal, additional_message.
            campaign_goal: campaignGoal,
            subject: `Partnership Opportunity: ${campaignGoal}`,
            body: additionalMessage || `Hi ${creator.name}, we'd love to collaborate with you on our ${campaignGoal} campaign.`,
            metrics_justification: {},
            best_content_type: "Reels", // Dummy data for now or fetch from stats
            best_posting_time: "Unknown"
        }

        const result = await businessApi.contactCreator(payload)

        if (result.success) {
            setStatus({
                type: 'success',
                message: `Email sent successfully to ${creator.name}!`
            })
            setEmailPreview(result.data.email_preview)

            setTimeout(() => {
                onClose(true)
            }, 2000)
        } else {
            setStatus({
                type: 'error',
                message: result.error || 'Failed to send email'
            })
        }

        setLoading(false)
    }

    const stats = creator.stats || {}
    const platforms = creator.platforms?.join(', ') || 'Multiple platforms'

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                <CardHeader className="border-b p-4">
                    <div className="flex items-center justify-between">
                        <CardTitle>Contact Creator</CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => onClose(false)}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-6 space-y-6">
                    <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border">
                        <img
                            src={creator.avatar}
                            alt={creator.name}
                            className="h-16 w-16 rounded-full border-2 border-primary/20"
                        />
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">{creator.name}</h3>
                                {creator.verified && (
                                    <Badge variant="secondary" className="gap-1">
                                        <CheckCircle2 className="h-3 w-3" />
                                        Verified
                                    </Badge>
                                )}
                            </div>
                            <p className="text-sm text-muted-foreground">{creator.username}</p>
                            <p className="text-xs text-muted-foreground mt-1">{platforms}</p>
                        </div>
                    </div>

                    {stats.engagementRate && (
                        <div>
                            <h4 className="font-medium text-sm mb-3">Performance Highlights</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <div className="flex items-center gap-2 mb-1">
                                        <TrendingUp className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                        <span className="text-xs font-medium text-blue-900 dark:text-blue-300">
                                            Engagement Rate
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                                        {stats.engagementRate}%
                                    </p>
                                </div>

                                <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-200 dark:border-purple-800">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Users2 className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                        <span className="text-xs font-medium text-purple-900 dark:text-purple-300">
                                            Best Content Type
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                                        {stats.bestContentType}
                                    </p>
                                </div>

                                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Clock className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        <span className="text-xs font-medium text-green-900 dark:text-green-300">
                                            Best Platform
                                        </span>
                                    </div>
                                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                                        {stats.bestPlatform}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            Campaign Goal <span className="text-destructive">*</span>
                        </label>
                        <Select value={campaignGoal} onValueChange={setCampaignGoal}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select campaign objective..." />
                            </SelectTrigger>
                            <SelectContent>
                                {CAMPAIGN_GOALS.map(goal => (
                                    <SelectItem key={goal} value={goal}>
                                        {goal}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-sm font-medium mb-2 block">
                            Additional Message <span className="text-muted-foreground">(Optional)</span>
                        </label>
                        <Textarea
                            placeholder="Add any specific details about your campaign or requirements..."
                            value={additionalMessage}
                            onChange={(e) => setAdditionalMessage(e.target.value)}
                            rows={4}
                            maxLength={500}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            {additionalMessage.length}/500 characters
                        </p>
                    </div>

                    {status && (
                        <div
                            className={`p-4 rounded-lg border flex items-start gap-3 ${status.type === 'success'
                                ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                                : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
                                }`}
                        >
                            {status.type === 'success' ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                            ) : (
                                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                            )}
                            <div className="flex-1">
                                <p
                                    className={`font-medium ${status.type === 'success'
                                        ? 'text-green-900 dark:text-green-300'
                                        : 'text-red-900 dark:text-red-300'
                                        }`}
                                >
                                    {status.message}
                                </p>
                                {status.type === 'success' && (
                                    <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                                        The creator will receive your analytics-backed outreach email.
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </CardContent>

                <div className="border-t p-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        {stats.engagementRate
                            ? 'Email will include performance insights'
                            : 'Contacting creator'}
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => onClose(false)} disabled={loading}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSend}
                            disabled={!campaignGoal || loading}
                            className="gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    Send Contact Email
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
