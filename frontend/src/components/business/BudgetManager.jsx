import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { DollarSign, TrendingUp, AlertTriangle, Edit2, Check, X } from 'lucide-react'
import { formatNumber } from '@/lib/utils'
import { businessProfile as initialProfile } from '@/data/businessMockData'

export const BudgetManager = ({ onBudgetUpdate }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [budget, setBudget] = useState(initialProfile)
    const [tempBudget, setTempBudget] = useState(initialProfile.totalBudget)

    const handleSave = () => {
        const newBudget = {
            ...budget,
            totalBudget: parseInt(tempBudget),
            availableBudget: parseInt(tempBudget) - budget.allocatedBudget
        }
        setBudget(newBudget)
        setIsEditing(false)
        if (onBudgetUpdate) {
            onBudgetUpdate(newBudget)
        }
    }

    const handleCancel = () => {
        setTempBudget(budget.totalBudget)
        setIsEditing(false)
    }

    const budgetUtilization = (budget.allocatedBudget / budget.totalBudget) * 100
    const isNearLimit = budgetUtilization > 80

    return (
        <Card>
            <CardHeader className="p-4">
                <CardTitle className="flex items-center justify-between text-base">
                    <span className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-500" />
                        Budget Management
                    </span>
                    {!isEditing && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            className="h-auto p-1"
                        >
                            <Edit2 className="h-4 w-4" />
                        </Button>
                    )}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-4">
                {}
                <div>
                    <label className="text-sm text-muted-foreground mb-1 block">Total Budget</label>
                    {isEditing ? (
                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                <Input
                                    type="number"
                                    value={tempBudget}
                                    onChange={(e) => setTempBudget(e.target.value)}
                                    className="pl-7"
                                />
                            </div>
                            <Button size="sm" onClick={handleSave} className="gap-1">
                                <Check className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCancel} className="gap-1">
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <p className="text-2xl font-bold text-green-600">
                            ${formatNumber(budget.totalBudget)}
                        </p>
                    )}
                </div>

                {}
                <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Allocated</span>
                        <span className="font-semibold text-orange-600">
                            ${formatNumber(budget.allocatedBudget)}
                        </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Available</span>
                        <span className="font-semibold text-green-600">
                            ${formatNumber(budget.availableBudget)}
                        </span>
                    </div>
                </div>

                {}
                <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-muted-foreground">Budget Utilization</span>
                        <span className={budgetUtilization > 90 ? 'text-red-600 font-semibold' : 'font-semibold'}>
                            {budgetUtilization.toFixed(1)}%
                        </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                        <div
                            className={`h-2 rounded-full transition-all ${budgetUtilization > 90 ? 'bg-red-500' :
                                    budgetUtilization > 70 ? 'bg-orange-500' :
                                        'bg-green-500'
                                }`}
                            style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
                        />
                    </div>
                </div>

                {}
                {isNearLimit && (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800">
                        <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-orange-900 dark:text-orange-100">
                                Budget Alert
                            </p>
                            <p className="text-xs text-orange-700 dark:text-orange-200 mt-1">
                                You've allocated {budgetUtilization.toFixed(0)}% of your total budget. Consider increasing your budget or closing some campaigns.
                            </p>
                        </div>
                    </div>
                )}

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                    <div className="text-center p-2 rounded bg-muted/50">
                        <p className="text-xs text-muted-foreground">Avg per Campaign</p>
                        <p className="text-sm font-semibold">
                            ${formatNumber(Math.round(budget.allocatedBudget / 4))}
                        </p>
                    </div>
                    <div className="text-center p-2 rounded bg-muted/50">
                        <p className="text-xs text-muted-foreground">Can Create</p>
                        <p className="text-sm font-semibold flex items-center justify-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {Math.floor(budget.availableBudget / 10000)} more
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
