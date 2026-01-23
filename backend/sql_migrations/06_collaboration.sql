-- ============================================
-- SOCIAL MEDIA ANALYTICS DATABASE SCHEMA
-- File 6: Collaboration & Notifications
-- ============================================

-- Emails Table for Creator-Business contact
CREATE TABLE emails (
    email_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    receiver_user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    business_name VARCHAR(255),
    campaign_goal TEXT,
    metrics_justification JSONB, -- stores formatted facts for "why selected"
    best_content_type VARCHAR(50),
    best_posting_time VARCHAR(100),
    subject VARCHAR(255),
    body TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Notifications Table
CREATE TABLE notifications (
    notification_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) CHECK (type IN ('engagement_drop', 'new_recommendation', 'business_contact', 'system')),
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_emails_receiver ON emails(receiver_user_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_unread ON notifications(user_id) WHERE is_read = FALSE;
