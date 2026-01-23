# PostgreSQL Database Setup Instructions

## 📋 Overview

This directory contains SQL migration scripts to create the complete database schema for the Social Media Analytics platform.

**Total Tables:** 20+  
**Organized in:** 4 migration files  
**Execution Time:** ~2 minutes

---

## 🗂️ Migration Files (Run in Order)

1. **01_core_entities.sql** - Foundation tables (users, creators, businesses, content)
2. **02_raw_metrics.sql** - Append-only event data (snapshots, campaign events)
3. **03_aggregates.sql** - Pre-computed summaries for dashboards
4. **04_intelligence.sql** - AI insights and recommendations

---

## 🚀 Quick Start

### Option 1: Run All Scripts at Once (Recommended)

In pgAdmin:

1. Open **Query Tool** (Tools → Query Tool)
2. Open each file in order and execute:
   - File → Open → Select `01_core_entities.sql`
   - Click ▶️ Execute/Refresh (or press F5)
   - Repeat for files 02, 03, 04

### Option 2: Command Line (PostgreSQL psql)

```powershell
cd backend\sql_migrations

# Connect to database
psql -U postgres -d social_analytics

# Run migrations in order
\i 01_core_entities.sql
\i 02_raw_metrics.sql
\i 03_aggregates.sql
\i 04_intelligence.sql

# Verify
\dt
```

---

## ✅ Verification

### Check All Tables Were Created

```sql
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
```

**Expected output:** 20 table names

### Count Tables

```sql
SELECT COUNT(*) as total_tables
FROM information_schema.tables 
WHERE table_schema = 'public';
```

**Expected:** 20 (or more if you have additional tables)

### View Table Details

```sql
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns 
     WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
ORDER BY table_name;
```

---

## 📊 What Gets Created

### Core Entities (File 01)
- ✅ `users` - Central user registry
- ✅ `platforms` - Social platforms (pre-populated with Instagram, YouTube, etc.)
- ✅ `creators` - Creator profiles
- ✅ `businesses` - Business profiles
- ✅ `content` - Content metadata
- ✅ `campaigns` - Marketing campaigns
- ✅ `campaign_creators` - Campaign-creator relationships

### Raw Metrics (File 02)
- ✅ `content_engagement_snapshots` - Time-series performance data
- ✅ `follower_growth_snapshots` - Follower tracking
- ✅ `campaign_performance_events` - Campaign event stream
- ✅ `ingestion_errors` - Error logging

### Aggregates (File 03)
- ✅ `content_daily_performance` - Daily content rollups
- ✅ `creator_weekly_summary` - Weekly creator stats
- ✅ `platform_comparison_aggregates` - Cross-platform comparisons
- ✅ `campaign_roi_summary` - Campaign ROI tracking

### Intelligence (File 04)
- ✅ `insights` - System-generated insights
- ✅ `insight_sources` - Insight traceability
- ✅ `recommendations` - Actionable recommendations
- ✅ `recommendation_sources` - Recommendation traceability
- ✅ `ml_model_metadata` - ML model versioning

---

## 🔧 Common Issues & Solutions

### Issue: "relation already exists"

**Cause:** Tables already created  
**Solution:** Drop and recreate:

```sql
-- Drop all tables (CAREFUL: This deletes all data!)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;

-- Re-run all migration files
```

### Issue: "permission denied for schema public"

**Cause:** Insufficient permissions  
**Solution:**

```sql
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres;
```

### Issue: "uuid-ossp extension not found"

**Cause:** Extension not installed  
**Solution:**

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

---

## 🎯 Next Steps After Migration

### 1. Connect FastAPI to Database

Update `backend/.env`:

```env
DATABASE_URL=postgresql+asyncpg://postgres:your_password@localhost:5432/social_analytics
```

### 2. Install Database Dependencies

```powershell
cd backend
.\venv\Scripts\activate
pip install sqlalchemy asyncpg alembic psycopg2-binary
```

### 3. Create SQLAlchemy Models

Match the SQL schema in Python using SQLAlchemy ORM models in `backend/app/models/`.

### 4. Test Connection

Create `backend/test_db.py`:

```python
import asyncio
import asyncpg

async def test_connection():
    conn = await asyncpg.connect(
        user='postgres',
        password='your_password',
        database='social_analytics',
        host='localhost'
    )
    
    version = await conn.fetchval('SELECT version()')
    print(f"✅ Connected! PostgreSQL version: {version}")
    
    tables = await conn.fetch("""
        SELECT tablename FROM pg_tables 
        WHERE schemaname = 'public'
        ORDER BY tablename
    """)
    
    print(f"\n📊 Total tables: {len(tables)}")
    for table in tables:
        print(f"  - {table['tablename']}")
    
    await conn.close()

asyncio.run(test_connection())
```

Run: `python test_db.py`

---

## 📚 Architecture Documentation

- **Database Schema:** `database_architecture.md`
- **Data Flow:** `data_flow_architecture.md`
- **Backend Setup:** `backend/README.md`

---

## 🆘 Need Help?

Check the main walkthrough: `walkthrough.md`

All documentation is in the `brain/` artifacts directory.
