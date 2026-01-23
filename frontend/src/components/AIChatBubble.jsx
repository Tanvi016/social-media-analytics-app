import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, Send, X, Minimize2 } from 'lucide-react'
import { aiChatResponses } from '@/data/mockData'
import { cn } from '@/lib/utils'

export const AIChatBubble = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isDismissed, setIsDismissed] = useState(false)
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hi! I\'m your AI analytics assistant. Ask me anything about your social media performance!',
        },
    ])
    const [input, setInput] = useState('')
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const bubbleRef = useRef(null)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    const handleMouseDown = (e) => {
        if (!isOpen) {
            setIsDragging(true)
            const rect = bubbleRef.current.getBoundingClientRect()
            setDragOffset({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            })
        }
    }

    const handleMouseMove = (e) => {
        if (isDragging && !isOpen) {
            setPosition({
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y,
            })
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
                window.removeEventListener('mouseup', handleMouseUp)
            }
        }
    }, [isDragging, dragOffset])

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

    if (isDismissed) {
        return null
    }

    if (!isOpen) {
        return (
            <div
                ref={bubbleRef}
                className={cn(
                    'fixed z-50',
                    isDragging ? 'cursor-grabbing' : 'cursor-grab'
                )}
                style={{
                    right: position.x ? `${window.innerWidth - position.x - 48}px` : '1.5rem',
                    bottom: position.y ? `${window.innerHeight - position.y - 48}px` : '1.5rem',
                    left: position.x ? 'auto' : 'auto',
                    top: position.y ? 'auto' : 'auto',
                }}
                onMouseDown={handleMouseDown}
            >
                <div className="relative">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsOpen(true)
                        }}
                        className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg hover:shadow-xl transition-all animate-pulse-slow flex items-center justify-center group"
                    >
                        <MessageSquare className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsDismissed(true)
                        }}
                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                    <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse" />
                </div>
            </div>
        )
    }

    return (
        <Card
            className="fixed bottom-4 right-4 z-50 w-96 h-[500px] shadow-2xl flex flex-col"
            style={{ maxHeight: 'calc(100vh - 2rem)' }}
        >
            <CardHeader className="flex-shrink-0 border-b bg-gradient-to-r from-primary to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        AI Analytics Assistant
                    </CardTitle>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="h-8 w-8 text-white hover:bg-white/20"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
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
                                'max-w-[80%] rounded-lg px-4 py-2',
                                message.role === 'user'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'bg-muted'
                            )}
                        >
                            <p className="text-sm">{message.content}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </CardContent>

            <div className="flex-shrink-0 p-4 border-t">
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
    )
}
