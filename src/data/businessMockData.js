

export const mockCreators = [
    {
        id: 1,
        name: "Sarah Johnson",
        username: "@sarahfitness",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        domain: ["Health", "Gym Products"],
        region: "North America",
        tier: "Top-tier",
        followers: 850000,
        bio: "Fitness coach & wellness advocate. Helping you achieve your health goals 💪",
        verified: true,
        platforms: ["Instagram", "YouTube", "TikTok"],
        isUnlocked: true,
        location: {
            region: "North America",
            country: "United States",
            state: "California",
            place: "Los Angeles",
            coordinates: { lat: 34.0522, lng: -118.2437 }
        },
        analytics: {
            
            revenue: {
                estimatedROI: 3.2,
                averageConversionRate: 4.5,
                revenuePerCampaign: 45000,
                costPerThousandReach: 12.5
            },

            
            contentPerformance: {
                reels: { engagement: 8.5, reach: 125000, avgViews: 98000 },
                staticPosts: { engagement: 6.2, reach: 85000, avgViews: 72000 },
                carousels: { engagement: 7.1, reach: 95000, avgViews: 80000 },
                stories: { engagement: 5.8, reach: 65000, avgViews: 55000 },
                longFormVideo: { engagement: 9.2, reach: 145000, avgViews: 120000 }
            },

            
            sentiment: {
                positive: 78,
                neutral: 18,
                negative: 4,
                topKeywords: ["amazing", "inspiring", "authentic", "helpful", "motivating"],
                sentimentScore: 8.7
            },

            
            platformPerformance: {
                instagram: { strength: 100, reach: 850000, engagement: 8.5, followers: 850000 },
                youtube: { strength: 65, reach: 420000, engagement: 6.2, followers: 420000 },
                tiktok: { strength: 82, reach: 680000, engagement: 7.8, followers: 680000 }
            },

            
            engagementQuality: {
                engagementRate: 8.5,
                likesCommentsRatio: 15.2,
                averageCommentLength: 12,
                botScore: 2.3,
                saveRate: 4.2,
                shareRate: 3.1
            },

            
            retention: {
                followerRetentionRate: 94.5,
                dropOffAfterSponsored: 2.3,
                unfollowRate: 1.2,
                monthlyChurnRate: 1.5,
                loyaltyScore: 9.1
            },

            
            growth: {
                lastWeek: 2.3,
                lastMonth: 8.7,
                lastYear: 45.2,
                trend: "rising",
                projectedGrowth: 52.0,
                viralityScore: 7.8
            }
        },
        
        stats: {
            revenueEstimate: 45000,
            roi: 3.2,
            engagementRate: 8.5,
            bestPlatform: "Instagram",
            bestContentType: "Reels",
            audienceSentiment: { positive: 78, neutral: 18, negative: 4 },
            customerChurn: 12,
            followerGrowth: {
                week: 2.3,
                month: 8.7,
                year: 45.2
            },
            contentPerformance: {
                reels: 85,
                static: 62
            }
        }
    },
    {
        id: 2,
        name: "Tech Guru Mike",
        username: "@techguruMike",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        domain: ["Tech", "AI/ML"],
        region: "Asia",
        tier: "Top-tier",
        followers: 1200000,
        bio: "AI researcher & tech reviewer. Making complex tech simple 🤖",
        verified: true,
        platforms: ["YouTube", "LinkedIn", "Twitter"],
        isUnlocked: false,
        stats: null
    },
    {
        id: 3,
        name: "Beauty by Emma",
        username: "@beautybyemma",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
        domain: ["Skincare", "Makeup"],
        region: "Europe",
        tier: "Micro-influencer",
        followers: 125000,
        bio: "Skincare enthusiast & makeup artist. Natural beauty advocate ✨",
        verified: false,
        platforms: ["Instagram", "TikTok"],
        isUnlocked: true,
        location: {
            region: "Europe",
            country: "United Kingdom",
            state: "England",
            place: "London",
            coordinates: { lat: 51.5074, lng: -0.1278 }
        },
        analytics: {
            revenue: {
                estimatedROI: 4.1,
                averageConversionRate: 5.2,
                revenuePerCampaign: 8500,
                costPerThousandReach: 8.2
            },
            contentPerformance: {
                reels: { engagement: 10.2, reach: 48000, avgViews: 42000 },
                staticPosts: { engagement: 11.8, reach: 52000, avgViews: 45000 },
                carousels: { engagement: 13.5, reach: 58000, avgViews: 50000 },
                stories: { engagement: 9.1, reach: 38000, avgViews: 32000 },
                longFormVideo: { engagement: 8.5, reach: 35000, avgViews: 28000 }
            },
            sentiment: {
                positive: 85,
                neutral: 12,
                negative: 3,
                topKeywords: ["love", "gorgeous", "natural", "glowing", "perfect"],
                sentimentScore: 9.2
            },
            platformPerformance: {
                instagram: { strength: 100, reach: 125000, engagement: 12.3, followers: 125000 },
                tiktok: { strength: 88, reach: 98000, engagement: 10.8, followers: 98000 }
            },
            engagementQuality: {
                engagementRate: 12.3,
                likesCommentsRatio: 18.5,
                averageCommentLength: 15,
                botScore: 1.8,
                saveRate: 6.5,
                shareRate: 4.2
            },
            retention: {
                followerRetentionRate: 96.2,
                dropOffAfterSponsored: 1.5,
                unfollowRate: 0.8,
                monthlyChurnRate: 1.0,
                loyaltyScore: 9.5
            },
            growth: {
                lastWeek: 3.1,
                lastMonth: 12.4,
                lastYear: 68.9,
                trend: "rising",
                projectedGrowth: 85.0,
                viralityScore: 8.5
            }
        },
        stats: {
            revenueEstimate: 8500,
            roi: 4.1,
            engagementRate: 12.3,
            bestPlatform: "Instagram",
            bestContentType: "Carousels",
            audienceSentiment: { positive: 85, neutral: 12, negative: 3 },
            customerChurn: 8,
            followerGrowth: {
                week: 3.1,
                month: 12.4,
                year: 68.9
            },
            contentPerformance: {
                reels: 78,
                static: 88
            }
        }
    },
    {
        id: 4,
        name: "Chef Antonio",
        username: "@chefantonio",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Antonio",
        domain: ["Food Products", "Hospitality"],
        region: "Europe",
        tier: "Top-tier",
        followers: 650000,
        bio: "Professional chef & food critic. Exploring culinary excellence 👨‍🍳",
        verified: true,
        platforms: ["Instagram", "YouTube", "Facebook"],
        isUnlocked: false,
        location: {
            region: "Europe",
            country: "Italy",
            state: "Lazio",
            place: "Rome",
            coordinates: { lat: 41.9028, lng: 12.4964 }
        },
        stats: null
    },
    {
        id: 5,
        name: "Dr. Priya Sharma",
        username: "@drpriyahealth",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
        domain: ["Health", "Skincare"],
        region: "Asia",
        tier: "Micro-influencer",
        followers: 95000,
        bio: "Dermatologist & health educator. Science-backed skincare advice 🩺",
        verified: true,
        platforms: ["Instagram", "LinkedIn"],
        isUnlocked: true,
        location: {
            region: "Asia",
            country: "India",
            state: "Maharashtra",
            place: "Mumbai",
            coordinates: { lat: 19.0760, lng: 72.8777 }
        },
        stats: {
            revenueEstimate: 12000,
            roi: 3.8,
            engagementRate: 9.7,
            bestPlatform: "LinkedIn",
            bestContentType: "Static Posts",
            audienceSentiment: { positive: 92, neutral: 7, negative: 1 },
            customerChurn: 5,
            followerGrowth: {
                week: 2.8,
                month: 10.2,
                year: 52.3
            },
            contentPerformance: {
                reels: 72,
                static: 91
            }
        }
    },
    {
        id: 6,
        name: "EduTech Alex",
        username: "@edutechalex",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        domain: ["Education", "Tech"],
        region: "North America",
        tier: "Micro-influencer",
        followers: 180000,
        bio: "EdTech innovator & online educator. Learning made fun 📚",
        verified: false,
        platforms: ["YouTube", "LinkedIn", "Instagram"],
        isUnlocked: false,
        location: {
            region: "North America",
            country: "Canada",
            state: "Ontario",
            place: "Toronto",
            coordinates: { lat: 43.6532, lng: -79.3832 }
        },
        stats: null
    },
    {
        id: 7,
        name: "Travel Tales Lisa",
        username: "@traveltaleslisa",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
        domain: ["Hospitality"],
        region: "Europe",
        tier: "Top-tier",
        followers: 920000,
        bio: "Travel blogger & hospitality consultant. Discovering hidden gems 🌍",
        verified: true,
        platforms: ["Instagram", "YouTube", "TikTok"],
        isUnlocked: true,
        location: {
            region: "Europe",
            country: "France",
            state: "Île-de-France",
            place: "Paris",
            coordinates: { lat: 48.8566, lng: 2.3522 }
        },
        stats: {
            revenueEstimate: 38000,
            roi: 2.9,
            engagementRate: 7.2,
            bestPlatform: "Instagram",
            bestContentType: "Reels",
            audienceSentiment: { positive: 81, neutral: 16, negative: 3 },
            customerChurn: 15,
            followerGrowth: {
                week: 1.9,
                month: 6.8,
                year: 38.5
            },
            contentPerformance: {
                reels: 89,
                static: 68
            }
        }
    },
    {
        id: 8,
        name: "Fintech Fred",
        username: "@fintechfred",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fred",
        domain: ["Tech", "Fintech"],
        region: "North America",
        tier: "Micro-influencer",
        followers: 145000,
        bio: "Financial technology expert. Simplifying finance for everyone 💰",
        verified: false,
        platforms: ["LinkedIn", "Twitter", "YouTube"],
        isUnlocked: false,
        location: {
            region: "North America",
            country: "United States",
            state: "New York",
            place: "New York City",
            coordinates: { lat: 40.7128, lng: -74.0060 }
        },
        stats: null
    },
    
    {
        id: 9,
        name: "Yoga with Maya",
        username: "@yogawithmaya",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
        domain: ["Health", "Gym Products"],
        region: "North America",
        tier: "Micro-influencer",
        followers: 220000,
        bio: "Certified yoga instructor. Mind, body, and soul wellness 🧘‍♀️",
        verified: true,
        platforms: ["Instagram", "YouTube"],
        isUnlocked: true,
        location: {
            region: "North America",
            country: "United States",
            state: "California",
            place: "San Francisco",
            coordinates: { lat: 37.7749, lng: -122.4194 }
        },
        stats: {
            revenueEstimate: 18000,
            roi: 3.5,
            engagementRate: 11.2,
            bestPlatform: "Instagram",
            bestContentType: "Reels",
            audienceSentiment: { positive: 88, neutral: 10, negative: 2 },
            customerChurn: 7,
            followerGrowth: { week: 2.5, month: 9.3, year: 48.5 },
            contentPerformance: { reels: 86, static: 74 }
        }
    },
    {
        id: 10,
        name: "Tech Guru Sam",
        username: "@techgurusam",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam",
        domain: ["Tech", "Fintech"],
        region: "North America",
        tier: "Top-tier",
        followers: 1200000,
        bio: "Silicon Valley tech reviewer. Latest gadgets & innovations 📱",
        verified: true,
        platforms: ["YouTube", "Twitter", "Instagram"],
        isUnlocked: true,
        location: {
            region: "North America",
            country: "United States",
            state: "California",
            place: "San Diego",
            coordinates: { lat: 32.7157, lng: -117.1611 }
        },
        stats: {
            revenueEstimate: 85000,
            roi: 4.2,
            engagementRate: 6.8,
            bestPlatform: "YouTube",
            bestContentType: "Long Form Video",
            audienceSentiment: { positive: 75, neutral: 20, negative: 5 },
            customerChurn: 18,
            followerGrowth: { week: 1.8, month: 7.2, year: 42.0 },
            contentPerformance: { reels: 72, static: 58 }
        }
    },
    {
        id: 11,
        name: "Foodie Carlos",
        username: "@foodiecarlos",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
        domain: ["Food Products", "Hospitality"],
        region: "North America",
        tier: "Micro-influencer",
        followers: 340000,
        bio: "Food blogger & recipe creator. Bringing flavors to life 🍕",
        verified: false,
        platforms: ["Instagram", "TikTok"],
        isUnlocked: true,
        location: {
            region: "North America",
            country: "United States",
            state: "Texas",
            place: "Austin",
            coordinates: { lat: 30.2672, lng: -97.7431 }
        },
        stats: {
            revenueEstimate: 22000,
            roi: 3.1,
            engagementRate: 9.5,
            bestPlatform: "TikTok",
            bestContentType: "Reels",
            audienceSentiment: { positive: 82, neutral: 15, negative: 3 },
            customerChurn: 11,
            followerGrowth: { week: 3.2, month: 11.8, year: 58.3 },
            contentPerformance: { reels: 91, static: 68 }
        }
    },
    {
        id: 12,
        name: "Professor Kate",
        username: "@professorkate",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kate",
        domain: ["Education", "Tech"],
        region: "North America",
        tier: "Micro-influencer",
        followers: 175000,
        bio: "University professor & online educator. Making learning accessible 📖",
        verified: true,
        platforms: ["LinkedIn", "YouTube"],
        isUnlocked: true,
        location: {
            region: "North America",
            country: "Canada",
            state: "British Columbia",
            place: "Vancouver",
            coordinates: { lat: 49.2827, lng: -123.1207 }
        },
        stats: {
            revenueEstimate: 15000,
            roi: 2.8,
            engagementRate: 8.3,
            bestPlatform: "LinkedIn",
            bestContentType: "Static Posts",
            audienceSentiment: { positive: 91, neutral: 8, negative: 1 },
            customerChurn: 6,
            followerGrowth: { week: 2.1, month: 8.5, year: 44.2 },
            contentPerformance: { reels: 65, static: 89 }
        }
    },
    {
        id: 13,
        name: "Makeup Maven Jess",
        username: "@makeupmavenjess",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jess",
        domain: ["Skincare", "Makeup"],
        region: "North America",
        tier: "Top-tier",
        followers: 780000,
        bio: "Professional makeup artist. Beauty tutorials & product reviews 💄",
        verified: true,
        platforms: ["Instagram", "YouTube", "TikTok"],
        isUnlocked: true,
        location: {
            region: "North America",
            country: "United States",
            state: "Florida",
            place: "Miami",
            coordinates: { lat: 25.7617, lng: -80.1918 }
        },
        stats: {
            revenueEstimate: 52000,
            roi: 3.9,
            engagementRate: 10.8,
            bestPlatform: "Instagram",
            bestContentType: "Carousels",
            audienceSentiment: { positive: 86, neutral: 11, negative: 3 },
            customerChurn: 9,
            followerGrowth: { week: 2.7, month: 10.1, year: 55.8 },
            contentPerformance: { reels: 84, static: 92 }
        }
    },
    
    {
        id: 14,
        name: "Fitness Franz",
        username: "@fitnessfranz",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Franz",
        domain: ["Health", "Gym Products"],
        region: "Europe",
        tier: "Micro-influencer",
        followers: 285000,
        bio: "Personal trainer & nutrition coach. Transform your body 💪",
        verified: false,
        platforms: ["Instagram", "YouTube"],
        isUnlocked: true,
        location: {
            region: "Europe",
            country: "Germany",
            state: "Bavaria",
            place: "Munich",
            coordinates: { lat: 48.1351, lng: 11.5820 }
        },
        stats: {
            revenueEstimate: 19000,
            roi: 3.3,
            engagementRate: 9.8,
            bestPlatform: "Instagram",
            bestContentType: "Reels",
            audienceSentiment: { positive: 84, neutral: 13, negative: 3 },
            customerChurn: 10,
            followerGrowth: { week: 2.9, month: 10.7, year: 51.2 },
            contentPerformance: { reels: 87, static: 71 }
        }
    },
    {
        id: 15,
        name: "Tech Sophia",
        username: "@techsophia",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophia",
        domain: ["Tech", "Education"],
        region: "Europe",
        tier: "Micro-influencer",
        followers: 195000,
        bio: "Software engineer & coding instructor. Tech made simple 👩‍💻",
        verified: true,
        platforms: ["LinkedIn", "YouTube", "Twitter"],
        isUnlocked: true,
        location: {
            region: "Europe",
            country: "United Kingdom",
            state: "England",
            place: "Manchester",
            coordinates: { lat: 53.4808, lng: -2.2426 }
        },
        stats: {
            revenueEstimate: 16000,
            roi: 3.0,
            engagementRate: 7.9,
            bestPlatform: "LinkedIn",
            bestContentType: "Static Posts",
            audienceSentiment: { positive: 89, neutral: 9, negative: 2 },
            customerChurn: 7,
            followerGrowth: { week: 2.3, month: 9.1, year: 46.5 },
            contentPerformance: { reels: 68, static: 85 }
        }
    },
    {
        id: 16,
        name: "Gourmet Giorgio",
        username: "@gourmetgiorgio",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Giorgio",
        domain: ["Food Products", "Hospitality"],
        region: "Europe",
        tier: "Top-tier",
        followers: 890000,
        bio: "Michelin-trained chef. Authentic Italian cuisine 🍝",
        verified: true,
        platforms: ["Instagram", "YouTube", "Facebook"],
        isUnlocked: true,
        location: {
            region: "Europe",
            country: "Italy",
            state: "Tuscany",
            place: "Florence",
            coordinates: { lat: 43.7696, lng: 11.2558 }
        },
        stats: {
            revenueEstimate: 58000,
            roi: 3.7,
            engagementRate: 8.9,
            bestPlatform: "Instagram",
            bestContentType: "Reels",
            audienceSentiment: { positive: 87, neutral: 11, negative: 2 },
            customerChurn: 12,
            followerGrowth: { week: 2.2, month: 8.4, year: 43.7 },
            contentPerformance: { reels: 90, static: 76 }
        }
    },
    {
        id: 17,
        name: "Beauty Belle",
        username: "@beautybelle",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Belle",
        domain: ["Skincare", "Makeup"],
        region: "Europe",
        tier: "Micro-influencer",
        followers: 310000,
        bio: "Skincare specialist & beauty blogger. Natural radiance ✨",
        verified: false,
        platforms: ["Instagram", "TikTok"],
        isUnlocked: true,
        location: {
            region: "Europe",
            country: "France",
            state: "Provence-Alpes-Côte d'Azur",
            place: "Nice",
            coordinates: { lat: 43.7102, lng: 7.2620 }
        },
        stats: {
            revenueEstimate: 21000,
            roi: 3.6,
            engagementRate: 11.5,
            bestPlatform: "Instagram",
            bestContentType: "Carousels",
            audienceSentiment: { positive: 90, neutral: 8, negative: 2 },
            customerChurn: 6,
            followerGrowth: { week: 3.4, month: 12.6, year: 62.1 },
            contentPerformance: { reels: 82, static: 94 }
        }
    },
    {
        id: 18,
        name: "Wanderlust Olga",
        username: "@wanderlustolga",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olga",
        domain: ["Hospitality"],
        region: "Europe",
        tier: "Top-tier",
        followers: 1050000,
        bio: "Travel photographer & adventure seeker. Exploring Europe 🌍",
        verified: true,
        platforms: ["Instagram", "YouTube", "TikTok"],
        isUnlocked: true,
        location: {
            region: "Europe",
            country: "Spain",
            state: "Catalonia",
            place: "Barcelona",
            coordinates: { lat: 41.3851, lng: 2.1734 }
        },
        stats: {
            revenueEstimate: 72000,
            roi: 3.4,
            engagementRate: 7.6,
            bestPlatform: "Instagram",
            bestContentType: "Reels",
            audienceSentiment: { positive: 83, neutral: 14, negative: 3 },
            customerChurn: 14,
            followerGrowth: { week: 2.0, month: 7.8, year: 41.2 },
            contentPerformance: { reels: 88, static: 79 }
        }
    },
    
    {
        id: 19,
        name: "Wellness Wei",
        username: "@wellnesswei",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wei",
        domain: ["Health", "Skincare"],
        region: "Asia",
        tier: "Micro-influencer",
        followers: 265000,
        bio: "Holistic health practitioner. Traditional & modern wellness 🌿",
        verified: true,
        platforms: ["Instagram", "YouTube"],
        isUnlocked: true,
        location: {
            region: "Asia",
            country: "China",
            state: "Shanghai",
            place: "Shanghai",
            coordinates: { lat: 31.2304, lng: 121.4737 }
        },
        stats: {
            revenueEstimate: 17000,
            roi: 3.2,
            engagementRate: 10.3,
            bestPlatform: "Instagram",
            bestContentType: "Static Posts",
            audienceSentiment: { positive: 92, neutral: 7, negative: 1 },
            customerChurn: 5,
            followerGrowth: { week: 2.6, month: 9.8, year: 49.3 },
            contentPerformance: { reels: 76, static: 91 }
        }
    },
    {
        id: 20,
        name: "Tech Takeshi",
        username: "@techtakeshi",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Takeshi",
        domain: ["Tech", "Fintech"],
        region: "Asia",
        tier: "Top-tier",
        followers: 950000,
        bio: "Tech entrepreneur & innovation expert. Future of technology 🚀",
        verified: true,
        platforms: ["LinkedIn", "Twitter", "YouTube"],
        isUnlocked: true,
        location: {
            region: "Asia",
            country: "Japan",
            state: "Tokyo",
            place: "Tokyo",
            coordinates: { lat: 35.6762, lng: 139.6503 }
        },
        stats: {
            revenueEstimate: 68000,
            roi: 4.0,
            engagementRate: 7.1,
            bestPlatform: "LinkedIn",
            bestContentType: "Static Posts",
            audienceSentiment: { positive: 81, neutral: 16, negative: 3 },
            customerChurn: 13,
            followerGrowth: { week: 2.1, month: 8.2, year: 44.8 },
            contentPerformance: { reels: 70, static: 86 }
        }
    },
    {
        id: 21,
        name: "Chef Ravi",
        username: "@chefravi",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ravi",
        domain: ["Food Products", "Hospitality"],
        region: "Asia",
        tier: "Micro-influencer",
        followers: 420000,
        bio: "Indian cuisine expert. Spices, flavors & traditions 🍛",
        verified: true,
        platforms: ["Instagram", "YouTube", "Facebook"],
        isUnlocked: true,
        location: {
            region: "Asia",
            country: "India",
            state: "Delhi",
            place: "New Delhi",
            coordinates: { lat: 28.6139, lng: 77.2090 }
        },
        stats: {
            revenueEstimate: 28000,
            roi: 3.5,
            engagementRate: 9.2,
            bestPlatform: "YouTube",
            bestContentType: "Long Form Video",
            audienceSentiment: { positive: 88, neutral: 10, negative: 2 },
            customerChurn: 8,
            followerGrowth: { week: 3.0, month: 11.2, year: 56.7 },
            contentPerformance: { reels: 85, static: 78 }
        }
    },
    {
        id: 22,
        name: "Beauty Mei",
        username: "@beautymei",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mei",
        domain: ["Skincare", "Makeup"],
        region: "Asia",
        tier: "Top-tier",
        followers: 1150000,
        bio: "K-beauty & skincare expert. Glass skin secrets 🌸",
        verified: true,
        platforms: ["Instagram", "YouTube", "TikTok"],
        isUnlocked: true,
        location: {
            region: "Asia",
            country: "South Korea",
            state: "Seoul",
            place: "Seoul",
            coordinates: { lat: 37.5665, lng: 126.9780 }
        },
        stats: {
            revenueEstimate: 82000,
            roi: 4.3,
            engagementRate: 12.1,
            bestPlatform: "Instagram",
            bestContentType: "Carousels",
            audienceSentiment: { positive: 91, neutral: 7, negative: 2 },
            customerChurn: 7,
            followerGrowth: { week: 3.1, month: 11.9, year: 64.2 },
            contentPerformance: { reels: 89, static: 95 }
        }
    },
    {
        id: 23,
        name: "EduAsia Lin",
        username: "@eduasialin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lin",
        domain: ["Education", "Tech"],
        region: "Asia",
        tier: "Micro-influencer",
        followers: 190000,
        bio: "Online educator & course creator. Empowering learners 📚",
        verified: false,
        platforms: ["LinkedIn", "YouTube"],
        isUnlocked: true,
        location: {
            region: "Asia",
            country: "Singapore",
            state: "Singapore",
            place: "Singapore",
            coordinates: { lat: 1.3521, lng: 103.8198 }
        },
        stats: {
            revenueEstimate: 14000,
            roi: 2.9,
            engagementRate: 8.7,
            bestPlatform: "LinkedIn",
            bestContentType: "Static Posts",
            audienceSentiment: { positive: 93, neutral: 6, negative: 1 },
            customerChurn: 5,
            followerGrowth: { week: 2.4, month: 9.3, year: 47.8 },
            contentPerformance: { reels: 67, static: 88 }
        }
    },
    
    {
        id: 24,
        name: "Fitness Felipe",
        username: "@fitnessfelipe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felipe",
        domain: ["Health", "Gym Products"],
        region: "South America",
        tier: "Micro-influencer",
        followers: 305000,
        bio: "Fitness coach & bodybuilding champion. Strength & discipline 💪",
        verified: true,
        platforms: ["Instagram", "YouTube"],
        isUnlocked: true,
        location: {
            region: "South America",
            country: "Brazil",
            state: "São Paulo",
            place: "São Paulo",
            coordinates: { lat: -23.5505, lng: -46.6333 }
        },
        stats: {
            revenueEstimate: 20000,
            roi: 3.4,
            engagementRate: 10.1,
            bestPlatform: "Instagram",
            bestContentType: "Reels",
            audienceSentiment: { positive: 85, neutral: 12, negative: 3 },
            customerChurn: 9,
            followerGrowth: { week: 2.8, month: 10.5, year: 53.2 },
            contentPerformance: { reels: 88, static: 73 }
        }
    },
    {
        id: 25,
        name: "Tech Mateo",
        username: "@techmateo",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mateo",
        domain: ["Tech", "Education"],
        region: "South America",
        tier: "Micro-influencer",
        followers: 215000,
        bio: "Tech reviewer & digital creator. Latest gadgets en español 📱",
        verified: false,
        platforms: ["YouTube", "Instagram", "Twitter"],
        isUnlocked: true,
        location: {
            region: "South America",
            country: "Argentina",
            state: "Buenos Aires",
            place: "Buenos Aires",
            coordinates: { lat: -34.6037, lng: -58.3816 }
        },
        stats: {
            revenueEstimate: 16000,
            roi: 3.1,
            engagementRate: 8.5,
            bestPlatform: "YouTube",
            bestContentType: "Long Form Video",
            audienceSentiment: { positive: 82, neutral: 15, negative: 3 },
            customerChurn: 11,
            followerGrowth: { week: 2.5, month: 9.6, year: 48.9 },
            contentPerformance: { reels: 74, static: 69 }
        }
    },
    {
        id: 26,
        name: "Chef Isabella",
        username: "@chefisabella",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella",
        domain: ["Food Products", "Hospitality"],
        region: "South America",
        tier: "Micro-influencer",
        followers: 380000,
        bio: "Culinary artist & food blogger. Latin American flavors 🌮",
        verified: true,
        platforms: ["Instagram", "YouTube", "TikTok"],
        isUnlocked: true,
        location: {
            region: "South America",
            country: "Colombia",
            state: "Cundinamarca",
            place: "Bogotá",
            coordinates: { lat: 4.7110, lng: -74.0721 }
        },
        stats: {
            revenueEstimate: 25000,
            roi: 3.3,
            engagementRate: 9.7,
            bestPlatform: "Instagram",
            bestContentType: "Reels",
            audienceSentiment: { positive: 87, neutral: 11, negative: 2 },
            customerChurn: 8,
            followerGrowth: { week: 3.1, month: 11.4, year: 57.8 },
            contentPerformance: { reels: 92, static: 80 }
        }
    },
    
    {
        id: 27,
        name: "Wellness Amara",
        username: "@wellnessamara",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amara",
        domain: ["Health", "Skincare"],
        region: "Africa",
        tier: "Micro-influencer",
        followers: 185000,
        bio: "Natural health advocate. African beauty & wellness 🌺",
        verified: true,
        platforms: ["Instagram", "YouTube"],
        isUnlocked: true,
        location: {
            region: "Africa",
            country: "Nigeria",
            state: "Lagos",
            place: "Lagos",
            coordinates: { lat: 6.5244, lng: 3.3792 }
        },
        stats: {
            revenueEstimate: 13000,
            roi: 3.0,
            engagementRate: 11.8,
            bestPlatform: "Instagram",
            bestContentType: "Carousels",
            audienceSentiment: { positive: 90, neutral: 8, negative: 2 },
            customerChurn: 6,
            followerGrowth: { week: 3.3, month: 12.1, year: 61.5 },
            contentPerformance: { reels: 83, static: 93 }
        }
    },
    {
        id: 28,
        name: "Tech Kwame",
        username: "@techkwame",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kwame",
        domain: ["Tech", "Fintech"],
        region: "Africa",
        tier: "Micro-influencer",
        followers: 240000,
        bio: "Tech entrepreneur & startup advisor. African tech revolution 🚀",
        verified: true,
        platforms: ["LinkedIn", "Twitter", "YouTube"],
        isUnlocked: true,
        location: {
            region: "Africa",
            country: "Kenya",
            state: "Nairobi",
            place: "Nairobi",
            coordinates: { lat: -1.2864, lng: 36.8172 }
        },
        stats: {
            revenueEstimate: 18000,
            roi: 3.2,
            engagementRate: 9.1,
            bestPlatform: "LinkedIn",
            bestContentType: "Static Posts",
            audienceSentiment: { positive: 86, neutral: 12, negative: 2 },
            customerChurn: 9,
            followerGrowth: { week: 2.7, month: 10.3, year: 52.7 },
            contentPerformance: { reels: 72, static: 84 }
        }
    },
    
    {
        id: 29,
        name: "Surf & Fit Jake",
        username: "@surffitjake",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jake",
        domain: ["Health", "Gym Products"],
        region: "Oceania",
        tier: "Micro-influencer",
        followers: 295000,
        bio: "Surfer & fitness trainer. Beach lifestyle & wellness 🏄‍♂️",
        verified: true,
        platforms: ["Instagram", "YouTube", "TikTok"],
        isUnlocked: true,
        location: {
            region: "Oceania",
            country: "Australia",
            state: "New South Wales",
            place: "Sydney",
            coordinates: { lat: -33.8688, lng: 151.2093 }
        },
        stats: {
            revenueEstimate: 21000,
            roi: 3.5,
            engagementRate: 10.6,
            bestPlatform: "Instagram",
            bestContentType: "Reels",
            audienceSentiment: { positive: 89, neutral: 9, negative: 2 },
            customerChurn: 7,
            followerGrowth: { week: 2.9, month: 10.8, year: 54.3 },
            contentPerformance: { reels: 90, static: 77 }
        }
    },
    {
        id: 30,
        name: "Kiwi Kate",
        username: "@kiwikate",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=KateNZ",
        domain: ["Hospitality", "Food Products"],
        region: "Oceania",
        tier: "Micro-influencer",
        followers: 205000,
        bio: "Travel & food blogger. Exploring New Zealand 🥝",
        verified: false,
        platforms: ["Instagram", "YouTube"],
        isUnlocked: true,
        location: {
            region: "Oceania",
            country: "New Zealand",
            state: "Auckland",
            place: "Auckland",
            coordinates: { lat: -36.8485, lng: 174.7633 }
        },
        stats: {
            revenueEstimate: 15000,
            roi: 2.9,
            engagementRate: 9.4,
            bestPlatform: "Instagram",
            bestContentType: "Carousels",
            audienceSentiment: { positive: 88, neutral: 10, negative: 2 },
            customerChurn: 8,
            followerGrowth: { week: 2.6, month: 9.9, year: 50.1 },
            contentPerformance: { reels: 81, static: 86 }
        }
    }
]

export const mockCampaigns = [
    {
        id: 1,
        name: "Summer Fitness Challenge",
        creatorId: 1,
        creatorName: "Sarah Johnson",
        status: "Active",
        startDate: "2026-01-01",
        endDate: "2026-03-31",
        budget: 15000,
        spent: 8500,
        metrics: {
            reach: 1250000,
            engagement: 95000,
            conversions: 3200,
            roi: 3.8
        }
    },
    {
        id: 2,
        name: "Skincare Routine Series",
        creatorId: 3,
        creatorName: "Beauty by Emma",
        status: "Active",
        startDate: "2025-12-15",
        endDate: "2026-02-15",
        budget: 5000,
        spent: 3200,
        metrics: {
            reach: 380000,
            engagement: 42000,
            conversions: 1850,
            roi: 4.2
        }
    },
    {
        id: 3,
        name: "Health & Wellness Month",
        creatorId: 5,
        creatorName: "Dr. Priya Sharma",
        status: "Active",
        startDate: "2026-01-05",
        endDate: "2026-02-05",
        budget: 8000,
        spent: 2100,
        metrics: {
            reach: 420000,
            engagement: 38000,
            conversions: 1200,
            roi: 3.5
        }
    },
    {
        id: 4,
        name: "Travel Destinations Showcase",
        creatorId: 7,
        creatorName: "Travel Tales Lisa",
        status: "Completed",
        startDate: "2025-11-01",
        endDate: "2025-12-31",
        budget: 20000,
        spent: 20000,
        metrics: {
            reach: 2100000,
            engagement: 145000,
            conversions: 4500,
            roi: 2.9
        }
    }
]

export const mockEmailHistory = [
    {
        id: 1,
        creatorName: "Sarah Johnson",
        creatorId: 1,
        subject: "Collaboration Opportunity - Fitness Product Launch",
        dateSent: "2026-01-10",
        status: "Replied"
    },
    {
        id: 2,
        creatorName: "Tech Guru Mike",
        creatorId: 2,
        subject: "Partnership Proposal - AI Product Review",
        dateSent: "2026-01-09",
        status: "Sent"
    },
    {
        id: 3,
        creatorName: "Beauty by Emma",
        creatorId: 3,
        subject: "Campaign Extension Discussion",
        dateSent: "2026-01-08",
        status: "Replied"
    },
    {
        id: 4,
        creatorName: "Chef Antonio",
        creatorId: 4,
        subject: "Restaurant Partnership Inquiry",
        dateSent: "2026-01-07",
        status: "Sent"
    },
    {
        id: 5,
        creatorName: "Dr. Priya Sharma",
        creatorId: 5,
        subject: "Follow-up: Campaign Performance",
        dateSent: "2026-01-06",
        status: "Replied"
    },
    {
        id: 6,
        creatorName: "EduTech Alex",
        creatorId: 6,
        subject: "Initial Outreach - EdTech Platform",
        dateSent: "2026-01-05",
        status: "Sent"
    }
]

export const domains = [
    "Health",
    "Tech (AI/ML/Fintech/Agritech/Social Issues)",
    "Skincare",
    "Makeup",
    "Food Products",
    "Gym Products",
    "Education",
    "Hospitality (Restaurants/Hotels/Scenic Places)"
]

export const metricDefinitions = {
    revenueEstimate: "Estimated monthly revenue generated through sponsored content and partnerships",
    roi: "Return on Investment - Average return per dollar spent on collaborations",
    engagementRate: "Percentage of followers who actively engage with content (likes, comments, shares)",
    bestPlatform: "Social media platform with highest engagement and reach",
    bestContentType: "Content format that performs best with audience",
    audienceSentiment: "Overall sentiment analysis of audience comments and interactions",
    customerChurn: "Percentage of followers who unfollow or disengage monthly",
    followerGrowth: "Rate of new follower acquisition over time periods",
    contentPerformance: "Comparative performance metrics between different content formats",
    reach: "Total number of unique users who saw the content",
    conversions: "Number of users who took desired action (purchase, signup, etc.)",
    budget: "Total allocated funds for the campaign",
    spent: "Amount of budget already utilized"
}


export const regions = [
    "North America",
    "Europe",
    "Asia",
    "South America",
    "Africa",
    "Oceania"
]


export const businessProfile = {
    companyName: "TechVenture Marketing",
    companyUrl: "https://techventure.com",
    companyLogo: "https://logo.clearbit.com/google.com",
    domain: "Tech",
    bio: "Leading marketing agency specializing in tech product launches and influencer partnerships. We connect innovative brands with authentic voices.",
    leads: [
        {
            name: "Jennifer Martinez",
            title: "Head of Creator Partnerships",
            email: "jennifer@techventure.com",
            phone: "+1 (555) 123-4567"
        },
        {
            name: "David Chen",
            title: "Campaign Strategy Director",
            email: "david@techventure.com",
            phone: "+1 (555) 987-6543"
        }
    ],
    visibilitySettings: {
        showCompanyName: true,
        showDomain: true,
        showBio: true,
        showLeads: true,
        showLogo: true
    },
    totalBudget: 150000,
    allocatedBudget: 48000,
    availableBudget: 102000
}


export const emailTemplates = [
    {
        id: 1,
        name: "Initial Outreach",
        subject: "Partnership Opportunity with [Company Name]",
        body: "Hi [Creator Name],\n\nI hope this email finds you well. I'm reaching out from [Company Name] because we're impressed with your content and engagement in the [Domain] space.\n\nWe're launching a new campaign and believe you'd be a perfect fit. Would you be interested in discussing a potential collaboration?\n\nBest regards,\n[Your Name]"
    },
    {
        id: 2,
        name: "Campaign Proposal",
        subject: "Exciting Campaign Opportunity - [Campaign Name]",
        body: "Dear [Creator Name],\n\nWe have an exciting campaign opportunity that aligns perfectly with your audience and content style.\n\nCampaign: [Campaign Name]\nBudget: [Budget]\nDuration: [Duration]\n\nI'd love to schedule a call to discuss the details. Are you available this week?\n\nLooking forward to hearing from you!\n\n[Your Name]"
    },
    {
        id: 3,
        name: "Follow-up",
        subject: "Following up on our partnership discussion",
        body: "Hi [Creator Name],\n\nI wanted to follow up on my previous email regarding our partnership opportunity.\n\nI understand you're busy, but I believe this collaboration could be mutually beneficial. Would you have 15 minutes this week for a quick call?\n\nBest,\n[Your Name]"
    }
]


export const campaignTemplates = [
    {
        id: 1,
        name: "Product Launch",
        description: "Standard product launch campaign template",
        suggestedBudget: 15000,
        suggestedDuration: 60,
        targetMetrics: {
            reach: 500000,
            engagement: 25000,
            conversions: 1000
        }
    },
    {
        id: 2,
        name: "Brand Awareness",
        description: "Build brand recognition and reach",
        suggestedBudget: 25000,
        suggestedDuration: 90,
        targetMetrics: {
            reach: 1000000,
            engagement: 50000,
            conversions: 2000
        }
    }
]


export const analyticsTimeSeries = {
    campaignPerformance: [
        { month: "Aug", reach: 850000, engagement: 42000, conversions: 1800, roi: 2.8 },
        { month: "Sep", reach: 920000, engagement: 48000, conversions: 2100, roi: 3.1 },
        { month: "Oct", reach: 1050000, engagement: 55000, conversions: 2400, roi: 3.4 },
        { month: "Nov", reach: 1180000, engagement: 62000, conversions: 2800, roi: 3.6 },
        { month: "Dec", reach: 1350000, engagement: 71000, conversions: 3200, roi: 3.8 },
        { month: "Jan", reach: 1520000, engagement: 79000, conversions: 3600, roi: 4.0 }
    ],
    budgetAllocation: [
        { name: "Health", value: 18000, percentage: 37.5 },
        { name: "Tech", value: 12000, percentage: 25 },
        { name: "Skincare", value: 8000, percentage: 16.7 },
        { name: "Education", value: 6000, percentage: 12.5 },
        { name: "Food", value: 4000, percentage: 8.3 }
    ],
    platformEngagement: [
        { platform: "Instagram", engagement: 45000, reach: 850000 },
        { platform: "YouTube", engagement: 38000, reach: 720000 },
        { platform: "TikTok", engagement: 32000, reach: 680000 },
        { platform: "LinkedIn", engagement: 18000, reach: 320000 },
        { platform: "Facebook", engagement: 12000, reach: 280000 }
    ],
    roiByDomain: [
        { domain: "Skincare", roi: 4.2 },
        { domain: "Health", roi: 3.8 },
        { domain: "Tech", roi: 3.5 },
        { domain: "Education", roi: 3.2 },
        { domain: "Food", roi: 2.9 }
    ]
}


export const locationHierarchy = {
    "North America": {
        "United States": {
            "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
            "New York": ["New York City", "Buffalo", "Albany", "Rochester"],
            "Texas": ["Houston", "Austin", "Dallas", "San Antonio"],
            "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville"]
        },
        "Canada": {
            "Ontario": ["Toronto", "Ottawa", "Mississauga", "Hamilton"],
            "Quebec": ["Montreal", "Quebec City", "Laval", "Gatineau"],
            "British Columbia": ["Vancouver", "Victoria", "Surrey", "Burnaby"]
        },
        "Mexico": {
            "Mexico City": ["Mexico City"],
            "Jalisco": ["Guadalajara", "Zapopan"],
            "Nuevo León": ["Monterrey", "San Pedro Garza García"]
        }
    },
    "Europe": {
        "United Kingdom": {
            "England": ["London", "Manchester", "Birmingham", "Liverpool"],
            "Scotland": ["Edinburgh", "Glasgow", "Aberdeen"],
            "Wales": ["Cardiff", "Swansea"]
        },
        "France": {
            "Île-de-France": ["Paris", "Versailles"],
            "Provence-Alpes-Côte d'Azur": ["Marseille", "Nice", "Cannes"],
            "Auvergne-Rhône-Alpes": ["Lyon", "Grenoble"]
        },
        "Germany": {
            "Bavaria": ["Munich", "Nuremberg"],
            "Berlin": ["Berlin"],
            "North Rhine-Westphalia": ["Cologne", "Düsseldorf", "Dortmund"]
        },
        "Spain": {
            "Madrid": ["Madrid"],
            "Catalonia": ["Barcelona", "Girona"],
            "Andalusia": ["Seville", "Málaga", "Granada"]
        }
    },
    "Asia": {
        "India": {
            "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
            "Karnataka": ["Bangalore", "Mysore"],
            "Delhi": ["New Delhi", "Delhi"],
            "Tamil Nadu": ["Chennai", "Coimbatore"]
        },
        "China": {
            "Beijing": ["Beijing"],
            "Shanghai": ["Shanghai"],
            "Guangdong": ["Guangzhou", "Shenzhen"]
        },
        "Japan": {
            "Tokyo": ["Tokyo", "Yokohama"],
            "Osaka": ["Osaka", "Kyoto"],
            "Hokkaido": ["Sapporo"]
        },
        "Singapore": {
            "Singapore": ["Singapore"]
        }
    },
    "South America": {
        "Brazil": {
            "São Paulo": ["São Paulo", "Campinas"],
            "Rio de Janeiro": ["Rio de Janeiro", "Niterói"],
            "Minas Gerais": ["Belo Horizonte"]
        },
        "Argentina": {
            "Buenos Aires": ["Buenos Aires"],
            "Córdoba": ["Córdoba"],
            "Santa Fe": ["Rosario"]
        },
        "Colombia": {
            "Bogotá": ["Bogotá"],
            "Antioquia": ["Medellín"],
            "Valle del Cauca": ["Cali"]
        }
    },
    "Africa": {
        "South Africa": {
            "Gauteng": ["Johannesburg", "Pretoria"],
            "Western Cape": ["Cape Town"],
            "KwaZulu-Natal": ["Durban"]
        },
        "Nigeria": {
            "Lagos": ["Lagos"],
            "Kano": ["Kano"],
            "Rivers": ["Port Harcourt"]
        },
        "Egypt": {
            "Cairo": ["Cairo"],
            "Alexandria": ["Alexandria"]
        }
    },
    "Oceania": {
        "Australia": {
            "New South Wales": ["Sydney", "Newcastle"],
            "Victoria": ["Melbourne", "Geelong"],
            "Queensland": ["Brisbane", "Gold Coast"]
        },
        "New Zealand": {
            "Auckland": ["Auckland"],
            "Wellington": ["Wellington"],
            "Canterbury": ["Christchurch"]
        }
    }
}


export const metricTooltips = {
    
    estimatedROI: "Expected return on investment. If you spend $1,000 on this creator, this shows how much revenue you can expect back based on historical data.",
    averageConversionRate: "Percentage of viewers who take action (purchase, signup, etc.) after seeing sponsored content.",
    revenuePerCampaign: "Average revenue generated per campaign collaboration with this creator.",

    
    contentFormatPerformance: "Comparison of how different content types (Reels, Static Posts, Carousels, Stories) perform with this creator's audience.",
    bestContentType: "The content format that generates the highest engagement and reach for this creator.",

    
    sentimentAnalysis: "AI-calculated score based on the tone of the last 500 comments. Analyzes positive, neutral, and negative sentiment.",
    topKeywords: "Most frequently used words in audience comments, indicating what resonates with their followers.",

    
    platformStrength: "Relative performance across different social media platforms. Shows which platform drives the most engagement.",
    crossPlatformReach: "Total combined audience across all platforms where the creator is active.",

    
    engagementRate: "Percentage of followers who actively interact (like, comment, share) with content. Industry average is 1-3%.",
    likesCommentsRatio: "Ratio of likes to comments. Lower ratio may indicate bot followers (bots like but don't comment).",
    botScore: "AI-calculated likelihood of fake/bot followers. Lower score is better (0-10 scale).",

    
    followerRetentionRate: "Percentage of followers who remain engaged over time. High retention indicates loyal audience.",
    dropOffAfterSponsored: "Percentage of followers who unfollow immediately after a sponsored post. Lower is better.",
    unfollowRate: "Monthly rate at which followers leave. Industry average is 1-2%.",

    
    followerGrowth: "Rate of new follower acquisition over different time periods (week, month, year).",
    growthTrend: "Overall trajectory: Rising (viral/trending), Stable (consistent), or Declining (losing relevance).",

    
    totalCampaignReach: "Sum of reach across all hired creators for this specific campaign.",
    budgetUtilization: "Percentage of allocated budget that has been spent so far.",
    aggregateEngagement: "Average engagement rate specifically for campaign content (distinct from creator's general engagement).",
    topPerformer: "Creator generating the most traction for this campaign based on reach, engagement, and conversions."
}


