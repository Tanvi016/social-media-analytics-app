-- ============================================
-- SOCIAL MEDIA ANALYTICS DATABASE SCHEMA
-- File 5: Canonical Posts Master
-- ============================================

CREATE TABLE posts_master (
    post_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    platform VARCHAR(50) NOT NULL, -- 'instagram' | 'youtube' | 'tiktok' | 'facebook'
    creator_id UUID NOT NULL REFERENCES creators(creator_id) ON DELETE CASCADE,
    account_type VARCHAR(20) NOT NULL CHECK (account_type IN ('creator', 'business')),
    
    -- Content
    caption_text TEXT,
    hashtags TEXT[],
    content_type VARCHAR(50) NOT NULL CHECK (content_type IN ('reel', 'carousel', 'static', 'video', 'short')),
    duration INTEGER, -- in seconds
    content_length_bucket VARCHAR(20) CHECK (content_length_bucket IN ('short', 'medium', 'long')),
    
    -- Time
    post_datetime TIMESTAMPTZ NOT NULL,
    post_hour INTEGER, -- derived
    post_day INTEGER, -- derived (1-7)
    days_since_post INTEGER, -- derived
    
    -- Reach & Engagement
    views BIGINT NOT NULL DEFAULT 0,
    impressions BIGINT,
    likes BIGINT NOT NULL DEFAULT 0,
    comments BIGINT NOT NULL DEFAULT 0,
    shares BIGINT NOT NULL DEFAULT 0,
    followers_at_post BIGINT,
    
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_posts_creator ON posts_master(creator_id);
CREATE INDEX idx_posts_platform ON posts_master(platform);
CREATE INDEX idx_posts_datetime ON posts_master(post_datetime DESC);
CREATE INDEX idx_posts_type ON posts_master(content_type);

-- Triggers to auto-fill derived fields (hour, day)
CREATE OR REPLACE FUNCTION fill_post_derived_fields()
RETURNS TRIGGER AS $$
BEGIN
    NEW.post_hour := EXTRACT(HOUR FROM NEW.post_datetime);
    NEW.post_day := EXTRACT(DOW FROM NEW.post_datetime);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_fill_post_derived
BEFORE INSERT OR UPDATE ON posts_master
FOR EACH ROW
EXECUTE FUNCTION fill_post_derived_fields();
