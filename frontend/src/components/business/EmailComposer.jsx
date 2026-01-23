import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { X, Paperclip, Send, FileText, Image as ImageIcon, File } from 'lucide-react'
import { mockCreators, emailTemplates } from '@/data/businessMockData'

export const EmailComposer = ({ onClose, onSendEmail, preselectedCreator }) => {
    const [emailData, setEmailData] = useState({
        recipients: preselectedCreator ? [preselectedCreator] : [],
        subject: '',
        body: '',
        attachments: []
    })

    const [selectedTemplate, setSelectedTemplate] = useState('')

    const handleAddRecipient = (creatorId) => {
        if (!emailData.recipients.includes(parseInt(creatorId))) {
            setEmailData({
                ...emailData,
                recipients: [...emailData.recipients, parseInt(creatorId)]
            })
        }
    }

    const handleRemoveRecipient = (creatorId) => {
        setEmailData({
            ...emailData,
            recipients: emailData.recipients.filter(id => id !== creatorId)
        })
    }

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files)
        const newAttachments = files.map(file => ({
            name: file.name,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            type: file.type
        }))
        setEmailData({
            ...emailData,
            attachments: [...emailData.attachments, ...newAttachments]
        })
    }

    const handleRemoveAttachment = (index) => {
        setEmailData({
            ...emailData,
            attachments: emailData.attachments.filter((_, i) => i !== index)
        })
    }

    const handleApplyTemplate = (templateId) => {
        const template = emailTemplates.find(t => t.id === parseInt(templateId))
        if (template) {
            setEmailData({
                ...emailData,
                subject: template.subject,
                body: template.body
            })
            setSelectedTemplate(templateId)
        }
    }

    const handleSend = () => {
        const newEmail = {
            id: Date.now(),
            ...emailData,
            dateSent: new Date().toISOString().split('T')[0],
            status: 'Sent'
        }
        onSendEmail(newEmail)
        onClose()
    }

    const getFileIcon = (type) => {
        if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />
        if (type.includes('pdf')) return <FileText className="h-4 w-4" />
        return <File className="h-4 w-4" />
    }

    const selectedCreators = mockCreators.filter(c => emailData.recipients.includes(c.id))
    const availableCreators = mockCreators.filter(c => !emailData.recipients.includes(c.id))

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                <CardHeader className="border-b p-4">
                    <div className="flex items-center justify-between">
                        <CardTitle>Compose Email</CardTitle>
                        <Button variant="ghost" size="icon" onClick={onClose}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
                    {}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Use Template (Optional)</label>
                        <Select value={selectedTemplate} onValueChange={handleApplyTemplate}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a template..." />
                            </SelectTrigger>
                            <SelectContent>
                                {emailTemplates.map(template => (
                                    <SelectItem key={template.id} value={template.id.toString()}>
                                        {template.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {}
                    <div>
                        <label className="text-sm font-medium mb-2 block">To: *</label>
                        <div className="space-y-2">
                            {}
                            {selectedCreators.length > 0 && (
                                <div className="flex flex-wrap gap-2 p-2 rounded border bg-muted/30">
                                    {selectedCreators.map(creator => (
                                        <Badge key={creator.id} variant="secondary" className="gap-1">
                                            {creator.name}
                                            <button
                                                onClick={() => handleRemoveRecipient(creator.id)}
                                                className="ml-1 hover:text-destructive"
                                            >
                                                <X className="h-3 w-3" />
                                            </button>
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {}
                            <Select onValueChange={handleAddRecipient}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Add creator..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableCreators.map(creator => (
                                        <SelectItem key={creator.id} value={creator.id.toString()}>
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={creator.avatar}
                                                    alt={creator.name}
                                                    className="h-6 w-6 rounded-full"
                                                />
                                                <span>{creator.name}</span>
                                                <span className="text-xs text-muted-foreground">
                                                    {creator.username}
                                                </span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Subject *</label>
                        <Input
                            placeholder="Enter email subject..."
                            value={emailData.subject}
                            onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                        />
                    </div>

                    {}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Message *</label>
                        <Textarea
                            placeholder="Type your message here..."
                            value={emailData.body}
                            onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                            rows={10}
                            className="font-mono text-sm"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            Use [Creator Name], [Company Name], [Campaign Name], [Budget], [Duration] as placeholders
                        </p>
                    </div>

                    {}
                    <div>
                        <label className="text-sm font-medium mb-2 block">Attachments</label>
                        <div className="space-y-2">
                            {}
                            <div>
                                <input
                                    type="file"
                                    id="file-upload"
                                    multiple
                                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                                <label htmlFor="file-upload">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="gap-2 cursor-pointer"
                                        asChild
                                    >
                                        <span>
                                            <Paperclip className="h-4 w-4" />
                                            Attach Files
                                        </span>
                                    </Button>
                                </label>
                                <p className="text-xs text-muted-foreground mt-1">
                                    Supported: PDF, Word, Images (Max 10MB each)
                                </p>
                            </div>

                            {}
                            {emailData.attachments.length > 0 && (
                                <div className="space-y-1">
                                    {emailData.attachments.map((file, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-2 rounded border bg-muted/30"
                                        >
                                            <div className="flex items-center gap-2">
                                                {getFileIcon(file.type)}
                                                <div>
                                                    <p className="text-sm font-medium">{file.name}</p>
                                                    <p className="text-xs text-muted-foreground">{file.size}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleRemoveAttachment(index)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>

                <div className="border-t p-4 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">
                        {emailData.recipients.length} recipient(s) • {emailData.attachments.length} attachment(s)
                    </p>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSend}
                            disabled={!emailData.recipients.length || !emailData.subject || !emailData.body}
                            className="gap-2"
                        >
                            <Send className="h-4 w-4" />
                            Send Email
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
