import React from 'react'
import { Globe, Instagram, Youtube, Facebook, BarChart3, Video, Image as ImageIcon, FileImage } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export const PlatformFilter = ({ selectedPlatform, onPlatformChange }) => {
    const platforms = [
        { value: 'all', label: 'All Platforms', Icon: Globe },
        { value: 'instagram', label: 'Instagram', Icon: Instagram },
        { value: 'youtube', label: 'YouTube', Icon: Youtube },
        { value: 'facebook', label: 'Facebook', Icon: Facebook },
    ]

    const selected = platforms.find(p => p.value === selectedPlatform) || platforms[0]
    const SelectedIcon = selected.Icon

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <SelectedIcon className="h-4 w-4" />
                    {selected.label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {platforms.map((platform) => {
                    const Icon = platform.Icon
                    return (
                        <DropdownMenuItem
                            key={platform.value}
                            onClick={() => onPlatformChange(platform.value)}
                        >
                            <Icon className="h-4 w-4 mr-2" />
                            {platform.label}
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const ContentTypeFilter = ({ selectedType, onTypeChange }) => {
    const types = [
        { value: 'all', label: 'All Content', Icon: BarChart3 },
        { value: 'reels', label: 'Reels', Icon: Video },
        { value: 'carousels', label: 'Carousels', Icon: ImageIcon },
        { value: 'static', label: 'Static Posts', Icon: FileImage },
    ]

    const selected = types.find(t => t.value === selectedType) || types[0]
    const SelectedIcon = selected.Icon

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <SelectedIcon className="h-4 w-4" />
                    {selected.label}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {types.map((type) => {
                    const Icon = type.Icon
                    return (
                        <DropdownMenuItem
                            key={type.value}
                            onClick={() => onTypeChange(type.value)}
                        >
                            <Icon className="h-4 w-4 mr-2" />
                            {type.label}
                        </DropdownMenuItem>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
