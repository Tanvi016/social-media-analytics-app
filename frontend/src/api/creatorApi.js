const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const creatorApi = {
    async getOverview(creatorId, platform = null, dateRange = '30d') {
        const params = new URLSearchParams({ creator_id: creatorId });
        if (platform && platform !== 'all') params.append('platform', platform);
        if (dateRange) params.append('date_range', dateRange);

        const response = await fetch(`${API_BASE_URL}/api/dashboard/overview?${params}`);
        if (!response.ok) throw new Error('Failed to fetch overview metrics');
        return response.json();
    },

    async getTrends(creatorId) {
        const response = await fetch(`${API_BASE_URL}/api/dashboard/trends?creator_id=${creatorId}`);
        if (!response.ok) throw new Error('Failed to fetch trends');
        return response.json();
    },

    async getProfileMetrics(creatorId) {
        const response = await fetch(`${API_BASE_URL}/api/creator/profile-metrics?creator_id=${creatorId}`);
        if (!response.ok) throw new Error('Failed to fetch profile metrics');
        return response.json();
    },

    async getAudienceInsights(creatorId) {
        const response = await fetch(`${API_BASE_URL}/api/creator/audience-insights?creator_id=${creatorId}`);
        if (!response.ok) throw new Error('Failed to fetch audience insights');
        return response.json();
    },

    async getMonetization(creatorId) {
        const response = await fetch(`${API_BASE_URL}/api/creator/monetization?creator_id=${creatorId}`);
        if (!response.ok) throw new Error('Failed to fetch monetization metrics');
        return response.json();
    }
};
