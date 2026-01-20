import React from 'react'
import { Info } from 'lucide-react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip'

export const InfoTooltip = ({ content }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <button className="inline-flex items-center justify-center">
                        <Info className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                    </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                    <p className="text-xs">{content}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
