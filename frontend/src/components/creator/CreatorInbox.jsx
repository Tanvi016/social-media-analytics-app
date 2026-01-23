import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
    Mail, MailOpen, Search, Filter, Clock, DollarSign,
    Calendar, CheckCircle2, XCircle, AlertCircle
} from 'lucide-react'
import { EmailDetailModal } from './EmailDetailModal'

export const CreatorInbox = ({ emails, onUpdateEmail }) => {
    const [selectedEmail, setSelectedEmail] = useState(null)
    const [filterStatus, setFilterStatus] = useState('all') 
    const [searchQuery, setSearchQuery] = useState('')

    
    const filteredEmails = emails.filter(email => {
        const matchesStatus = filterStatus === 'all' || email.status === filterStatus
        const matchesSearch =
            email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            email.from.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesStatus && matchesSearch
    })

    
    const sortedEmails = [...filteredEmails].sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
    )

    const getStatusColor = (status) => {
        switch (status) {
            case 'accepted': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
        }
    }

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'text-red-500'
            case 'medium': return 'text-yellow-500'
            case 'low': return 'text-green-500'
            default: return 'text-gray-500'
        }
    }

    const handleEmailClick = (email) => {
        setSelectedEmail(email)
        if (!email.isRead) {
            onUpdateEmail(email.id, { isRead: true })
        }
    }

    const pendingCount = emails.filter(e => e.status === 'pending').length
    const unreadCount = emails.filter(e => !e.isRead && e.status === 'pending').length

    return (
        <div className="h-full overflow-hidden">
            <div className="h-full flex flex-col p-6 max-w-6xl mx-auto">
                {}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        <Mail className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">Collaboration Inbox</h1>
                        <p className="text-sm text-muted-foreground">
                            Manage partnership requests and collaboration opportunities
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Badge variant="secondary" className="gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {pendingCount} Pending
                        </Badge>
                        {unreadCount > 0 && (
                            <Badge className="gap-1 bg-red-500">
                                <Mail className="h-3 w-3" />
                                {unreadCount} Unread
                            </Badge>
                        )}
                    </div>
                </div>

                {}
                <div className="flex gap-3 mb-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by company, subject, or sender..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={filterStatus === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('all')}
                        >
                            All
                        </Button>
                        <Button
                            variant={filterStatus === 'pending' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('pending')}
                            className="gap-1"
                        >
                            <Clock className="h-3 w-3" />
                            Pending
                        </Button>
                        <Button
                            variant={filterStatus === 'accepted' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('accepted')}
                            className="gap-1"
                        >
                            <CheckCircle2 className="h-3 w-3" />
                            Accepted
                        </Button>
                        <Button
                            variant={filterStatus === 'rejected' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setFilterStatus('rejected')}
                            className="gap-1"
                        >
                            <XCircle className="h-3 w-3" />
                            Rejected
                        </Button>
                    </div>
                </div>

                {}
                <div className="flex-1 overflow-y-auto space-y-2">
                    {sortedEmails.length === 0 ? (
                        <Card>
                            <CardContent className="p-12 text-center">
                                <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground">No emails found</p>
                            </CardContent>
                        </Card>
                    ) : (
                        sortedEmails.map(email => (
                            <Card
                                key={email.id}
                                className={`cursor-pointer transition-all hover:border-primary ${!email.isRead ? 'border-l-4 border-l-primary' : ''
                                    }`}
                                onClick={() => handleEmailClick(email)}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-4">
                                        {}
                                        <div className="flex-shrink-0">
                                            <img
                                                src={email.companyLogo}
                                                alt={email.company}
                                                className="h-12 w-12 rounded-lg"
                                            />
                                        </div>

                                        {}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <div className="flex items-center gap-2">
                                                    {!email.isRead ? (
                                                        <Mail className="h-4 w-4 text-primary" />
                                                    ) : (
                                                        <MailOpen className="h-4 w-4 text-muted-foreground" />
                                                    )}
                                                    <h3 className={`font-semibold truncate ${!email.isRead ? 'text-primary' : ''
                                                        }`}>
                                                        {email.subject}
                                                    </h3>
                                                </div>
                                                <AlertCircle
                                                    className={`h-4 w-4 flex-shrink-0 ${getPriorityColor(email.priority)}`}
                                                />
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                                <span className="font-medium">{email.company}</span>
                                                <span>•</span>
                                                <span>{email.from}</span>
                                                <span>•</span>
                                                <span>{new Date(email.timestamp).toLocaleDateString()}</span>
                                            </div>

                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                                {email.message}
                                            </p>

                                            <div className="flex items-center gap-3 flex-wrap">
                                                <Badge className={getStatusColor(email.status)}>
                                                    {email.status.charAt(0).toUpperCase() + email.status.slice(1)}
                                                </Badge>
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <DollarSign className="h-3 w-3" />
                                                    ${email.campaignDetails.budget.toLocaleString()}
                                                </div>
                                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                                    <Calendar className="h-3 w-3" />
                                                    {email.campaignDetails.timeline.split(' - ')[0]}
                                                </div>
                                                {email.tags.map(tag => (
                                                    <Badge key={tag} variant="outline" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>

            {}
            {selectedEmail && (
                <EmailDetailModal
                    email={selectedEmail}
                    onClose={() => setSelectedEmail(null)}
                    onUpdateStatus={(status) => {
                        onUpdateEmail(selectedEmail.id, { status, isRead: true })
                        setSelectedEmail(null)
                    }}
                />
            )}
        </div>
    )
}
