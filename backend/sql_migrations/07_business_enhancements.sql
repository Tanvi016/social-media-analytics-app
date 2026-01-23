-- ============================================
-- SOCIAL MEDIA ANALYTICS DATABASE SCHEMA
-- File 7: Business Profile Enhancements
-- ============================================

-- Add new columns for enhanced business profile
ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS company_logo TEXT,
ADD COLUMN IF NOT EXISTS account_owner_role VARCHAR(100),
ADD COLUMN IF NOT EXISTS social_links JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS team_leads JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS visibility_settings JSONB DEFAULT '{
    "showLogo": true,
    "showCompanyName": true,
    "showDomain": true,
    "showBio": true,
    "showLeads": true,
    "showSocials": true
}'::jsonb;

-- Create index for faster JSONB queries if needed later
CREATE INDEX IF NOT EXISTS idx_businesses_social_links ON businesses USING gin (social_links);

DO $$ 
BEGIN 
    RAISE NOTICE 'Business profile enhancements applied successfully!';
END $$;
