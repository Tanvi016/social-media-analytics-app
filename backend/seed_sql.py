import psycopg2
from psycopg2.extras import RealDictCursor
import uuid
from datetime import datetime, timedelta, date
import random
import os
from dotenv import load_dotenv

load_dotenv()


def get_connection():
    """Create database connection"""
    return psycopg2.connect(
        dbname=os.getenv("DB_NAME", "social-analytics"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD", "password"),
        host=os.getenv("DB_HOST", "localhost"),
        port=os.getenv("DB_PORT", "5432")
    )


def clear_existing_data(conn):
    """Clear existing data from tables (optional, for clean slate)"""
    print("🗑️  Clearing existing data...")
    cursor = conn.cursor()
    
    tables = [
        'notifications',
        'emails',
        'posts_master',
        'recommendation_sources',
        'recommendations',
        'insight_sources',
        'insights',
        'ml_model_metadata',
        'campaign_roi_summary',
        'platform_comparison_aggregates',
        'creator_weekly_summary',
        'content_daily_performance',
        'campaign_performance_events',
        'follower_growth_snapshots',
        'content_engagement_snapshots',
        'ingestion_errors',
        'campaign_creators',
        'campaigns',
        'content',
        'creators',
        'businesses',
        'platforms',
        'users'
    ]
    
    for table in tables:
        try:
            cursor.execute(f"DROP TABLE IF EXISTS {table} CASCADE")
            print(f"   ✓ Dropped {table}")
        except Exception as e:
            print(f"   ⚠ Could not drop {table}: {e}")
            conn.rollback()
    
    cursor.close()
    conn.commit()
    print("✅ Schema cleared\n")


def reapply_migrations(conn):
    """Reapplies all migration files to rebuild the schema"""
    print("📜 Reapplying migrations...")
    cursor = conn.cursor()
    
    migration_dir = os.path.join(os.path.dirname(__file__), 'sql_migrations')
    migration_files = sorted([f for f in os.listdir(migration_dir) if f.endswith('.sql')])
    
    for filename in migration_files:
        print(f"   🚀 Running {filename}...")
        with open(os.path.join(migration_dir, filename), 'r') as f:
            cursor.execute(f.read())
    
    cursor.close()
    conn.commit()
    print("✅ Migrations applied\n")


def seed_creators(conn):
    """Create 10 creator users with profiles"""
    print("👥 Seeding creators...")
    cursor = conn.cursor()
    
    creators_data = [
        ("fitness_alex", "Alex Johnson", "alex@fitcreator.com", "Fitness & Wellness", 
         "Certified personal trainer sharing workout routines and nutrition tips", 1, ["fitness", "wellness", "nutrition"]),
        ("foodie_sarah", "Sarah Chen", "sarah@foodblog.com", "Food & Lifestyle",
         "Food blogger exploring culinary adventures around the world", 1, ["food", "travel", "lifestyle"]),
        ("tech_mike", "Mike Rodriguez", "mike@techreview.com", "Technology",
         "Tech enthusiast reviewing latest gadgets and software", 2, ["technology", "reviews", "gadgets"]),
        ("beauty_emma", "Emma Wilson", "emma@beautytips.com", "Beauty & Fashion",
         "Makeup artist and beauty influencer sharing tips and tutorials", 1, ["beauty", "fashion", "makeup"]),
        ("travel_james", "James Patterson", "james@wanderlust.com", "Travel & Adventure",
         "Adventure seeker documenting journeys across 6 continents", 1, ["travel", "adventure", "photography"]),
        ("gaming_lily", "Lily Zhang", "lily@gamingpro.com", "Gaming & Esports",
         "Professional gamer and Twitch streamer", 3, ["gaming", "esports", "streaming"]),
        ("finance_david", "David Kumar", "david@moneytalk.com", "Finance & Investment",
         "Financial advisor sharing investment strategies and market insights", 2, ["finance", "investment", "business"]),
        ("yoga_sophia", "Sophia Martinez", "sophia@yogalife.com", "Wellness & Mindfulness",
         "Certified yoga instructor promoting mental and physical wellness", 1, ["yoga", "wellness", "mindfulness"]),
        ("art_oliver", "Oliver Smith", "oliver@artcreative.com", "Art & Design",
         "Digital artist sharing creative process and design inspiration", 1, ["art", "design", "creativity"]),
        ("music_maria", "Maria Garcia", "maria@musicvibes.com", "Music & Entertainment",
         "Music producer and DJ with 500K+ followers", 3, ["music", "entertainment", "production"])
    ]
    
    creator_ids = []
    
    for username, display_name, email, title, bio, platform_id, categories in creators_data:
        user_id = str(uuid.uuid4())
        creator_id = str(uuid.uuid4())
        
        cursor.execute("""
            INSERT INTO users (user_id, username, user_type, email, display_name)
            VALUES (%s, %s, 'creator', %s, %s)
        """, (user_id, username, email, display_name))
        
        cursor.execute("""
            INSERT INTO creators (creator_id, user_id, bio, primary_platform, content_categories, verified)
            VALUES (%s, %s, %s, %s, %s, %s)
        """, (creator_id, user_id, bio, platform_id, categories, random.choice([True, False])))
        
        creator_ids.append({
            'creator_id': creator_id,
            'user_id': user_id,
            'username': username,
            'display_name': display_name,
            'platform_id': platform_id,
            'categories': categories
        })
        
        print(f"   ✓ Created creator: {username}")
    
    cursor.close()
    conn.commit()
    print(f"✅ Created {len(creator_ids)} creators\n")
    return creator_ids


def seed_businesses(conn):
    """Create 3 business users"""
    print("🏢 Seeding businesses...")
    cursor = conn.cursor()
    
    businesses_data = [
        ("brandx_marketing", "BrandX Corp", "marketing@brandx.com", "BrandX Marketing Team",
         "Consumer Electronics", "https://brandx.com", "Tech-savvy millennials aged 25-40"),
        ("healthco_team", "HealthCo Inc", "team@healthco.com", "HealthCo Partnership Team",
         "Health & Wellness", "https://healthco.com", "Health-conscious individuals 18-45"),
        ("fashionnova_biz", "FashionNova", "partnerships@fashionnova.com", "FashionNova Influencer Team",
         "Fashion & Apparel", "https://fashionnova.com", "Fashion-forward Gen Z and millennials")
    ]
    
    business_ids = []
    
    for username, company_name, email, display_name, industry, website, target_audience in businesses_data:
        user_id = str(uuid.uuid4())
        business_id = str(uuid.uuid4())
        
        cursor.execute("""
            INSERT INTO users (user_id, username, user_type, email, display_name)
            VALUES (%s, %s, 'business', %s, %s)
        """, (user_id, username, email, display_name))
        
        cursor.execute("""
            INSERT INTO businesses (
                business_id, user_id, company_name, industry, website, 
                target_audience_description, company_logo, account_owner_role,
                social_links, team_leads, visibility_settings
            )
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (
            business_id, user_id, company_name, industry, website, target_audience,
            # New fields with dummy data
            f"https://logo.clearbit.com/{website.replace('https://', '')}", # company_logo
            "Marketing Manager", # account_owner_role
            '{"instagram": "https://instagram.com/company", "linkedin": "https://linkedin.com/company/company"}', # social_links
            '[{"name": "Lead 1", "title": "Head of Partnerships", "email": "lead1@example.com"}]', # team_leads
            '{"showLogo": true, "showCompanyName": true, "showDomain": true, "showBio": true, "showLeads": true, "showSocials": true}' # visibility_settings
        ))
        
        business_ids.append({
            'business_id': business_id,
            'user_id': user_id,
            'username': username,
            'company_name': company_name
        })
        
        print(f"   ✓ Created business: {company_name}")
    
    cursor.close()
    conn.commit()
    print(f"✅ Created {len(business_ids)} businesses\n")
    return business_ids


def seed_posts_master(conn, creator_ids):
    print("📝 Seeding posts_master...")
    cursor = conn.cursor()
    
    platforms = ['instagram', 'youtube', 'tiktok', 'facebook']
    content_types = ['reel', 'carousel', 'static', 'video', 'short']
    
    for creator in creator_ids:
        creator_id = creator['creator_id']
        
        # Seed 30 posts for each creator
        for i in range(30):
            platform = random.choice(platforms)
            content_type = random.choice(content_types)
            post_datetime = datetime.now() - timedelta(days=random.randint(0, 30), hours=random.randint(0, 23))
            
            views = random.randint(1000, 50000)
            likes = int(views * random.uniform(0.01, 0.1))
            comments = int(views * random.uniform(0.001, 0.01))
            shares = int(views * random.uniform(0.001, 0.005))
            
            cursor.execute("""
                INSERT INTO posts_master (
                    platform, creator_id, account_type, caption_text, 
                    content_type, post_datetime, views, likes, comments, shares
                ) VALUES (%s, %s, 'creator', %s, %s, %s, %s, %s, %s, %s)
            """, (
                platform, creator_id, f"Awesome {content_type} about {random.choice(creator['categories'])}",
                content_type, post_datetime, views, likes, comments, shares
            ))
            
    cursor.close()
    conn.commit()
    print("✅ posts_master seeded\n")


def seed_collaboration(conn, creator_ids, business_ids):
    print("✉️ Seeding emails and notifications...")
    cursor = conn.cursor()
    
    for business in business_ids:
        # Each business contacts 2 random creators
        selected_creators = random.sample(creator_ids, 2)
        for creator in selected_creators:
            cursor.execute("""
                INSERT INTO emails (
                    sender_user_id, receiver_user_id, business_name, subject, body, 
                    campaign_goal, metrics_justification
                ) VALUES (%s, %s, %s, %s, %s, %s, %s)
            """, (
                business['user_id'], creator['user_id'], business['company_name'],
                "Collaboration Opportunity", "We love your content and want to work with you!",
                "Brand Awareness", '{"engagement_rate": "5.2%", "reach": "high"}'
            ))
            
    cursor.close()
    conn.commit()
    print("✅ Collaboration data seeded\n")


def main():
    """Main seeding function"""
    print("=" * 60)
    print("🌱 SOCIAL MEDIA ANALYTICS - DATABASE SEEDING")
    print("=" * 60)
    print()
    
    try:
        conn = get_connection()
        print("✅ Connected to database\n")
        
        clear_existing_data(conn)
        reapply_migrations(conn)
        
        creator_ids = seed_creators(conn)
        business_ids = seed_businesses(conn)
        seed_posts_master(conn, creator_ids)
        seed_collaboration(conn, creator_ids, business_ids)
        
        conn.close()
        
        print("=" * 60)
        print("🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!")
        print("=" * 60)
        
    except Exception as e:
        print(f"❌ Error: {e}")
        # import traceback
        # traceback.print_exc()
        return 1
    
    return 0


if __name__ == "__main__":
    import sys
    sys.exit(main())
