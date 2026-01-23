-- ============================================
-- SOCIAL MEDIA ANALYTICS DATABASE SCHEMA
-- File 2: Raw Metrics (Append-Only Tables)
-- ============================================
-- Run this after 01_core_entities.sql
-- ============================================

-- ============================================
-- TABLE: content_engagement_snapshots
-- Time-series snapshots of content performance
-- CRITICAL: Append-only, never update
-- ============================================
CREATE TABLE content_engagement_snapshots (
    snapshot_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    content_id UUID NOT NULL REFERENCES content(content_id) ON DELETE CASCADE,
    snapshot_at TIMESTAMPTZ NOT NULL,
    views BIGINT NOT NULL DEFAULT 0,
    likes BIGINT NOT NULL DEFAULT 0,
    comments BIGINT NOT NULL DEFAULT 0,
    shares BIGINT NOT NULL DEFAULT 0,
    saves BIGINT DEFAULT 0,
    clicks BIGINT DEFAULT 0,
    data_source VARCHAR(20) NOT NULL CHECK (data_source IN ('api', 'manual', 'scrape')) DEFAULT 'api',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_snapshot_content 
        FOREIGN KEY (content_id) 
        REFERENCES content(content_id) 
        ON DELETE CASCADE,
    
    -- Ensure metrics are non-negative
    CONSTRAINT chk_views_positive CHECK (views >= 0),
    CONSTRAINT chk_likes_positive CHECK (likes >= 0),
    CONSTRAINT chk_comments_positive CHECK (comments >= 0),
    CONSTRAINT chk_shares_positive CHECK (shares >= 0)
);

-- Critical indexes for time-series queries
CREATE INDEX idx_snapshots_content_time ON content_engagement_snapshots(content_id, snapshot_at DESC);
CREATE INDEX idx_snapshots_time ON content_engagement_snapshots(snapshot_at);
CREATE INDEX idx_snapshots_created ON content_engagement_snapshots(created_at);

-- Note: Duplicate prevention will be handled at application level
-- Regular composite index for efficient queries
CREATE INDEX idx_snapshots_content_hour 
    ON content_engagement_snapshots(content_id, snapshot_at);

-- ============================================
-- TABLE: follower_growth_snapshots
-- Tracks creator follower/subscriber counts over time
-- ============================================
CREATE TABLE follower_growth_snapshots (
    snapshot_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES creators(creator_id) ON DELETE CASCADE,
    platform_id SMALLINT NOT NULL REFERENCES platforms(platform_id),
    snapshot_at TIMESTAMPTZ NOT NULL,
    follower_count BIGINT NOT NULL DEFAULT 0,
    total_posts INTEGER DEFAULT 0,
    data_source VARCHAR(20) NOT NULL CHECK (data_source IN ('api', 'manual', 'scrape')) DEFAULT 'api',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_follower_creator 
        FOREIGN KEY (creator_id) 
        REFERENCES creators(creator_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_follower_platform 
        FOREIGN KEY (platform_id) 
        REFERENCES platforms(platform_id),
    CONSTRAINT chk_followers_positive CHECK (follower_count >= 0)
);

CREATE INDEX idx_follower_creator_platform ON follower_growth_snapshots(creator_id, platform_id);
CREATE INDEX idx_follower_time ON follower_growth_snapshots(snapshot_at DESC);

-- Note: Daily uniqueness will be enforced at application level
CREATE INDEX idx_follower_creator_platform_date 
    ON follower_growth_snapshots(creator_id, platform_id, snapshot_at);

-- ============================================
-- TABLE: campaign_performance_events
-- Raw events from business campaigns
-- Event-sourcing pattern for campaign tracking
-- ============================================
CREATE TABLE campaign_performance_events (
    event_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(campaign_id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN ('impression', 'click', 'conversion', 'spend', 'reach')),
    event_at TIMESTAMPTZ NOT NULL,
    platform_id SMALLINT REFERENCES platforms(platform_id),
    content_id UUID REFERENCES content(content_id) ON DELETE SET NULL,
    amount DECIMAL(12, 2) DEFAULT 0,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_event_campaign 
        FOREIGN KEY (campaign_id) 
        REFERENCES campaigns(campaign_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_event_platform 
        FOREIGN KEY (platform_id) 
        REFERENCES platforms(platform_id),
    CONSTRAINT fk_event_content 
        FOREIGN KEY (content_id) 
        REFERENCES content(content_id) 
        ON DELETE SET NULL
);

CREATE INDEX idx_events_campaign ON campaign_performance_events(campaign_id);
CREATE INDEX idx_events_type ON campaign_performance_events(event_type);
CREATE INDEX idx_events_time ON campaign_performance_events(event_at DESC);
CREATE INDEX idx_events_campaign_time ON campaign_performance_events(campaign_id, event_at DESC);

-- GIN index for JSONB metadata queries
CREATE INDEX idx_events_metadata ON campaign_performance_events USING GIN (metadata);

-- ============================================
-- TABLE: ingestion_errors
-- Logs invalid payloads for debugging
-- ============================================
CREATE TABLE ingestion_errors (
    error_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    error_type VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    error_message TEXT NOT NULL,
    source VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_errors_created ON ingestion_errors(created_at DESC);
CREATE INDEX idx_errors_type ON ingestion_errors(error_type);

-- ============================================
-- Success message
-- ============================================
DO $$ 
BEGIN 
    RAISE NOTICE 'Raw metrics tables created successfully!';
    RAISE NOTICE 'Tables: content_engagement_snapshots, follower_growth_snapshots, campaign_performance_events, ingestion_errors';
    RAISE NOTICE 'Remember: These are APPEND-ONLY tables - never UPDATE, only INSERT';
END $$;
