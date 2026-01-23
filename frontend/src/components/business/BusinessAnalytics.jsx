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
    <Card className="flex flex-col min-h-[350px]">
        <CardHeader className="p-3">
            <CardTitle className="text-sm flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                Campaign Performance Trends
            </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analyticsTimeSeries.campaignPerformance} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted opacity-50" />
                    <XAxis
                        dataKey="month"
                        className="text-xs"
                        axisLine={false}
                        tickLine={false}
                        dy={10}
                    />
                    <YAxis
                        className="text-xs"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => formatNumber(value)}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Line
                        type="monotone"
                        dataKey="reach"
                        stroke="#8b5cf6"
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                        name="Reach"
                    />
                    <Line
                        type="monotone"
                        dataKey="engagement"
                        stroke="#3b82f6"
                        strokeWidth={3}
                        dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                        activeDot={{ r: 6, strokeWidth: 0 }}
                        name="Engagement"
                    />
                </LineChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
)


const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 25;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill={COLORS[index % COLORS.length]}
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            className="text-[11px] font-bold"
        >
            {`${(percent * 100).toFixed(1)}%`}
        </text>
    );
};

export const BudgetAllocationChart = () => (
    <Card className="flex flex-col min-h-[350px]">
        <CardHeader className="p-3">
            <CardTitle className="text-sm flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-green-500" />
                Budget Allocation by Domain
            </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-1">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <Pie
                        data={analyticsTimeSeries.budgetAllocation}
                        cx="42%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={85}
                        paddingAngle={2}
                        fill="#8884d8"
                        dataKey="value"
                        labelLine={{ stroke: '#94a3b8', strokeWidth: 1 }}
                        label={renderCustomizedLabel}
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
                    <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        wrapperStyle={{ paddingLeft: '10px' }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
)


export const PlatformEngagementChart = () => (
    <Card className="flex flex-col min-h-[350px]">
        <CardHeader className="p-3">
            <CardTitle className="text-sm flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                Engagement by Platform
            </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsTimeSeries.platformEngagement} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted opacity-50" />
                    <XAxis
                        dataKey="platform"
                        className="text-xs"
                        axisLine={false}
                        tickLine={false}
                        dy={10}
                    />
                    <YAxis
                        className="text-xs"
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => formatNumber(value)}
                    />
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                        contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                        formatter={(value) => formatNumber(value)}
                    />
                    <Legend verticalAlign="top" height={36} />
                    <Bar dataKey="engagement" fill="#3b82f6" name="Engagement" radius={[4, 4, 0, 0]} barSize={24} />
                    <Bar dataKey="reach" fill="#8b5cf6" name="Reach" radius={[4, 4, 0, 0]} barSize={24} />
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
)


export const ROIByDomainChart = () => (
    <Card className="flex flex-col min-h-[350px]">
        <CardHeader className="p-3">
            <CardTitle className="text-sm flex items-center gap-2">
                <Target className="h-4 w-4 text-orange-500" />
                ROI by Domain
            </CardTitle>
        </CardHeader>
        <CardContent className="p-3 pt-0 flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsTimeSeries.roiByDomain} layout="vertical" margin={{ top: 5, right: 35, left: 10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} className="stroke-muted opacity-50" />
                    <XAxis type="number" className="text-xs" axisLine={false} tickLine={false} />
                    <YAxis
                        dataKey="domain"
                        type="category"
                        className="text-xs font-medium"
                        width={80}
                        axisLine={false}
                        tickLine={false}
                    />
                    <Tooltip
                        cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
                        contentStyle={{
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                        }}
                        formatter={(value) => `${value}x`}
                    />
                    <Bar dataKey="roi" fill="#10b981" name="ROI" radius={[0, 4, 4, 0]} barSize={20}>
                        {analyticsTimeSeries.roiByDomain.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </CardContent>
    </Card>
)


export const BusinessAnalytics = () => (
    <div className="max-w-[1600px] mx-auto pb-6">
        <div className="mb-4 flex items-center justify-between">
            <div>
                <h2 className="text-xl font-bold">Analytics Dashboard</h2>
                <p className="text-sm text-muted-foreground">
                    Insights generated from campaign ROI, reach efficiency, and creator performance
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

        <div className="grid grid-cols-2 gap-4">
            <CampaignPerformanceChart />
            <PlatformEngagementChart />
            <BudgetAllocationChart />
            <ROIByDomainChart />
        </div>
    </div>
)
