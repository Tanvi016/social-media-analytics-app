import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { toPng } from 'html-to-image'; 


const captureChartImage = async (elementId) => {
    const element = document.getElementById(elementId);
    if (!element) return null;

    try {
        
        element.style.background = 'white';

        const dataUrl = await toPng(element, {
            quality: 1.0,     
            pixelRatio: 4,    
            backgroundColor: '#ffffff',
            style: {
                
                
                layout: 'fixed',
            }
        });

        
        const img = new Image();
        img.src = dataUrl;
        await new Promise(r => img.onload = r);

        return {
            imgData: dataUrl,
            width: img.width,
            height: img.height,
            ratio: img.width / img.height
        };
    } catch (error) {
        console.error('Chart capture failed:', error);
        return null;
    }
};

export const exportCreatorDashboardToPDF = async (creatorData, chartIds = []) => {
    
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);

    let yPos = 20;

    
    doc.setFontSize(24);
    doc.setTextColor(15, 23, 42);
    doc.text('Creator Performance Report', margin, yPos);

    doc.setFontSize(10);
    doc.setTextColor(100, 113, 133);
    yPos += 6;
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPos);
    yPos += 15;

    
    autoTable(doc, {
        startY: yPos,
        head: [['Creator Name', 'Total Followers', 'Engagement', 'Projects']],
        body: [[
            creatorData.name || 'Unknown',
            creatorData.totalFollowers?.toLocaleString() || '-',
            `${creatorData.avgEngagement || 0}%`,
            creatorData.projectsCompleted || 0
        ]],
        theme: 'plain',
        styles: { fontSize: 11, cellPadding: 3 },
        headStyles: { fillColor: [241, 245, 249], textColor: 33, fontStyle: 'bold' },
    });

    yPos = doc.lastAutoTable.finalY + 15;

    
    if (chartIds.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor(33, 33, 33);
        doc.text('Analytics Visualization', margin, yPos);
        yPos += 10;

        for (const chartId of chartIds) {
            const chartObj = await captureChartImage(chartId);

            if (chartObj) {
                
                const imgHeight = contentWidth / chartObj.ratio;

                
                if (yPos + imgHeight > pageHeight - margin) {
                    doc.addPage();
                    yPos = 20;
                }

                
                doc.addImage(
                    chartObj.imgData,
                    'PNG',
                    margin,
                    yPos,
                    contentWidth,
                    imgHeight,
                    null,
                    'NONE' 
                );

                yPos += imgHeight + 10;
            }
        }
    }

    
    if (creatorData.revenue) {
        if (yPos + 40 > pageHeight) {
            doc.addPage();
            yPos = 20;
        }

        doc.setFontSize(14);
        doc.text('Revenue Breakdown', margin, yPos);
        yPos += 5;

        autoTable(doc, {
            startY: yPos,
            head: [['Period', 'Earnings', 'Deal Count']],
            body: [
                ['This Month', `$${creatorData.revenue.thisMonth?.toLocaleString()}`, creatorData.revenue.monthlyProjects],
                ['Last Month', `$${creatorData.revenue.lastMonth?.toLocaleString()}`, creatorData.revenue.lastMonthProjects],
                ['YTD Total', `$${creatorData.revenue.yearlyTotal?.toLocaleString()}`, creatorData.revenue.yearlyProjects],
            ],
            theme: 'grid',
            headStyles: { fillColor: [16, 185, 129] },
            styles: { fontSize: 10, cellPadding: 4 }
        });
    }

    doc.save(`Creator_Report_HD_${Date.now()}.pdf`);
};


export const exportCreatorMetricsToCSV = (creatorData) => {
    const csvData = [
        ['Creator Performance Report'],
        ['Generated on', new Date().toLocaleDateString()],
        [''],
        ['Creator Information'],
        ['Name', creatorData.name || 'N/A'],
        ['Total Followers', creatorData.totalFollowers || 0],
        ['Projects Completed', creatorData.projectsCompleted || 0],
        ['Average Engagement', `${creatorData.avgEngagement || 0}%`],
        [''],
        ['Performance Metrics'],
        ['Metric', 'Value'],
        ['Total Reach', creatorData.metrics?.totalReach || 0],
        ['Engagement Rate', `${creatorData.metrics?.engagementRate || 0}%`],
        ['Content Posted', creatorData.metrics?.contentPosted || 0],
        ['Average Views', creatorData.metrics?.avgViews || 0],
        [''],
        ['Platform Performance'],
        ['Platform', 'Followers', 'Engagement', 'Posts']
    ]

    if (creatorData.platforms) {
        Object.entries(creatorData.platforms).forEach(([platform, data]) => {
            csvData.push([
                platform,
                data.followers || 0,
                `${data.engagement || 0}%`,
                data.posts || 0
            ])
        })
    }

    const csv = csvData.map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `creator_metrics_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
}


export const exportCreatorDataToExcel = (creatorData) => {
    const workbook = XLSX.utils.book_new()

    
    const overviewData = [
        ['Creator Performance Report'],
        [''],
        ['Creator Information'],
        ['Name', creatorData.name || 'N/A'],
        ['Total Followers', creatorData.totalFollowers || 0],
        ['Projects Completed', creatorData.projectsCompleted || 0],
        ['Average Engagement', creatorData.avgEngagement || 0],
        ['Report Date', new Date().toLocaleDateString()]
    ]
    const overviewSheet = XLSX.utils.aoa_to_sheet(overviewData)
    XLSX.utils.book_append_sheet(workbook, overviewSheet, 'Overview')

    
    const metricsData = [
        ['Performance Metrics'],
        ['Metric', 'Value'],
        ['Total Reach', creatorData.metrics?.totalReach || 0],
        ['Engagement Rate (%)', creatorData.metrics?.engagementRate || 0],
        ['Content Posted', creatorData.metrics?.contentPosted || 0],
        ['Average Views', creatorData.metrics?.avgViews || 0]
    ]
    const metricsSheet = XLSX.utils.aoa_to_sheet(metricsData)
    XLSX.utils.book_append_sheet(workbook, metricsSheet, 'Metrics')

    
    if (creatorData.platforms) {
        const platformData = [
            ['Platform Performance'],
            ['Platform', 'Followers', 'Engagement (%)', 'Posts'],
            ...Object.entries(creatorData.platforms).map(([platform, data]) => [
                platform,
                data.followers || 0,
                data.engagement || 0,
                data.posts || 0
            ])
        ]
        const platformSheet = XLSX.utils.aoa_to_sheet(platformData)
        XLSX.utils.book_append_sheet(workbook, platformSheet, 'Platforms')
    }

    
    if (creatorData.revenue) {
        const revenueData = [
            ['Revenue Summary'],
            ['Period', 'Earnings ($)', 'Projects'],
            ['This Month', creatorData.revenue.thisMonth || 0, creatorData.revenue.monthlyProjects || 0],
            ['Last Month', creatorData.revenue.lastMonth || 0, creatorData.revenue.lastMonthProjects || 0],
            ['Total (Year)', creatorData.revenue.yearlyTotal || 0, creatorData.revenue.yearlyProjects || 0]
        ]
        const revenueSheet = XLSX.utils.aoa_to_sheet(revenueData)
        XLSX.utils.book_append_sheet(workbook, revenueSheet, 'Revenue')
    }

    
    XLSX.writeFile(workbook, `creator_dashboard_${new Date().toISOString().split('T')[0]}.xlsx`)
}


