import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import html2canvas from 'html2canvas'


const captureChartAsImage = async (elementId) => {
    const element = document.getElementById(elementId)
    if (!element) return null

    try {
        const canvas = await html2canvas(element, {
            backgroundColor: '#ffffff',
            scale: 2
        })
        return canvas.toDataURL('image/png')
    } catch (error) {
        console.error('Error capturing chart:', error)
        return null
    }
}


export const exportCreatorToPDF = async (creator) => {
    const doc = new jsPDF()

    
    doc.setFontSize(20)
    doc.setTextColor(139, 92, 246) 
    doc.text(`${creator.name} - Analytics Report`, 14, 20)

    
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 28)

    
    doc.setFillColor(249, 250, 251)
    doc.rect(14, 35, 182, 25, 'F')
    doc.setFontSize(11)
    doc.setTextColor(0, 0, 0)
    doc.text(`Username: ${creator.username}`, 20, 43)
    doc.text(`Followers: ${creator.followers.toLocaleString()}`, 20, 50)
    doc.text(`Tier: ${creator.tier}`, 120, 43)
    doc.text(`Region: ${creator.region}`, 120, 50)

    if (creator.analytics) {
        let yPos = 70

        
        doc.setFontSize(14)
        doc.setTextColor(16, 185, 129) 
        doc.text('Revenue & ROI Statistics', 14, yPos)
        yPos += 5

        doc.autoTable({
            startY: yPos,
            head: [['Metric', 'Value']],
            body: [
                ['Estimated ROI', `${creator.analytics.revenue.estimatedROI}x`],
                ['Conversion Rate', `${creator.analytics.revenue.averageConversionRate}%`],
                ['Revenue Per Campaign', `$${creator.analytics.revenue.revenuePerCampaign.toLocaleString()}`],
                ['CPM', `$${creator.analytics.revenue.costPerThousandReach}`]
            ],
            headStyles: { fillColor: [16, 185, 129] },
            margin: { left: 14, right: 14 }
        })

        yPos = doc.lastAutoTable.finalY + 10

        
        doc.setFontSize(14)
        doc.setTextColor(245, 158, 11) 
        doc.text('Engagement Quality', 14, yPos)
        yPos += 5

        doc.autoTable({
            startY: yPos,
            head: [['Metric', 'Value']],
            body: [
                ['Engagement Rate', `${creator.analytics.engagementQuality.engagementRate}%`],
                ['Bot Score', `${creator.analytics.engagementQuality.botScore}/10 (Lower is better)`],
                ['Save Rate', `${creator.analytics.engagementQuality.saveRate}%`],
                ['Share Rate', `${creator.analytics.engagementQuality.shareRate}%`],
                ['Likes/Comments Ratio', `${creator.analytics.engagementQuality.likesCommentsRatio}`]
            ],
            headStyles: { fillColor: [245, 158, 11] },
            margin: { left: 14, right: 14 }
        })

        
        doc.addPage()
        yPos = 20

        
        doc.setFontSize(14)
        doc.setTextColor(16, 185, 129)
        doc.text('Growth Trajectory', 14, yPos)
        yPos += 5

        doc.autoTable({
            startY: yPos,
            head: [['Period', 'Growth %', 'Status']],
            body: [
                ['Last Week', `${creator.analytics.growth.lastWeek}%`, ''],
                ['Last Month', `${creator.analytics.growth.lastMonth}%`, ''],
                ['Last Year', `${creator.analytics.growth.lastYear}%`, ''],
                ['Projected', `${creator.analytics.growth.projectedGrowth}%`, creator.analytics.growth.trend.toUpperCase()]
            ],
            headStyles: { fillColor: [16, 185, 129] },
            margin: { left: 14, right: 14 }
        })

        yPos = doc.lastAutoTable.finalY + 10

        
        doc.setFontSize(14)
        doc.setTextColor(99, 102, 241) 
        doc.text('Follower Retention & Loyalty', 14, yPos)
        yPos += 5

        doc.autoTable({
            startY: yPos,
            head: [['Metric', 'Value', 'Rating']],
            body: [
                ['Retention Rate', `${creator.analytics.retention.followerRetentionRate}%`, 'Excellent'],
                ['Drop-off After Sponsored', `${creator.analytics.retention.dropOffAfterSponsored}%`, 'Low'],
                ['Unfollow Rate', `${creator.analytics.retention.unfollowRate}%`, 'Very Low'],
                ['Loyalty Score', `${creator.analytics.retention.loyaltyScore}/10`, 'High']
            ],
            headStyles: { fillColor: [99, 102, 241] },
            margin: { left: 14, right: 14 }
        })

        
        yPos = doc.lastAutoTable.finalY + 10
        if (yPos > 250) {
            doc.addPage()
            yPos = 20
        }

        doc.setFontSize(14)
        doc.setTextColor(59, 130, 246) 
        doc.text('Platform Performance', 14, yPos)
        yPos += 5

        const platformData = Object.entries(creator.analytics.platformPerformance).map(([platform, data]) => [
            platform.charAt(0).toUpperCase() + platform.slice(1),
            `${data.strength}/100`,
            `${data.engagement}%`,
            data.reach.toLocaleString()
        ])

        doc.autoTable({
            startY: yPos,
            head: [['Platform', 'Strength', 'Engagement', 'Reach']],
            body: platformData,
            headStyles: { fillColor: [59, 130, 246] },
            margin: { left: 14, right: 14 }
        })
    }

    
    doc.save(`${creator.username.replace('@', '')}_analytics_report.pdf`)
}


export const exportCreatorToCSV = (creator) => {
    if (!creator.analytics) return

    const csvData = [
        ['Creator Analytics Report'],
        ['Name', creator.name],
        ['Username', creator.username],
        ['Followers', creator.followers],
        ['Tier', creator.tier],
        ['Region', creator.region],
        [''],
        ['Revenue & ROI Statistics'],
        ['Metric', 'Value'],
        ['Estimated ROI', `${creator.analytics.revenue.estimatedROI}x`],
        ['Conversion Rate', `${creator.analytics.revenue.averageConversionRate}%`],
        ['Revenue Per Campaign', `$${creator.analytics.revenue.revenuePerCampaign}`],
        ['CPM', `$${creator.analytics.revenue.costPerThousandReach}`],
        [''],
        ['Engagement Quality'],
        ['Metric', 'Value'],
        ['Engagement Rate', `${creator.analytics.engagementQuality.engagementRate}%`],
        ['Bot Score', `${creator.analytics.engagementQuality.botScore}/10`],
        ['Save Rate', `${creator.analytics.engagementQuality.saveRate}%`],
        ['Share Rate', `${creator.analytics.engagementQuality.shareRate}%`],
        [''],
        ['Growth Trajectory'],
        ['Period', 'Growth %'],
        ['Last Week', `${creator.analytics.growth.lastWeek}%`],
        ['Last Month', `${creator.analytics.growth.lastMonth}%`],
        ['Last Year', `${creator.analytics.growth.lastYear}%`],
        ['Projected', `${creator.analytics.growth.projectedGrowth}%`]
    ]

    const csv = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${creator.username.replace('@', '')}_analytics.csv`
    a.click()
    window.URL.revokeObjectURL(url)
}


export const exportCreatorToExcel = (creator) => {
    if (!creator.analytics) return

    const workbook = XLSX.utils.book_new()

    
    const overviewData = [
        ['Creator Analytics Report'],
        [''],
        ['Name', creator.name],
        ['Username', creator.username],
        ['Followers', creator.followers],
        ['Tier', creator.tier],
        ['Region', creator.region]
    ]
    const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData)
    XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Overview')

    
    const revenueData = [
        ['Revenue & ROI Statistics'],
        ['Metric', 'Value'],
        ['Estimated ROI', creator.analytics.revenue.estimatedROI],
        ['Conversion Rate (%)', creator.analytics.revenue.averageConversionRate],
        ['Revenue Per Campaign ($)', creator.analytics.revenue.revenuePerCampaign],
        ['CPM ($)', creator.analytics.revenue.costPerThousandReach]
    ]
    const revenueSheet = XLSX.utils.aoa_to_sheet(revenueData)
    XLSX.utils.book_append_sheet(workbook, revenueSheet, 'Revenue')

    
    const engagementData = [
        ['Engagement Quality'],
        ['Metric', 'Value'],
        ['Engagement Rate (%)', creator.analytics.engagementQuality.engagementRate],
        ['Bot Score', creator.analytics.engagementQuality.botScore],
        ['Save Rate (%)', creator.analytics.engagementQuality.saveRate],
        ['Share Rate (%)', creator.analytics.engagementQuality.shareRate]
    ]
    const engagementSheet = XLSX.utils.aoa_to_sheet(engagementData)
    XLSX.utils.book_append_sheet(workbook, engagementSheet, 'Engagement')

    
    const growthData = [
        ['Growth Trajectory'],
        ['Period', 'Growth (%)'],
        ['Last Week', creator.analytics.growth.lastWeek],
        ['Last Month', creator.analytics.growth.lastMonth],
        ['Last Year', creator.analytics.growth.lastYear],
        ['Projected', creator.analytics.growth.projectedGrowth]
    ]
    const growthSheet = XLSX.utils.aoa_to_sheet(growthData)
    XLSX.utils.book_append_sheet(workbook, growthSheet, 'Growth')

    
    XLSX.writeFile(workbook, `${creator.username.replace('@', '')}_analytics.xlsx`)
}


export const exportCampaignToPDF = (campaign) => {
    const doc = new jsPDF()

    
    doc.setFontSize(20)
    doc.setTextColor(245, 158, 11) 
    doc.text('Campaign Report', 14, 20)

    
    doc.setFontSize(10)
    doc.setTextColor(100, 100, 100)
    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 14, 28)

    
    doc.setFillColor(254, 243, 199) 
    doc.rect(14, 35, 182, 35, 'F')
    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text(`Campaign: ${campaign.name}`, 20, 43)
    doc.text(`Creator: ${campaign.creatorName}`, 20, 51)
    doc.text(`Status: ${campaign.status}`, 120, 43)
    doc.setFontSize(11)
    doc.text(`Period: ${campaign.startDate} to ${campaign.endDate}`, 20, 59)
    doc.text(`Budget: $${campaign.budget.toLocaleString()} | Spent: $${campaign.spent.toLocaleString()}`, 20, 65)

    
    const budgetPercent = (campaign.spent / campaign.budget * 100).toFixed(1)
    doc.setFillColor(220, 220, 220)
    doc.rect(14, 80, 182, 10, 'F')
    doc.setFillColor(16, 185, 129)
    doc.rect(14, 80, 182 * (campaign.spent / campaign.budget), 10, 'F')
    doc.setFontSize(9)
    doc.setTextColor(0, 0, 0)
    doc.text(`${budgetPercent}% Budget Used`, 14, 95)

    
    doc.setFontSize(14)
    doc.setTextColor(59, 130, 246) 
    doc.text('Campaign Performance Metrics', 14, 110)

    doc.autoTable({
        startY: 115,
        head: [['Metric', 'Value', 'Performance']],
        body: [
            ['Reach', campaign.metrics.reach.toLocaleString(), 'Total audience reached'],
            ['Engagement', campaign.metrics.engagement.toLocaleString(), `${((campaign.metrics.engagement / campaign.metrics.reach) * 100).toFixed(2)}% engagement rate`],
            ['Conversions', campaign.metrics.conversions.toLocaleString(), `${((campaign.metrics.conversions / campaign.metrics.reach) * 100).toFixed(2)}% conversion rate`],
            ['ROI', `${campaign.metrics.roi}x`, `$${(campaign.spent * campaign.metrics.roi).toLocaleString()} estimated return`]
        ],
        headStyles: { fillColor: [59, 130, 246] },
        margin: { left: 14, right: 14 }
    })

    
    const finalY = doc.lastAutoTable.finalY + 10
    doc.setFontSize(14)
    doc.setTextColor(139, 92, 246) 
    doc.text('Key Insights', 14, finalY)

    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    let insightY = finalY + 8

    const insights = [
        `• Campaign has spent ${budgetPercent}% of allocated budget`,
        `• Achieved ${campaign.metrics.roi}x return on investment`,
        `• Conversion rate of ${((campaign.metrics.conversions / campaign.metrics.reach) * 100).toFixed(2)}% indicates ${campaign.metrics.conversions > 1000 ? 'strong' : 'moderate'} performance`,
        `• Total reach of ${campaign.metrics.reach.toLocaleString()} impressions`,
        `• Status: ${campaign.status}`
    ]

    insights.forEach(insight => {
        doc.text(insight, 20, insightY)
        insightY += 7
    })

    doc.save(`campaign_${campaign.id}_report.pdf`)
}


export const exportCampaignToCSV = (campaign) => {
    const csvData = [
        ['Campaign Report'],
        ['Campaign Name', campaign.name],
        ['Creator', campaign.creatorName],
        ['Status', campaign.status],
        ['Budget', campaign.budget],
        ['Spent', campaign.spent],
        [''],
        ['Metrics'],
        ['Metric', 'Value'],
        ['Reach', campaign.metrics.reach],
        ['Engagement', campaign.metrics.engagement],
        ['Conversions', campaign.metrics.conversions],
        ['ROI', campaign.metrics.roi]
    ]

    const csv = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `campaign_${campaign.id}_report.csv`
    a.click()
    window.URL.revokeObjectURL(url)
}


export const exportCampaignToExcel = (campaign) => {
    const workbook = XLSX.utils.book_new()

    const data = [
        ['Campaign Report'],
        [''],
        ['Campaign Name', campaign.name],
        ['Creator', campaign.creatorName],
        ['Status', campaign.status],
        ['Budget ($)', campaign.budget],
        ['Spent ($)', campaign.spent],
        [''],
        ['Metrics'],
        ['Metric', 'Value'],
        ['Reach', campaign.metrics.reach],
        ['Engagement', campaign.metrics.engagement],
        ['Conversions', campaign.metrics.conversions],
        ['ROI', campaign.metrics.roi]
    ]

    const sheet = XLSX.utils.aoa_to_sheet(data)
    XLSX.utils.book_append_sheet(workbook, sheet, 'Campaign Report')

    XLSX.writeFile(workbook, `campaign_${campaign.id}_report.xlsx`)
}


export const exportAnalyticsToPDF = (campaigns, creators) => {
    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.text('Business Analytics Report', 14, 20)

    
    doc.setFontSize(14)
    doc.text('Summary', 14, 35)
    doc.autoTable({
        startY: 40,
        head: [['Metric', 'Value']],
        body: [
            ['Total Campaigns', campaigns.length],
            ['Total Creators', creators.length],
            ['Total Budget', `$${campaigns.reduce((sum, c) => sum + c.budget, 0).toLocaleString()}`],
            ['Total Spent', `$${campaigns.reduce((sum, c) => sum + c.spent, 0).toLocaleString()}`]
        ]
    })

    
    let finalY = doc.lastAutoTable.finalY + 10
    doc.text('Campaign Performance', 14, finalY)
    doc.autoTable({
        startY: finalY + 5,
        head: [['Campaign', 'Budget', 'Spent', 'ROI']],
        body: campaigns.map(c => [
            c.name,
            `$${c.budget.toLocaleString()}`,
            `$${c.spent.toLocaleString()}`,
            `${c.metrics.roi}x`
        ])
    })

    doc.save('business_analytics_report.pdf')
}


export const exportAnalyticsToCSV = (campaigns, creators) => {
    const csvData = [
        ['Business Analytics Report'],
        [''],
        ['Summary'],
        ['Total Campaigns', campaigns.length],
        ['Total Creators', creators.length],
        ['Total Budget', campaigns.reduce((sum, c) => sum + c.budget, 0)],
        ['Total Spent', campaigns.reduce((sum, c) => sum + c.spent, 0)],
        [''],
        ['Campaign Performance'],
        ['Campaign', 'Budget', 'Spent', 'ROI'],
        ...campaigns.map(c => [c.name, c.budget, c.spent, c.metrics.roi])
    ]

    const csv = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'business_analytics_report.csv'
    a.click()
    window.URL.revokeObjectURL(url)
}


export const exportAnalyticsToExcel = (campaigns, creators) => {
    const workbook = XLSX.utils.book_new()

    
    const summaryData = [
        ['Business Analytics Report'],
        [''],
        ['Summary'],
        ['Total Campaigns', campaigns.length],
        ['Total Creators', creators.length],
        ['Total Budget ($)', campaigns.reduce((sum, c) => sum + c.budget, 0)],
        ['Total Spent ($)', campaigns.reduce((sum, c) => sum + c.spent, 0)]
    ]
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData)
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary')

    
    const campaignsData = [
        ['Campaign Performance'],
        ['Campaign', 'Creator', 'Budget', 'Spent', 'Reach', 'Engagement', 'Conversions', 'ROI'],
        ...campaigns.map(c => [
            c.name,
            c.creatorName,
            c.budget,
            c.spent,
            c.metrics.reach,
            c.metrics.engagement,
            c.metrics.conversions,
            c.metrics.roi
        ])
    ]
    const campaignsSheet = XLSX.utils.aoa_to_sheet(campaignsData)
    XLSX.utils.book_append_sheet(workbook, campaignsSheet, 'Campaigns')

    XLSX.writeFile(workbook, 'business_analytics_report.xlsx')
}
