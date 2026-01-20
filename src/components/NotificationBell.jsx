import React, { useState } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

export const NotificationBell = () => {
    const [hasUnread, setHasUnread] = useState(true)
    const [notifications] = useState([
        {
            id: 1,
            title: 'Viral Alert! 🔥',
            message: 'Your YouTube video reached 100K views',
            time: '5 min ago',
            unread: true,
        },
        {
            id: 2,
            title: 'Engagement Spike',
            message: 'Instagram Reels engagement up 45%',
            time: '1 hour ago',
            unread: true,
        },
        {
            id: 3,
            title: 'Best Time to Post',
            message: 'Post now for maximum reach on Facebook',
            time: '2 hours ago',
            unread: false,
        },
    ])

    const playNotificationSound = () => {
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.value = 800
        oscillator.type = 'sine'

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + 0.5)
    }

    const handleOpen = (open) => {
        if (open && hasUnread) {
            playNotificationSound()
            setHasUnread(false)
        }
    }

    return (
        <DropdownMenu onOpenChange={handleOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {hasUnread && (
                        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                        <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                            <div className="flex items-start justify-between w-full mb-1">
                                <span className="font-semibold text-sm">{notification.title}</span>
                                {notification.unread && (
                                    <Badge variant="secondary" className="text-xs px-1 py-0">New</Badge>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{notification.message}</p>
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                        </DropdownMenuItem>
                    ))}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center justify-center text-xs text-primary">
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
