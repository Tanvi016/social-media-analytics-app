import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

export function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
}

export function formatPercentage(num) {
    return num.toFixed(1) + '%'
}

export function calculateGrowth(current, previous) {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
}
