
export const userProfiles = {
    'demo_user': {
        id: '95563f19-3466-48c9-a05b-540220aa6d2b',
        name: 'John Doe',
        bio: 'Tech enthusiast and content creator.',
        niche: { primary: 'Tech', secondary: ['AI', 'SaaS'] },
        stats: {
            total_likes: 145230,
            total_shares: 23450,
            total_views: 892340,
            engagement_rate: '8.5%'
        },
        platforms: {
            instagram: { followers: 45230, growth: 4.9 },
            youtube: { followers: 128900, growth: 2.9 },
            facebook: { followers: 67450, growth: -1.1 }
        }
    },
    'sarah_c': {
        id: 'sarah-id-123',
        name: 'Sarah Creator',
        bio: 'Lifestyle and travel vlogger.',
        niche: { primary: 'Lifestyle', secondary: ['Travel', 'Fashion'] },
        stats: {
            total_likes: 285400,
            total_shares: 12100,
            total_views: 1540000,
            engagement_rate: '12.2%'
        },
        platforms: {
            instagram: { followers: 120500, growth: 8.2 },
            youtube: { followers: 85000, growth: 5.4 },
            tiktok: { followers: 230000, growth: 15.1 }
        }
    },
    'tech_guru': {
        id: 'tech-id-456',
        name: 'Alex Tech Explorer',
        bio: 'Breaking down complex tech for everyone.',
        niche: { primary: 'Education', secondary: ['Tech', 'Coding'] },
        stats: {
            total_likes: 56000,
            total_shares: 45000,
            total_views: 520000,
            engagement_rate: '15.5%'
        },
        platforms: {
            youtube: { followers: 45000, growth: 12.8 },
            twitter: { followers: 15000, growth: 4.5 },
            linkedin: { followers: 8000, growth: 2.1 }
        }
    }
};

export const getFallbackProfile = (username) => ({
    id: `fallback-${username}`,
    name: username.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    bio: `Content creator specializing in various domains.`,
    niche: { primary: 'General', secondary: ['Content Creation'] },
    stats: {
        total_likes: 10000,
        total_shares: 1000,
        total_views: 50000,
        engagement_rate: '5.0%'
    },
    platforms: {
        instagram: { followers: 5000, growth: 2.5 }
    }
});
