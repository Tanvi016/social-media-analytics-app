import React, { useState } from 'react'
import { BarChart3, MessageSquare, User, Settings, ChevronLeft, ChevronRight, Sparkles, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export const Sidebar = ({ activeTab, onTabChange, unreadCount = 0 }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const menuItems = [
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'recommendations', label: 'Recommendations', icon: Sparkles },
        { id: 'inbox', label: 'Inbox', icon: Mail, badge: unreadCount },
        { id: 'chat', label: 'AI Chat', icon: MessageSquare },
        { id: 'profile', label: 'Profile', icon: User },
    ]

    return (
        <div
            className={cn(
                'h-screen bg-card border-r border-border flex flex-col transition-all duration-300',
                isCollapsed ? 'w-16' : 'w-64'
            )}
        >
            {}
            <div className="p-4 border-b border-border flex items-center justify-between">
                {!isCollapsed && (
                    <h2 className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                        SocialMetrics
                    </h2>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="ml-auto"
                >
                    {isCollapsed ? (
                        <ChevronRight className="h-5 w-5" />
                    ) : (
                        <ChevronLeft className="h-5 w-5" />
                    )}
                </Button>
            </div>

            {}
            <nav className="flex-1 p-2 space-y-1">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.id

                    return (
                        <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={cn(
                                'relative w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all',
                                'hover:bg-accent hover:text-accent-foreground',
                                isActive && 'bg-primary text-primary-foreground hover:bg-primary/90',
                                isCollapsed && 'justify-center'
                            )}
                            title={isCollapsed ? item.label : ''}
                        >
                            <Icon className="h-5 w-5 flex-shrink-0" />
                            {!isCollapsed && (
                                <div className="flex items-center justify-between flex-1">
                                    <span className="text-sm font-medium">{item.label}</span>
                                    {item.badge > 0 && (
                                        <Badge className="ml-auto bg-red-500 hover:bg-red-600 h-5 min-w-5 px-1 text-xs">
                                            {item.badge}
                                        </Badge>
                                    )}
                                </div>
                            )}
                            {isCollapsed && item.badge > 0 && (
                                <Badge className="absolute top-1 right-1 bg-red-500 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                                    {item.badge > 9 ? '9+' : item.badge}
                                </Badge>
                            )}
                        </button>
                    )
                })}
            </nav>

            {}
            <div className="p-2 border-t border-border">
                <button
                    className={cn(
                        'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all',
                        'hover:bg-accent hover:text-accent-foreground',
                        isCollapsed && 'justify-center'
                    )}
                    title={isCollapsed ? 'Settings' : ''}
                >
                    <Settings className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm font-medium">Settings</span>}
                </button>
            </div>
        </div>
    )
}
