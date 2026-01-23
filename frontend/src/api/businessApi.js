const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const businessApi = {
    async getProfile(userId) {
        const response = await fetch(`${API_BASE_URL}/api/business/profile?user_id=${userId}`);
        if (!response.ok) throw new Error('Failed to fetch business profile');
        return response.json();
    }
};
