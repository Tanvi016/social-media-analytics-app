# FastAPI Backend Project Structure

## Directories

```
backend/
├── venv/                    # Virtual environment
├── app/
│   ├── __init__.py
│   ├── api/                 # API routes
│   │   ├── __init__.py
│   │   ├── v1/
│   │   │   ├── __init__.py
│   │   │   ├── endpoints/
│   │   │   │   ├── __init__.py
│   │   │   │   ├── creators.py
│   │   │   │   ├── businesses.py
│   │   │   │   ├── content.py
│   │   │   │   ├── analytics.py
│   │   │   │   ├── insights.py
│   │   │   │   └── recommendations.py
│   │   │   └── api.py
│   ├── core/                # Core configuration
│   │   ├── __init__.py
│   │   ├── config.py
│   │   ├── security.py
│   │   └── deps.py
│   ├── models/              # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── creator.py
│   │   ├── business.py
│   │   ├── content.py
│   │   ├── metrics.py
│   │   ├── aggregates.py
│   │   └── intelligence.py
│   ├── schemas/             # Pydantic schemas
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── creator.py
│   │   ├── content.py
│   │   └── analytics.py
│   ├── crud/                # Database operations
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── creator.py
│   │   └── content.py
│   ├── db/                  # Database setup
│   │   ├── __init__.py
│   │   ├── base.py
│   │   ├── session.py
│   │   └── init_db.py
│   └── services/            # Business logic
│       ├── __init__.py
│       ├── analytics.py
│       ├── insights.py
│       └── recommendations.py
├── alembic/                 # Database migrations
│   ├── versions/
│   └── env.py
├── tests/
│   ├── __init__.py
│   ├── test_api/
│   └── test_services/
├── main.py                  # Application entry point
├── requirements.txt
├── .env.example
├── .env                     # Your local config (not in git)
├── .gitignore
└── README.md
```

## Quick Start

### 1. Activate Virtual Environment

**Windows:**
```bash
backend\venv\Scripts\activate
```

**Linux/Mac:**
```bash
source backend/venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Up Environment

```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 4. Run the Server

```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --port 8000
```

### 5. Access API Documentation

- Interactive docs: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

## Database Setup (Next Steps)

1. Install PostgreSQL locally or use Docker
2. Create database: `createdb social_analytics`
3. Run migrations: `alembic upgrade head`

## Development Workflow

1. Create feature branch
2. Develop with hot reload (`uvicorn --reload`)
3. Write tests in `tests/`
4. Run tests: `pytest`
5. Format code: `black app/`
6. Type check: `mypy app/`
