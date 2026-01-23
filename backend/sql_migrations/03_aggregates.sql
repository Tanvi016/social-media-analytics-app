-- ============================================
-- SOCIAL MEDIA ANALYTICS DATABASE SCHEMA
-- File 3: Aggregates (Dashboard-Ready Tables)
-- ============================================
-- Run this after 02_raw_metrics.sql
-- These tables are RECOMPUTABLE from raw data
-- ============================================

-- ============================================
-- TABLE: content_daily_performance
-- Daily rollups of content metrics
-- Refreshed by batch job daily at 1 AM
-- ============================================
CREATE TABLE content_daily_performance (
    aggregate_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID NOT NULL REFERENCES content(content_id) ON DELETE CASCADE,
    date DATE NOT NULL,
    views_delta BIGINT DEFAULT 0,
    likes_delta BIGINT DEFAULT 0,
    comments_delta BIGINT DEFAULT 0,
    shares_delta BIGINT DEFAULT 0,
    engagement_rate DECIMAL(10, 4),
    virality_score DECIMAL(10, 6),
    computed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_daily_content 
        FOREIGN KEY (content_id) 
        REFERENCES content(content_id) 
        ON DELETE CASCADE,
    
    -- One row per content per day
    UNIQUE (content_id, date)
);

CREATE INDEX idx_daily_content ON content_daily_performance(content_id);
CREATE INDEX idx_daily_date ON content_daily_performance(date DESC);
CREATE INDEX idx_daily_engagement ON content_daily_performance(engagement_rate DESC NULLS LAST);
CREATE INDEX idx_daily_content_date ON content_daily_performance(content_id, date DESC);

-- ============================================
-- TABLE: creator_weekly_summary
-- Weekly performance rollup per creator per platform
-- Refreshed weekly on Mondays at 2 AM
-- ============================================
CREATE TABLE creator_weekly_summary (
    summary_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES creators(creator_id) ON DELETE CASCADE,
    platform_id SMALLINT NOT NULL REFERENCES platforms(platform_id),
    week_start_date DATE NOT NULL,
    total_posts INTEGER DEFAULT 0,
    total_views BIGINT DEFAULT 0,
    total_engagement BIGINT DEFAULT 0,
    avg_engagement_rate DECIMAL(10, 4),
    follower_growth INTEGER DEFAULT 0,
    top_performing_content_id UUID REFERENCES content(content_id) ON DELETE SET NULL,
    computed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_weekly_creator 
        FOREIGN KEY (creator_id) 
        REFERENCES creators(creator_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_weekly_platform 
        FOREIGN KEY (platform_id) 
        REFERENCES platforms(platform_id),
    CONSTRAINT fk_weekly_top_content 
        FOREIGN KEY (top_performing_content_id) 
        REFERENCES content(content_id) 
        ON DELETE SET NULL,
    
    -- One row per creator per platform per week
    UNIQUE (creator_id, platform_id, week_start_date)
);

CREATE INDEX idx_weekly_creator ON creator_weekly_summary(creator_id);
CREATE INDEX idx_weekly_platform ON creator_weekly_summary(platform_id);
CREATE INDEX idx_weekly_date ON creator_weekly_summary(week_start_date DESC);
CREATE INDEX idx_weekly_creator_date ON creator_weekly_summary(creator_id, week_start_date DESC);

-- ============================================
-- TABLE: platform_comparison_aggregates
-- Cross-platform performance comparison for creators
-- Powers "Instagram vs YouTube" comparison widgets
-- ============================================
CREATE TABLE platform_comparison_aggregates (
    comparison_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES creators(creator_id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    platform_id SMALLINT NOT NULL REFERENCES platforms(platform_id),
    total_reach BIGINT DEFAULT 0,
    avg_engagement_rate DECIMAL(10, 4),
    content_count INTEGER DEFAULT 0,
    computed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_comparison_creator 
        FOREIGN KEY (creator_id) 
        REFERENCES creators(creator_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_comparison_platform 
        FOREIGN KEY (platform_id) 
        REFERENCES platforms(platform_id),
    
    -- One row per creator per platform per period
    UNIQUE (creator_id, platform_id, period_start, period_end)
);

CREATE INDEX idx_comparison_creator ON platform_comparison_aggregates(creator_id);
CREATE INDEX idx_comparison_period ON platform_comparison_aggregates(period_start, period_end);

-- ============================================
-- TABLE: campaign_roi_summary
-- Business campaign performance aggregates
-- Refreshed daily for active campaigns
-- ============================================
CREATE TABLE campaign_roi_summary (
    summary_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(campaign_id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    total_spend DECIMAL(12, 2) DEFAULT 0,
    total_revenue DECIMAL(12, 2) DEFAULT 0,
    total_reach BIGINT DEFAULT 0,
    total_conversions INTEGER DEFAULT 0,
    roi DECIMAL(10, 4),
    cost_per_conversion DECIMAL(10, 2),
    computed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_roi_campaign 
        FOREIGN KEY (campaign_id) 
        REFERENCES campaigns(campaign_id) 
        ON DELETE CASCADE,
    
    -- One row per campaign per period
    UNIQUE (campaign_id, period_start, period_end)
);

CREATE INDEX idx_roi_campaign ON campaign_roi_summary(campaign_id);
CREATE INDEX idx_roi_period ON campaign_roi_summary(period_start, period_end);
CREATE INDEX idx_roi_value ON campaign_roi_summary(roi DESC NULLS LAST);

-- ============================================
-- Success message
-- ============================================
DO $$ 
BEGIN 
    RAISE NOTICE 'Aggregate tables created successfully!';
    RAISE NOTICE 'Tables: content_daily_performance, creator_weekly_summary, platform_comparison_aggregates, campaign_roi_summary';
    RAISE NOTICE 'Remember: These tables are RECOMPUTABLE - they can be rebuilt from raw data';
END $$;
