# Social Media Analytics Dashboard

A powerful, dual-interface social media analytics platform designed for both **content creators** and **businesses**. Track performance metrics, manage campaigns, discover collaboration opportunities, and get AI-powered insights across Instagram, YouTube, TikTok, and Facebook.

![Dashboard Preview](https://img.shields.io/badge/React-18.3-blue) ![Vite](https://img.shields.io/badge/Vite-7.3-purple) ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-cyan)

---

## 🌟 Key Features

### 📊 For Content Creators

#### **Analytics Dashboard**
- **Multi-Platform Overview**: Track total likes, shares, reach, comments, and follower growth across Instagram, YouTube, TikTok, and Facebook
- **Content Performance Analysis**: Identify viral posts and best-performing content by type (Reels, Stories, Posts, Videos, Shorts)
- **Platform Comparison**: Side-by-side comparison of engagement rates and follower counts across all platforms
- **Posting Heatmap**: Visualize posting patterns and activity across days and hours
- **Posting Time Intelligence**: Discover optimal posting times for maximum engagement on each platform
- **Audience Behavior & Insights**: Analyze sentiment distribution, reach vs. interaction ratios, and demographic breakdowns (age, gender, location)
- **Revenue Metrics**: Track monthly earnings, project count, and yearly totals

#### **AI-Powered Features**
- **AI Chat Assistant**: Natural language interface for instant insights and analytics queries
- **Smart Recommendations**: AI-generated content suggestions, posting time recommendations, and trend alerts
- **Trend Analysis**: Identify emerging content themes and trending topics

#### **Collaboration Tools**
- **Creator Inbox**: Manage collaboration requests from businesses with read/unread status tracking
- **Email Management**: View, categorize, and respond to partnership opportunities
- **Profile Management**: Comprehensive creator profile with editable information

#### **Export & Reporting**
- **PDF Reports**: High-resolution chart exports (4x pixel ratio) with comprehensive analytics
- **Excel Export**: Multi-sheet workbooks with platform-specific metrics and revenue data
- **CSV Export**: Quick data export for external analysis

### 🏢 For Business Accounts

#### **Creator Discovery**
- **Advanced Search**: Filter creators by platform, niche, follower range, engagement rate, and location
- **Creator Analytics**: View detailed performance metrics for both unlocked and locked creator profiles
- **Match Score**: AI-powered compatibility scoring based on brand alignment
- **Geographic Filtering**: Interactive map-based location filtering with city search

#### **Campaign Management**
- **Campaign Creator**: Build campaigns with budget allocation, timeline, deliverables, and platform selection
- **Drag-and-Drop Interface**: Organize deliverables with intuitive drag-and-drop functionality
- **Ongoing Campaigns**: Track active, completed, and pending campaigns with real-time metrics
- **Budget Manager**: Visual budget allocation, spending tracking, and ROI analysis

#### **Communication Center**
- **Email Composer**: Professional email templates for outreach
- **Thread Management**: Organize conversations by creator with full message history
- **Contact Lists**: Manage creator contacts with categories and notes

#### **Business Analytics**
- **Campaign Performance**: Track reach, engagement, conversions, and ROI across all campaigns
- **Creator Comparison**: Benchmark multiple creators side-by-side
- **Budget Analysis**: Visualize spending patterns and budget utilization

---

## 🎨 UI/UX Highlights

- **Dual Theme Support**: Beautiful light and dark modes with smooth transitions
- **Modern Design**: Glassmorphism effects, gradient accents, and premium aesthetics
- **Collapsible Sidebar**: Efficient space management with icon-only collapsed state
- **Interactive Charts**: Beautiful Recharts visualizations with custom tooltips and animations
- **Draggable AI Chat**: Floating AI assistant bubble that can be positioned anywhere on screen
- **Responsive Layout**: Optimized grid layouts for different screen sizes
- **Platform-Specific Styling**: Color-coded badges and icons for Instagram, YouTube, TikTok, and Facebook
- **Notification System**: Real-time notifications with bell icon and badge counters
- **Smooth Animations**: Hover effects, transitions, and micro-interactions throughout

---

## 🛠️ Tech Stack

### Core Technologies
- **React** 18.3.1 - Modern UI library with hooks
- **Vite** 7.3.1 - Lightning-fast build tool and dev server
- **React Router DOM** 7.12.0 - Dynamic routing for creator/business dashboards

### Styling & UI
- **Tailwind CSS** 3.4.1 - Utility-first CSS framework
- **Shadcn UI** - Beautiful, accessible component library
  - Radix UI primitives for dropdowns, tooltips, tabs, hover cards, and selects
  - Custom-styled buttons, badges, cards, and inputs
- **Lucide React** 0.344.0 - Modern icon library
- **Google Fonts** - Plus Jakarta Sans & Inter typography

### Data Visualization
- **Recharts** 2.10.3 - Composable charting library for React
  - Line charts, bar charts, area charts, pie charts, and heatmaps
  - Custom tooltips and legends

### Export & File Generation
- **jsPDF** 4.0.0 - PDF generation
- **jsPDF-AutoTable** 5.0.7 - Table formatting for PDFs
- **html-to-image** 1.11.13 - High-resolution chart capture (4x pixel ratio)
- **html2canvas** 1.4.1 - DOM to canvas conversion
- **XLSX** 0.18.5 - Excel spreadsheet generation

### Drag & Drop
- **React DnD** 16.0.1 - Drag and drop functionality
- **React DnD HTML5 Backend** 16.0.1 - HTML5 drag and drop backend

### Utilities
- **class-variance-authority** - Type-safe component variants
- **clsx** & **tailwind-merge** - Conditional class merging

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 16+ 
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd social-media-analytics
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

4. **Build for production**
```bash
npm run build
```

5. **Preview production build**
```bash
npm run preview
```

---

## 📁 Project Structure

```
social-media-analytics/
├── public/                          # Static assets
├── src/
│   ├── components/
│   │   ├── business/                # Business dashboard components
│   │   │   ├── AdvancedFilters.jsx  # Advanced creator filtering
│   │   │   ├── BudgetManager.jsx    # Budget tracking and allocation
│   │   │   ├── BusinessAnalytics.jsx # Business performance metrics
│   │   │   ├── BusinessProfile.jsx   # Business profile management
│   │   │   ├── BusinessSidebar.jsx   # Business navigation sidebar
│   │   │   ├── CampaignCreator.jsx   # Campaign creation wizard
│   │   │   ├── CommunicationCenter.jsx # Email and messaging hub
│   │   │   ├── CreatorAnalyticsView.jsx # Detailed creator analytics
│   │   │   ├── CreatorProfileModal.jsx # Creator profile modal
│   │   │   ├── CreatorSearch.jsx     # Creator discovery interface
│   │   │   ├── DomainFilter.jsx      # Niche/domain filtering
│   │   │   ├── EmailComposer.jsx     # Email template composer
│   │   │   ├── InfoTooltip.jsx       # Information tooltips
│   │   │   ├── LocationFilter.jsx    # Geographic filtering
│   │   │   ├── LocationMapModal.jsx  # Interactive map modal
│   │   │   └── OngoingCampaigns.jsx  # Campaign tracking dashboard
│   │   ├── creator/                 # Creator dashboard components
│   │   │   ├── CreatorInbox.jsx     # Collaboration inbox
│   │   │   └── EmailDetailModal.jsx # Email detail view
│   │   ├── panels/                  # Analytics panel components
│   │   │   ├── AudienceBehavior.jsx # Sentiment and behavior analytics
│   │   │   ├── AudienceInsights.jsx # Demographics and insights
│   │   │   ├── ContentPerformance.jsx # Top performing content
│   │   │   ├── OverviewAnalytics.jsx # High-level metrics overview
│   │   │   ├── PlatformComparison.jsx # Multi-platform comparison
│   │   │   ├── PostingHeatmap.jsx   # Activity heatmap
│   │   │   ├── PostingTimeIntelligence.jsx # Optimal posting times
│   │   │   └── RevenueMetrics.jsx   # Revenue and earnings tracking
│   │   ├── ui/                      # Shadcn UI components
│   │   │   ├── badge.jsx            # Badge component
│   │   │   ├── button.jsx           # Button variants
│   │   │   ├── card.jsx             # Card container
│   │   │   ├── dropdown-menu.jsx    # Dropdown menus
│   │   │   ├── hover-card.jsx       # Hover card tooltips
│   │   │   ├── input.jsx            # Form inputs
│   │   │   ├── select.jsx           # Select dropdowns
│   │   │   ├── tabs.jsx             # Tab navigation
│   │   │   └── tooltip.jsx          # Tooltips
│   │   ├── AIChatBubble.jsx         # Draggable AI chat widget
│   │   ├── AIChatInterface.jsx      # Full AI chat interface
│   │   ├── Filters.jsx              # Platform and content type filters
│   │   ├── NotificationBell.jsx     # Notification center
│   │   ├── ProfilePage.jsx          # Creator profile page
│   │   ├── RecommendationsPage.jsx  # AI recommendations and insights
│   │   ├── Sidebar.jsx              # Creator navigation sidebar
│   │   └── ThemeToggle.jsx          # Dark mode toggle
│   ├── contexts/
│   │   └── ThemeContext.jsx         # Theme state management
│   ├── data/
│   │   ├── businessMockData.js      # Mock business/campaign data
│   │   └── mockEmails.js            # Mock email data for inbox
│   ├── lib/
│   │   ├── creatorExportUtils.js    # Creator PDF/Excel/CSV export utilities
│   │   ├── exportUtils.js           # Business export utilities
│   │   └── utils.js                 # Shared utility functions
│   ├── pages/
│   │   ├── BusinessDashboard.jsx    # Main business dashboard page
│   │   └── CreatorDashboard.jsx     # Main creator dashboard page
│   ├── utils/
│   │   └── (utility modules)
│   ├── App.jsx                      # Root component with routing
│   ├── main.jsx                     # Application entry point
│   └── index.css                    # Global styles and Tailwind directives
├── .gitignore
├── components.json                  # Shadcn UI configuration
├── index.html                       # HTML entry point
├── package.json                     # Dependencies and scripts
├── postcss.config.js               # PostCSS configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.js                  # Vite configuration
└── README.md
```

---

## 🔗 Routing

The application supports dynamic routing for different user types:

- **`/`** - Redirects to default creator demo dashboard
- **`/:username/creator-dashboard`** - Creator dashboard (default route)
- **`/:username/business-dashboard`** - Business dashboard
- **`/:username/dashboard`** - Legacy route (redirects to creator dashboard)

### Example URLs:
- Creator: `http://localhost:5173/creator_demo/creator-dashboard`
- Business: `http://localhost:5173/business_demo/business-dashboard`

---

## 📊 Mock Data

The application includes comprehensive mock data for demonstration:

### Creator Analytics Data
- **Platform Metrics**: Followers, engagement rates, post counts for Instagram, YouTube, TikTok, Facebook
- **Engagement Trends**: 30-day and 90-day historical data for all metrics
- **Content Performance**: Top performing posts by type (Reels, Stories, Videos, Shorts, Posts)
- **Posting Analytics**: Hourly and daily engagement patterns
- **Audience Demographics**: Age groups, gender distribution, top locations
- **Sentiment Analysis**: Positive, neutral, negative sentiment breakdown
- **Revenue Data**: Monthly earnings, project counts, yearly totals

### Business Platform Data
- **Creator Database**: 20+ mock creators with varied profiles, niches, and metrics
- **Campaign Data**: Sample campaigns with budgets, timelines, deliverables, and performance metrics
- **Email Threads**: Mock collaboration emails with threading and read/unread states
- **Budget Allocations**: Historical and projected budget distributions

---

## 🎯 Key Features in Detail

### Creator Dashboard Tabs
1. **Analytics** - Comprehensive metrics and visualizations
2. **Recommendations** - AI-powered insights and suggestions
3. **AI Chat** - Natural language analytics assistant
4. **Inbox** - Collaboration requests and messages
5. **Profile** - Creator profile management

### Business Dashboard Tabs
1. **Dashboard** - Overview with quick actions and key metrics
2. **Connect** - Creator discovery and search
3. **Campaigns** - Campaign management and tracking
4. **Messages** - Communication center
5. **Analytics** - Business performance insights
6. **Profile** - Business profile settings

### Export Features

#### **PDF Export**
- Captures all visible charts at 4x resolution (3200x2400px)
- Includes creator summary, platform breakdown, and revenue metrics
- Auto-generated tables with jsPDF-AutoTable
- Professional formatting with headers and footers

#### **Excel Export**
- Multi-sheet workbook with:
  - Overview summary
  - Platform-specific metrics (Instagram, YouTube, TikTok, Facebook)
  - Revenue breakdown
- Formatted headers and auto-width columns

#### **CSV Export**
- Quick, lightweight data export
- Compatible with Excel, Google Sheets, and data analysis tools

---

## 🌈 Theme System

The application features a comprehensive dark mode implementation:

- **Light Theme**: Clean, professional aesthetic with white backgrounds
- **Dark Theme**: Modern dark slate backgrounds with vibrant accents
- **Persistent Storage**: Theme preference saved to localStorage
- **Smooth Transitions**: Animated theme switching
- **Contextual Colors**: Dynamic text and border colors based on theme

---

## 🔮 Future Enhancements

### Backend Integration
- [ ] Real social media API integration (Instagram Graph API, YouTube Data API, TikTok API, Facebook Graph API)
- [ ] User authentication with Supabase or Firebase
- [ ] PostgreSQL database for data persistence
- [ ] RESTful API or GraphQL backend

### AI & Machine Learning
- [ ] Advanced AI insights with GPT-4 or Gemini integration
- [ ] Predictive analytics for engagement forecasting
- [ ] Automated content recommendations based on past performance
- [ ] Sentiment analysis from real comments

### Features
- [ ] Real-time notifications with WebSockets
- [ ] Multi-user collaboration features
- [ ] Scheduled post suggestions
- [ ] Competitor analysis
- [ ] Custom report builder
- [ ] Mobile app (React Native)
- [ ] Calendar integration for content planning
- [ ] Automated email campaigns for businesses

### Performance
- [ ] Data caching with Redis
- [ ] Lazy loading for analytics panels
- [ ] Progressive Web App (PWA) support
- [ ] Server-side rendering (Next.js migration)

---

## 🐛 Known Limitations

- Currently uses mock data - no real API integration
- PDF export requires charts to be visible on screen
- No user authentication system
- No database persistence
- Limited to demo data sets

---

## 📄 License

MIT License - feel free to use this project for learning or as a foundation for your own analytics platform.

---

## 👤 Author

Built as a comprehensive social media analytics platform prototype.

**Technologies**: React, Vite, Tailwind CSS, Recharts, Shadcn UI

---

## 🙏 Acknowledgments

- **Shadcn UI** for the beautiful component library
- **Recharts** for powerful visualization tools
- **Radix UI** for accessible primitives
- **Tailwind CSS** for rapid styling
- **Lucide** for crisp, modern icons

---

## 📞 Support

For questions or issues, please open an issue in the repository.

---

**Built with ❤️ for creators and businesses**
