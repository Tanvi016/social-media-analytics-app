import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Send, Clock, CheckCircle2 } from 'lucide-react'
import { mockEmailHistory, mockCreators } from '@/data/businessMockData'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export const CommunicationCenter = () => {
    const [emailHistory, setEmailHistory] = useState(mockEmailHistory)
    const [selectedCreator, setSelectedCreator] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const handleSendEmail = () => {
        if (!selectedCreator || !subject || !message) {
            alert('Please fill in all fields')
            return
        }

        const creator = mockCreators.find(c => c.id.toString() === selectedCreator)

        const newEmail = {
            id: emailHistory.length + 1,
            creatorName: creator.name,
            creatorId: creator.id,
            subject: subject,
            dateSent: new Date().toISOString().split('T')[0],
            status: 'Sent'
        }

        setEmailHistory([newEmail, ...emailHistory])

        
        setSelectedCreator('')
        setSubject('')
        setMessage('')

        alert('Email sent successfully!')
    }

    const filteredHistory = emailHistory.filter(email =>
        email.creatorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.subject.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="h-full overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-4 pb-6">
                {}
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-blue-500 text-white">
                        <Mail className="h-6 w-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Communication Center</h1>
                        <p className="text-sm text-muted-foreground">Manage your creator communications</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {}
                    <div className="col-span-2">
                        <Card>
                            <CardHeader className="p-4">
                                <CardTitle className="flex items-center gap-2">
                                    <Send className="h-5 w-5" />
                                    Send Email to Creator
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 space-y-3">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">Select Creator</label>
                                    <Select value={selectedCreator} onValueChange={setSelectedCreator}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Choose a creator..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {mockCreators.map(creator => (
                                                <SelectItem key={creator.id} value={creator.id.toString()}>
                                                    {creator.name} ({creator.username})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-1 block">Subject</label>
                                    <Input
                                        placeholder="Enter email subject..."
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium mb-1 block">Message</label>
                                    <Textarea
                                        placeholder="Write your message here..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        rows={6}
                                    />
                                </div>

                                <Button onClick={handleSendEmail} className="w-full gap-2">
                                    <Send className="h-4 w-4" />
                                    Send Email
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {}
                    <div className="space-y-4">
                        <Card>
                            <CardContent className="p-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-primary">{emailHistory.length}</p>
                                    <p className="text-sm text-muted-foreground">Total Emails</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-green-600">
                                        {emailHistory.filter(e => e.status === 'Replied').length}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Replies Received</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="text-center">
                                    <p className="text-3xl font-bold text-yellow-600">
                                        {emailHistory.filter(e => e.status === 'Sent').length}
                                    </p>
                                    <p className="text-sm text-muted-foreground">Awaiting Reply</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {}
                <Card>
                    <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Email History
                            </CardTitle>
                            <Input
                                placeholder="Search emails..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-64"
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                        <div className="border rounded-lg overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-muted">
                                    <tr>
                                        <th className="text-left p-3 text-sm font-semibold">Creator</th>
                                        <th className="text-left p-3 text-sm font-semibold">Subject</th>
                                        <th className="text-left p-3 text-sm font-semibold">Date Sent</th>
                                        <th className="text-left p-3 text-sm font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredHistory.map((email, index) => (
                                        <tr
                                            key={email.id}
                                            className={cn(
                                                'border-t hover:bg-accent/50 transition-colors',
                                                index % 2 === 0 && 'bg-muted/20'
                                            )}
                                        >
                                            <td className="p-3 text-sm font-medium">{email.creatorName}</td>
                                            <td className="p-3 text-sm">{email.subject}</td>
                                            <td className="p-3 text-sm text-muted-foreground">{email.dateSent}</td>
                                            <td className="p-3">
                                                <Badge
                                                    variant={email.status === 'Replied' ? 'default' : 'secondary'}
                                                    className="gap-1"
                                                >
                                                    {email.status === 'Replied' ? (
                                                        <CheckCircle2 className="h-3 w-3" />
                                                    ) : (
                                                        <Clock className="h-3 w-3" />
                                                    )}
                                                    {email.status}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {filteredHistory.length === 0 && (
                                <div className="text-center py-8 text-muted-foreground">
                                    <Mail className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                    <p>No emails found</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}


import { cn } from '@/lib/utils'
