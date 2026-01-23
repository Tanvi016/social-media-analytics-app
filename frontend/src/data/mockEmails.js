
export const mockEmails = [
    {
        id: 1,
        subject: "Collaboration Opportunity - Summer Fitness Campaign",
        from: "Sarah Marketing",
        company: "FitLife Global",
        companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=FitLife",
        message: "Hi! We're launching a summer fitness campaign and would love to collaborate with you. Your engagement rates and audience demographics align perfectly with our target market.",
        campaignDetails: {
            name: "Summer Fitness Challenge 2026",
            budget: 15000,
            timeline: "Feb 1 - Mar 31, 2026",
            deliverables: [
                "3 Instagram Reels",
                "2 Feed Posts",
                "5 Stories per week",
                "1 YouTube video"
            ],
            targetAudience: "Fitness enthusiasts aged 18-35",
            objectives: "Drive app downloads and increase brand awareness"
        },
        status: "pending", 
        priority: "high", 
        timestamp: new Date("2026-01-10T10:30:00"),
        isRead: false,
        tags: ["Sponsored", "High Budget"]
    },
    {
        id: 2,
        subject: "Product Review Request - Skincare Line",
        from: "Emma Chen",
        company: "Glow Beauty Co.",
        companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Glow",
        message: "We'd love to send you our new organic skincare line for an honest review. We've been following your content and think your audience would love our products!",
        campaignDetails: {
            name: "Organic Glow Product Launch",
            budget: 5000,
            timeline: "Jan 20 - Feb 15, 2026",
            deliverables: [
                "1 Unboxing video",
                "Product review post",
                "Before/After stories"
            ],
            targetAudience: "Beauty enthusiasts, eco-conscious consumers",
            objectives: "Product awareness and reviews"
        },
        status: "pending",
        priority: "medium",
        timestamp: new Date("2026-01-11T14:20:00"),
        isRead: false,
        tags: ["Product Review", "Gifted"]
    },
    {
        id: 3,
        subject: "Brand Ambassador Program Invitation",
        from: "Tech Innovations Team",
        company: "NextGen Tech",
        companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=NextGen",
        message: "We're impressed with your tech reviews and would like to invite you to our exclusive Brand Ambassador program for 2026!",
        campaignDetails: {
            name: "Brand Ambassador Program 2026",
            budget: 50000,
            timeline: "Feb 1, 2026 - Jan 31, 2027 (12 months)",
            deliverables: [
                "Monthly product features",
                "Quarterly tech reviews",
                "Event appearances (2-3 per year)",
                "Social media mentions"
            ],
            targetAudience: "Tech-savvy professionals and enthusiasts",
            objectives: "Long-term brand partnership and advocacy"
        },
        status: "accepted",
        priority: "high",
        timestamp: new Date("2026-01-08T09:15:00"),
        isRead: true,
        tags: ["Long-term", "Ambassador"]
    },
    {
        id: 4,
        subject: "Food Festival Promotion",
        from: "Lisa Rodriguez",
        company: "Urban Food Festival",
        companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Urban",
        message: "Join us in promoting the biggest food festival of the year! We need food content creators like you to help spread the word.",
        campaignDetails: {
            name: "Urban Food Festival 2026",
            budget: 3000,
            timeline: "Jan 25 - Feb 5, 2026",
            deliverables: [
                "Festival attendance and coverage",
                "2 Reels from the event",
                "Instagram Stories throughout the day"
            ],
            targetAudience: "Food lovers and local community",
            objectives: "Event awareness and ticket sales"
        },
        status: "rejected",
        priority: "low",
        timestamp: new Date("2026-01-07T16:45:00"),
        isRead: true,
        tags: ["Event", "Local"]
    },
    {
        id: 5,
        subject: "Educational Content Partnership",
        from: "Dr. James Wilson",
        company: "EduTech Solutions",
        companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=EduTech",
        message: "We're creating an online learning platform and need educators to create engaging content. Your teaching style is exactly what we're looking for!",
        campaignDetails: {
            name: "Online Learning Content Creation",
            budget: 8000,
            timeline: "Feb 15 - Mar 30, 2026",
            deliverables: [
                "4 educational videos (10-15 min each)",
                "Course material review",
                "Social media promotion"
            ],
            targetAudience: "Students and lifelong learners",
            objectives: "Course enrollment and platform awareness"
        },
        status: "pending",
        priority: "medium",
        timestamp: new Date("2026-01-12T11:00:00"),
        isRead: false,
        tags: ["Education", "Content Creation"]
    },
    {
        id: 6,
        subject: "Travel Vlog Collaboration - Maldives",
        from: "Travel Dreams Agency",
        company: "Wanderlust Travel Co.",
        companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=Wanderlust",
        message: "We're offering an all-expenses-paid trip to the Maldives in exchange for travel content. This is a once-in-a-lifetime opportunity!",
        campaignDetails: {
            name: "Maldives Paradise Campaign",
            budget: 12000,
            timeline: "March 1-10, 2026 (10 days)",
            deliverables: [
                "Daily vlogs (10 videos total)",
                "Instagram carousel posts (5)",
                "Destination guide blog post"
            ],
            targetAudience: "Travel enthusiasts and adventure seekers",
            objectives: "Destination promotion and booking conversions"
        },
        status: "pending",
        priority: "high",
        timestamp: new Date("2026-01-12T15:30:00"),
        isRead: true,
        tags: ["Travel", "Sponsored Trip"]
    },
    {
        id: 7,
        subject: "Fitness App Launch Campaign",
        from: "Marcus Johnson",
        company: "FitTrack Pro",
        companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=FitTrack",
        message: "We're launching our new fitness tracking app and need influencers in the health and wellness space. Interested in an early partnership?",
        campaignDetails: {
            name: "FitTrack Pro App Launch",
            budget: 6500,
            timeline: "Jan 30 - Feb 28, 2026",
            deliverables: [
                "App review video",
                "Workout tutorials using the app",
                "Progress tracking stories"
            ],
            targetAudience: "Fitness enthusiasts and health-conscious individuals",
            objectives: "App downloads and user acquisition"
        },
        status: "pending",
        priority: "medium",
        timestamp: new Date("2026-01-11T08:45:00"),
        isRead: false,
        tags: ["App Launch", "Fitness"]
    },
    {
        id: 8,
        subject: "Sustainable Fashion Campaign",
        from: "Green Style Collective",
        company: "EcoWear Fashion",
        companyLogo: "https://api.dicebear.com/7.x/initials/svg?seed=EcoWear",
        message: "Join our mission to promote sustainable fashion! We love your eco-conscious content and think you'd be perfect for our new collection launch.",
        campaignDetails: {
            name: "Sustainable Spring Collection 2026",
            budget: 4500,
            timeline: "Feb 10 - Mar 15, 2026",
            deliverables: [
                "Try-on haul video",
                "Styling tips post",
                "Sustainability awareness content"
            ],
            targetAudience: "Eco-conscious fashion lovers",
            objectives: "Collection awareness and sustainable fashion advocacy"
        },
        status: "pending",
        priority: "low",
        timestamp: new Date("2026-01-09T13:20:00"),
        isRead: true,
        tags: ["Fashion", "Sustainability"]
    }
]


export const getUnreadEmailCount = (emails = mockEmails) => {
    return emails.filter(email => !email.isRead && email.status === 'pending').length
}


export const getEmailsByStatus = (status, emails = mockEmails) => {
    if (status === 'all') return emails
    return emails.filter(email => email.status === status)
}


export const markEmailAsRead = (emailId, emails = mockEmails) => {
    return emails.map(email =>
        email.id === emailId ? { ...email, isRead: true } : email
    )
}


export const updateEmailStatus = (emailId, newStatus, emails = mockEmails) => {
    return emails.map(email =>
        email.id === emailId ? { ...email, status: newStatus, isRead: true } : email
    )
}
