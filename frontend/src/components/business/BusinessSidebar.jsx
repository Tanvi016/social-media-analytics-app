import React, { useState } from 'react'
import { LayoutDashboard, Search, Briefcase, User, Settings, ChevronLeft, ChevronRight, BarChart3, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export const BusinessSidebar = ({ activeTab, onTabChange }) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'connect', label: 'Connect', icon: Search },
        { id: 'campaigns', label: 'Ongoing Campaigns', icon: Briefcase },
        { id: 'messages', label: 'Messages', icon: Mail },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
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
                        Business Hub
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
                                'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all',
                                'hover:bg-accent hover:text-accent-foreground',
                                isActive && 'bg-primary text-primary-foreground hover:bg-primary/90',
                                isCollapsed && 'justify-center'
                            )}
                            title={isCollapsed ? item.label : ''}
                        >
                            <Icon className="h-5 w-5 flex-shrink-0" />
                            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
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
