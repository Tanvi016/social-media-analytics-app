-- ============================================
-- SOCIAL MEDIA ANALYTICS DATABASE SCHEMA
-- File 4: Intelligence (AI Outputs & Recommendations)
-- ============================================
-- Run this after 03_aggregates.sql
-- These tables power insights and recommendations
-- ============================================

-- ============================================
-- TABLE: insights
-- System-generated insights (rule-based or ML)
-- Powers "What's working" insight cards
-- ============================================
CREATE TABLE insights (
    insight_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    insight_type VARCHAR(50) NOT NULL CHECK (insight_type IN ('performance', 'timing', 'content_strategy', 'audience', 'growth', 'monetization')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    severity VARCHAR(20) CHECK (severity IN ('info', 'opportunity', 'warning')) DEFAULT 'info',
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    source_model VARCHAR(100) NOT NULL,
    confidence_score DECIMAL(3, 2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
    is_dismissed BOOLEAN DEFAULT FALSE,
    dismissed_at TIMESTAMPTZ,
    
    CONSTRAINT fk_insight_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id) 
        ON DELETE CASCADE
);

CREATE INDEX idx_insights_user ON insights(user_id);
CREATE INDEX idx_insights_type ON insights(insight_type);
CREATE INDEX idx_insights_generated ON insights(generated_at DESC);
CREATE INDEX idx_insights_active ON insights(user_id, is_dismissed, expires_at) 
    WHERE is_dismissed = FALSE;

-- ============================================
-- TABLE: insight_sources
-- Traceability from insights to source metrics
-- CRITICAL for explainability: "Why did you recommend this?"
-- ============================================
CREATE TABLE insight_sources (
    source_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    insight_id UUID NOT NULL REFERENCES insights(insight_id) ON DELETE CASCADE,
    source_table VARCHAR(100) NOT NULL,
    source_record_id UUID NOT NULL,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(20, 6),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_source_insight 
        FOREIGN KEY (insight_id) 
        REFERENCES insights(insight_id) 
        ON DELETE CASCADE
);

CREATE INDEX idx_sources_insight ON insight_sources(insight_id);
CREATE INDEX idx_sources_table ON insight_sources(source_table, source_record_id);

-- ============================================
-- TABLE: recommendations
-- Actionable suggestions with expected outcomes
-- One recommendation = one action
-- ============================================
CREATE TABLE recommendations (
    recommendation_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    recommendation_type VARCHAR(50) NOT NULL CHECK (recommendation_type IN ('posting_time', 'content_type', 'platform', 'collaboration', 'engagement_strategy', 'monetization')),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    platform_id SMALLINT REFERENCES platforms(platform_id),
    suggested_action TEXT NOT NULL,
    expected_outcome TEXT NOT NULL,
    priority SMALLINT CHECK (priority BETWEEN 1 AND 5) DEFAULT 3,
    generated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    acted_upon_at TIMESTAMPTZ,
    outcome_measured BOOLEAN DEFAULT FALSE,
    source_model VARCHAR(100) NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    
    CONSTRAINT fk_recommendation_user 
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id) 
        ON DELETE CASCADE,
    CONSTRAINT fk_recommendation_platform 
        FOREIGN KEY (platform_id) 
        REFERENCES platforms(platform_id)
);

CREATE INDEX idx_recommendations_user ON recommendations(user_id);
CREATE INDEX idx_recommendations_type ON recommendations(recommendation_type);
CREATE INDEX idx_recommendations_priority ON recommendations(priority DESC);
CREATE INDEX idx_recommendations_generated ON recommendations(generated_at DESC);
CREATE INDEX idx_recommendations_active ON recommendations(user_id, acted_upon_at) 
    WHERE acted_upon_at IS NULL;

-- GIN index for metadata queries
CREATE INDEX idx_recommendations_metadata ON recommendations USING GIN (metadata);

-- ============================================
-- TABLE: recommendation_sources
-- Links recommendations to triggering metrics
-- Establishes causality between data and recommendations
-- ============================================
CREATE TABLE recommendation_sources (
    source_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recommendation_id UUID NOT NULL REFERENCES recommendations(recommendation_id) ON DELETE CASCADE,
    source_table VARCHAR(100) NOT NULL,
    source_record_id UUID NOT NULL,
    trigger_condition JSONB NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    CONSTRAINT fk_rec_source_recommendation 
        FOREIGN KEY (recommendation_id) 
        REFERENCES recommendations(recommendation_id) 
        ON DELETE CASCADE
);

CREATE INDEX idx_rec_sources_recommendation ON recommendation_sources(recommendation_id);
CREATE INDEX idx_rec_sources_table ON recommendation_sources(source_table, source_record_id);

-- GIN index for trigger condition queries
CREATE INDEX idx_rec_sources_trigger ON recommendation_sources USING GIN (trigger_condition);

-- ============================================
-- TABLE: ml_model_metadata
-- Tracks ML model versions and performance
-- For future ML implementation
-- ============================================
CREATE TABLE ml_model_metadata (
    model_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    model_name VARCHAR(100) NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    model_type VARCHAR(50) NOT NULL,
    training_date TIMESTAMPTZ NOT NULL,
    performance_metrics JSONB DEFAULT '{}'::jsonb,
    feature_importance JSONB DEFAULT '{}'::jsonb,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    UNIQUE (model_name, model_version)
);

CREATE INDEX idx_models_name ON ml_model_metadata(model_name);
CREATE INDEX idx_models_active ON ml_model_metadata(is_active, model_name);

-- ============================================
-- Success message
-- ============================================
DO $$ 
BEGIN 
    RAISE NOTICE 'Intelligence tables created successfully!';
    RAISE NOTICE 'Tables: insights, insight_sources, recommendations, recommendation_sources, ml_model_metadata';
    RAISE NOTICE 'Your database schema is complete and ready to use!';
    RAISE NOTICE '';
    RAISE NOTICE '========================================';
    RAISE NOTICE 'NEXT STEPS:';
    RAISE NOTICE '1. Verify all tables: SELECT tablename FROM pg_tables WHERE schemaname = ''public'';';
    RAISE NOTICE '2. Check table counts: SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = ''public'';';
    RAISE NOTICE '3. Connect FastAPI to this database';
    RAISE NOTICE '========================================';
END $$;
