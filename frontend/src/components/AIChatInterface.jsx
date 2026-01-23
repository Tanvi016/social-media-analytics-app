import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, Send } from 'lucide-react'
import { aiChatResponses } from '@/data/mockData'
import { cn } from '@/lib/utils'

export const AIChatInterface = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hi! I\'m your AI analytics assistant. Ask me anything about your social media performance, revenue optimization, or content strategy!',
        },
    ])
    const [input, setInput] = useState('')
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const getAIResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase()

        for (const [key, response] of Object.entries(aiChatResponses)) {
            if (key !== 'default' && lowerMessage.includes(key)) {
                return response
            }
        }

        return aiChatResponses.default
    }

    const handleSend = () => {
        if (!input.trim()) return

        const userMessage = { role: 'user', content: input }
        setMessages((prev) => [...prev, userMessage])

        setTimeout(() => {
            const aiResponse = { role: 'assistant', content: getAIResponse(input) }
            setMessages((prev) => [...prev, aiResponse])
        }, 500)

        setInput('')
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const quickQuestions = [
        'Which post had the highest engagement?',
        'What\'s the best time to post?',
        'Tell me about viral content',
        'How are my followers growing?',
        'Show me revenue insights',
    ]

    return (
        <div className="h-full flex flex-col">
            <Card className="flex-1 flex flex-col overflow-hidden">
                <CardHeader className="p-4 border-b">
                    <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        AI Analytics Assistant
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                        Ask questions in natural language to get insights about your social media performance
                    </p>
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={cn(
                                'flex',
                                message.role === 'user' ? 'justify-end' : 'justify-start'
                            )}
                        >
                            <div
                                className={cn(
                                    'max-w-[50%] rounded-xl px-4 py-3 break-words',
                                    message.role === 'user'
                                        ? 'bg-primary text-primary-foreground ml-auto mr-4'
                                        : 'bg-muted border border-border ml-4 mr-auto'
                                )}
                            >
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </CardContent>

                <div className="p-4 border-t">
                    {}
                    {messages.length === 1 && (
                        <div className="mb-3">
                            <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                            <div className="flex flex-wrap gap-2">
                                {quickQuestions.map((question, index) => (
                                    <Button
                                        key={index}
                                        variant="outline"
                                        size="sm"
                                        onClick={() => {
                                            setInput(question)
                                            setTimeout(() => handleSend(), 100)
                                        }}
                                        className="text-xs"
                                    >
                                        {question}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}

                    {}
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about your analytics..."
                            className="flex-1 px-4 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <Button onClick={handleSend} size="icon">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
