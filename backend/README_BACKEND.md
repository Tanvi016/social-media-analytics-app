# FastAPI Backend - Setup Guide

## Prerequisites

1. **PostgreSQL Database**: Ensure PostgreSQL is installed and running
2. **Python 3.8+**: Python environment with pip
3. **Database Setup**: Database named `social-analytics` should be created

## Initial Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment

Copy the example environment file and update with your database credentials:

```bash
copy .env.example .env
```

Edit `.env` and update database credentials if different from defaults:
- `DB_NAME=social-analytics`
- `DB_USER=postgres`
- `DB_PASSWORD=password` (change this!)
- `DB_HOST=localhost`
- `DB_PORT=5432`

### 3. Create Database Tables

Run the SQL migrations in order:

```bash
# Connect to PostgreSQL and run these files:
psql -U postgres -d social-analytics -f sql_migrations/01_core_entities.sql
psql -U postgres -d social-analytics -f sql_migrations/02_raw_metrics.sql
psql -U postgres -d social-analytics -f sql_migrations/03_aggregates.sql
psql -U postgres -d social-analytics -f sql_migrations/04_intelligence.sql
```

Or use your PostgreSQL client (pgAdmin, DBeaver, etc.) to execute the scripts.

### 4. Seed Demo Data

Populate the database with sample data for testing:

```bash
python seed_sql.py
```

This will create:
- 10 Creator profiles
- 3 Business accounts
- 5 Active campaigns
- Campaign ROI metrics
- Content performance data
- AI insights

### 5. Start the API Server

```bash
uvicorn main:app --reload
```

The API will be available at: `http://localhost:8000`

## API Endpoints

### Core Endpoints

- **GET /** - API health check
- **GET /api/v1/health** - Database connectivity check

### Business Dashboard

- **GET /api/dashboard/stats** - Get campaign statistics
  - Query params: `business_id` (optional)
  - Returns: `{ active_count, total_spent, total_reach, avg_roi }`

### Creator Discovery

- **GET /api/creators/search** - Search for creators
  - Query params:
    - `domain` - Content niche (e.g., "fitness", "tech")
    - `region` - Geographic region (optional)
    - `min_engagement` - Minimum engagement rate (optional)
  - Returns: List of creators with match scores

### AI Insights

- **GET /api/ai/insight** - Get latest AI-generated insight
  - Query params: `user_id` (optional)
  - Returns: Latest insight with confidence score

## Testing

### Quick Test

```bash
# Test database connection
curl http://localhost:8000/api/v1/health

# Test dashboard stats
curl http://localhost:8000/api/dashboard/stats

# Test creator search
curl "http://localhost:8000/api/creators/search?domain=fitness"

# Test AI insights
curl http://localhost:8000/api/ai/insight
```

### Interactive API Documentation

Visit `http://localhost:8000/docs` for Swagger UI documentation.

## Database Architecture

The backend uses **raw SQL queries** with `psycopg2` (not an ORM) for:
- Direct control over queries
- Better performance for hackathon demo
- Clear understanding of database interactions

### Connection Pool

- Min connections: 2
- Max connections: 10
- Auto-reconnection on failure
- Proper cleanup on shutdown

## Troubleshooting

### Database Connection Failed

- Ensure PostgreSQL is running: `pg_ctl status`
- Verify database exists: `psql -U postgres -l | grep social-analytics`
- Check credentials in `.env` file

### Seeding Script Errors

- Make sure all 4 SQL migration files have been executed
- Check that tables exist: `psql -U postgres -d social-analytics -c "\dt"`

### Import Errors

- Verify all dependencies installed: `pip list | grep psycopg2`
- Re-run: `pip install -r requirements.txt`

## Project Structure

```
backend/
├── main.py              # FastAPI application with endpoints
├── database.py          # Database connection pool
├── seed_sql.py          # Data seeding script
├── requirements.txt     # Python dependencies
├── .env.example         # Environment template
├── sql_migrations/      # Database schema files
│   ├── 01_core_entities.sql
│   ├── 02_raw_metrics.sql
│   ├── 03_aggregates.sql
│   └── 04_intelligence.sql
└── README_BACKEND.md    # This file
```

## Next Steps

1. Ensure PostgreSQL is running
2. Create the database and run migrations
3. Seed demo data
4. Start the API server
5. Test endpoints
6. Connect frontend to backend

## Notes

- This backend is designed for a **hackathon demo** - prioritizes functionality over production features
- No authentication implemented yet (optional for MVP)
- All UUIDs are generated server-side
- Error handling is basic but functional
