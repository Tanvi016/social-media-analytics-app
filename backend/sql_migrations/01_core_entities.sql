-- ============================================
-- SOCIAL MEDIA ANALYTICS DATABASE SCHEMA
-- File 1: Core Entities
-- ============================================
-- Run this first - creates foundation tables
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLE: users
-- Central user registry for creators and businesses
-- ============================================
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('creator', 'business')),
    email VARCHAR(255) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_type ON users(user_type);

-- ============================================
-- TABLE: platforms
-- Reference table for supported social platforms
-- ============================================
CREATE TABLE platforms (
    platform_id SMALLSERIAL PRIMARY KEY,
    platform_name VARCHAR(50) UNIQUE NOT NULL,
    api_enabled BOOLEAN DEFAULT FALSE,
    metrics_supported JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert initial platforms
INSERT INTO platforms (platform_name, api_enabled) VALUES
    ('Instagram', TRUE),
    ('YouTube', TRUE),
    ('TikTok', TRUE),
    ('Facebook', TRUE),
    ('Twitter', FALSE);

-- ============================================
-- TABLE: creators
-- Extended profile for creator accounts
-- ============================================
CREATE TABLE creators (
    creator_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    bio TEXT,
    primary_platform SMALLINT REFERENCES platforms(platform_id),
    content_categories TEXT[] DEFAULT ARRAY[]::TEXT[],
    verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_creator_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id) 
        ON DELETE CASCADE
);

CREATE INDEX idx_creators_user ON creators(user_id);
CREATE INDEX idx_creators_platform ON creators(primary_platform);

-- ============================================
-- TABLE: businesses
-- Extended profile for business accounts
-- ============================================
CREATE TABLE businesses (
    business_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(user_id) ON DELETE CASCADE,
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100),
    website VARCHAR(500),
    target_audience_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_business_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id) 
        ON DELETE CASCADE
);

CREATE INDEX idx_businesses_user ON businesses(user_id);
CREATE INDEX idx_businesses_industry ON businesses(industry);

-- ============================================
-- TABLE: content
-- Metadata for all creator content
-- ============================================
CREATE TABLE content (
    content_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES creators(creator_id) ON DELETE CASCADE,
    platform_id SMALLINT NOT NULL REFERENCES platforms(platform_id),
    external_content_id VARCHAR(255),
    content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('post', 'story', 'reel', 'video', 'carousel', 'short')),
    category VARCHAR(100),
    title VARCHAR(500),
    description TEXT,
    posted_at TIMESTAMPTZ NOT NULL,
    day_of_week SMALLINT,
    hour_of_day SMALLINT,
    is_deleted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_content_creator 
        FOREIGN KEY (creator_id) 
        REFERENCES creators(creator_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_content_platform 
        FOREIGN KEY (platform_id) 
        REFERENCES platforms(platform_id)
);

-- Indexes for common queries
CREATE INDEX idx_content_creator ON content(creator_id);
CREATE INDEX idx_content_platform ON content(platform_id);
CREATE INDEX idx_content_posted_at ON content(posted_at DESC);
CREATE INDEX idx_content_type ON content(content_type);
CREATE INDEX idx_content_creator_posted ON content(creator_id, posted_at DESC);

-- Unique constraint for external content IDs per platform
CREATE UNIQUE INDEX idx_content_external 
    ON content(platform_id, external_content_id) 
    WHERE external_content_id IS NOT NULL;

-- ============================================
-- TABLE: campaigns
-- Business marketing campaigns
-- ============================================
CREATE TABLE campaigns (
    campaign_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    business_id UUID NOT NULL REFERENCES businesses(business_id) ON DELETE CASCADE,
    campaign_name VARCHAR(255) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    budget DECIMAL(12, 2),
    status VARCHAR(20) NOT NULL CHECK (status IN ('draft', 'active', 'paused', 'completed')) DEFAULT 'draft',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_campaign_business 
        FOREIGN KEY (business_id) 
        REFERENCES businesses(business_id) 
        ON DELETE CASCADE
);

CREATE INDEX idx_campaigns_business ON campaigns(business_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_dates ON campaigns(start_date, end_date);

-- ============================================
-- TABLE: campaign_creators
-- Many-to-many link between campaigns and creators
-- ============================================
CREATE TABLE campaign_creators (
    campaign_id UUID NOT NULL REFERENCES campaigns(campaign_id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES creators(creator_id) ON DELETE CASCADE,
    contracted_rate DECIMAL(10, 2),
    deliverables_count INTEGER DEFAULT 0,
    status VARCHAR(20) CHECK (status IN ('pending', 'active', 'completed')) DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    PRIMARY KEY (campaign_id, creator_id),
    
    CONSTRAINT fk_cc_campaign 
        FOREIGN KEY (campaign_id) 
        REFERENCES campaigns(campaign_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_cc_creator 
        FOREIGN KEY (creator_id) 
        REFERENCES creators(creator_id) 
        ON DELETE CASCADE
);

CREATE INDEX idx_campaign_creators_campaign ON campaign_creators(campaign_id);
CREATE INDEX idx_campaign_creators_creator ON campaign_creators(creator_id);

-- ============================================
-- Success message
-- ============================================
DO $$ 
BEGIN 
    RAISE NOTICE 'Core entities created successfully!';
    RAISE NOTICE 'Tables: users, platforms, creators, businesses, content, campaigns, campaign_creators';
END $$;
