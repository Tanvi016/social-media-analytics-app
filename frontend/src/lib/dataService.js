import { creatorApi } from '@/api/creatorApi';
import { businessApi } from '@/api/businessApi';
import { userProfiles, getFallbackProfile } from '@/data/userMockData';
import { businessProfile as businessMock } from '@/data/businessMockData';
import { kpiData, followerGrowth, engagementTrends30Days, engagementTrends90Days, followerGrowthTimeline, audienceType, platformAudienceBehavior } from '@/data/mockData';

export const dataService = {
    async getOverview(creatorId, platform, timeRange, username) {
        try {
            const data = await creatorApi.getOverview(creatorId, platform, timeRange);
            return data;
        } catch (error) {
            console.warn(`API failed for ${username}, using fallback mock data.`);

            // Derive fallback from userProfiles if possible
            const profile = userProfiles[username] || getFallbackProfile(username);

            // Scale mock data based on user stats for variety
            const scale = (profile.stats.total_likes / 145230) || 1;

            return {
                total_likes: Math.round(kpiData.totalLikes * scale),
                total_shares: Math.round(kpiData.totalShares * scale),
                total_views: Math.round(kpiData.totalReach * scale),
                // Add more as needed
            };
        }
    },

    async getTrends(creatorId, username) {
        try {
            const data = await creatorApi.getTrends(creatorId);
            return data;
        } catch (error) {
            const profile = userProfiles[username] || getFallbackProfile(username);
            const growth = profile.platforms.instagram?.growth || 5.0;

            return {
                facts: {
                    engagement_change: `${growth}%`,
                    top_platform: 'Instagram'
                }
            };
        }
    },

    async getProfileMetrics(creatorId, username) {
        try {
            const data = await creatorApi.getProfileMetrics(creatorId);
            // Format numeric values
            if (data.follower_count && typeof data.follower_count.value === 'number') {
                const val = data.follower_count.value;
                data.follower_count.value = val >= 1000 ? `${(val / 1000).toFixed(1)}K` : val.toString();
            }
            return data;
        } catch (error) {
            console.warn(`API failed for ${username} profile metrics, using fallback.`);
            const profile = userProfiles[username] || getFallbackProfile(username);
            const scale = (profile.stats.total_views / 892340) || 1;

            return {
                follower_count: {
                    value: profile.platforms.instagram?.followers >= 1000
                        ? `${(profile.platforms.instagram.followers / 1000).toFixed(1)}K`
                        : (profile.platforms.instagram?.followers || 0).toString(),
                    growth: `+${profile.platforms.instagram?.growth || 0}%`
                },
                engagement_rate: {
                    value: profile.stats.engagement_rate,
                    growth: '+2.1%'
                },
                audience_retention: { value: '96.8%', growth: '+0.8%' },
                audience_sentiment: { positive: 78.5, negative: 12.3, neutral: 9.2 },
                best_format: { name: 'Long-form Videos', performance: `${(12.3 * scale).toFixed(1)}%` },
            };
        }
    },

    async getAudienceInsights(creatorId, username) {
        try {
            const data = await creatorApi.getAudienceInsights(creatorId);
            return data;
        } catch (error) {
            console.warn(`API failed for ${username} audience insights, using fallback.`);
            const profile = userProfiles[username] || getFallbackProfile(username);
            const scale = (profile.stats.total_views / 892340) || 1;

            const timeline = {};
            Object.keys(followerGrowthTimeline).forEach(p => {
                timeline[p] = followerGrowthTimeline[p].map(item => ({
                    month: item.month,
                    followers: Math.round(item.followers * scale)
                }));
            });

            return {
                growth_timeline: timeline,
                composition: audienceType,
                behavior: platformAudienceBehavior
            };
        }
    },

    async getMonetizationMetrics(creatorId, username) {
        try {
            const data = await creatorApi.getMonetization(creatorId);
            return data;
        } catch (error) {
            console.warn(`API failed for ${username} monetization, using fallback.`);
            const profile = userProfiles[username] || getFallbackProfile(username);
            const scale = (profile.stats.total_views / 892340) || 1;

            return {
                revenue: {
                    total: Math.round(8700 * scale),
                    growth: 6.2,
                    platforms: {
                        instagram: Math.round(2890 * scale),
                        youtube: Math.round(4250 * scale),
                        facebook: Math.round(1560 * scale)
                    }
                },
                content_performance: [
                    { type: 'Long-form Videos', revenue: Math.round(4100 * scale), conversion: 5.8, platform: 'YouTube' },
                    { type: 'Reels', revenue: Math.round(3200 * scale), conversion: 4.2, platform: 'Instagram' },
                    { type: 'Carousels', revenue: Math.round(1800 * scale), conversion: 3.1, platform: 'Instagram' }
                ]
            };
        }
    },

    async getBusinessProfile(userId) {
        try {
            const data = await businessApi.getProfile(userId);
            return data;
        } catch (error) {
            console.warn("API failed for business profile, using fallback.");
            return businessMock;
        }
    },

    // Pass through mock data imports but could be made dynamic
    getFollowerGrowth(username) {
        const profile = userProfiles[username] || getFallbackProfile(username);
        // Map profile platforms to the format expected by OverviewAnalytics
        const growth = {};
        Object.entries(profile.platforms).forEach(([p, data]) => {
            growth[p.toLowerCase()] = {
                current: data.followers,
                previous: Math.round(data.followers / (1 + data.growth / 100)),
                growth: data.growth
            };
        });
        return growth;
    }
};
