import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { TrendingUp, DollarSign, Target, Users, FileText, FileSpreadsheet, Download } from 'lucide-react'
import { analyticsTimeSeries } from '@/data/businessMockData'
import { mockCampaigns, mockCreators } from '@/data/businessMockData'
import { formatNumber } from '@/lib/utils'
import { exportAnalyticsToPDF, exportAnalyticsToCSV, exportAnalyticsToExcel } from '@/lib/exportUtils'

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899']


export const CampaignPerformanceChart = () => (
    <Card className="flex flex-col">
        <CardHeader className="p-3">
            <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                Campaign Performance Trends
            </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsTimeSeries.campaignPerformance}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="reach"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        name="Reach"
                    />
                    <Line
                        type="monotone"
                        dataKey="engagement"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Engagement"
                    />
                    <Line
                        type="monotone"
                        dataKey="conversions"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Conversions"
                    />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
)


export const BudgetAllocationChart = () => (
    <Card className="flex flex-col">
        <CardHeader className="p-3">
            <CardTitle className="text-sm flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                Budget Allocation by Domain
            </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={analyticsTimeSeries.budgetAllocation}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ percentage }) => `${percentage}%`}
                    >
                        {analyticsTimeSeries.budgetAllocation.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                        }}
                        formatter={(value, name, props) => [`$${formatNumber(value)}`, props.payload.name]}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
)


export const PlatformEngagementChart = () => (
    <Card className="flex flex-col">
        <CardHeader className="p-3">
            <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                Engagement by Platform
            </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsTimeSeries.platformEngagement}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="platform" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                        }}
                        formatter={(value) => formatNumber(value)}
                    />
                    <Legend />
                    <Bar dataKey="engagement" fill="#3b82f6" name="Engagement" />
                    <Bar dataKey="reach" fill="#8b5cf6" name="Reach" />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
)


export const ROIByDomainChart = () => (
    <Card className="flex flex-col">
        <CardHeader className="p-3">
            <CardTitle className="text-sm flex items-center gap-2">
                <Target className="h-4 w-4 text-orange-500" />
                ROI by Domain
            </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsTimeSeries.roiByDomain} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis type="number" className="text-xs" />
                    <YAxis dataKey="domain" type="category" className="text-xs" width={80} />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                        }}
                        formatter={(value) => `${value}x`}
                    />
                    <Bar dataKey="roi" fill="#10b981" name="ROI" />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
)


export const BusinessAnalytics = () => (
    <div className="h-full overflow-hidden">
        <div className="h-full flex flex-col p-6 max-w-[1600px] mx-auto">
            {}
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold">Analytics Dashboard</h2>
                    <p className="text-sm text-muted-foreground">
                        Campaign performance and creator partnerships insights
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportAnalyticsToPDF(mockCampaigns, mockCreators)}
                        className="gap-2"
                    >
                        <FileText className="h-4 w-4" />
                        Export PDF
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportAnalyticsToCSV(mockCampaigns, mockCreators)}
                        className="gap-2"
                    >
                        <FileSpreadsheet className="h-4 w-4" />
                        Export CSV
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => exportAnalyticsToExcel(mockCampaigns, mockCreators)}
                        className="gap-2"
                    >
                        <Download className="h-4 w-4" />
                        Export Excel
                    </Button>
                </div>
            </div>

            {}
            <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
                <CampaignPerformanceChart />
                <PlatformEngagementChart />
                <BudgetAllocationChart />
                <ROIByDomainChart />
            </div>
        </div>
    </div>
)
