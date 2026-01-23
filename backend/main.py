from fastapi import FastAPI, HTTPException, Query, Body
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from contextlib import asynccontextmanager
import os
import csv
import io
from dotenv import load_dotenv
from database import Database, get_db_connection, get_db_cursor
from typing import Optional, List, Dict, Any
from decimal import Decimal
from pydantic import BaseModel

class ExplainRequest(BaseModel):
    creator_id: str

class ContactRequest(BaseModel):
    sender_id: str
    receiver_id: str
    business_name: str
    campaign_goal: str
    metrics_justification: Optional[Dict[str, Any]] = None
    best_content_type: Optional[str] = None
    best_posting_time: Optional[str] = None
    subject: str = "Collaboration Opportunity"
    body: str

# Import services
from services.analytics_service import AnalyticsService
from services.trends_service import TrendsService
from services.recommendations_service import RecommendationsService
from services.collaboration_service import CollaborationService
from services.business_service import BusinessService

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 Starting Social Media Analytics API...")
    Database.initialize()
    yield
    Database.close_all_connections()
    print("👋 Shutting down Social Media Analytics API...")


app = FastAPI(
    title="Social Media Analytics API",
    description="Backend API for Creator-Business Intelligence Platform",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:5174").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "online",
        "message": "Social Media Analytics API",
        "version": "1.0.0"
    }


@app.get("/api/v1/health")
async def health_check():
    """API health check with database connectivity"""
    try:
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            cursor.execute("SELECT 1")
            cursor.close()
            db_status = "connected"
    except Exception as e:
        db_status = f"error: {str(e)}"
    
    return {
        "status": "healthy",
        "database": db_status
    }


# --- CREATOR DASHBOARD ENDPOINTS ---

@app.get("/api/dashboard/overview")
async def get_overview(
    creator_id: str, 
    platform: Optional[str] = None, 
    date_range: Optional[str] = None
):
    return AnalyticsService.get_dashboard_overview(creator_id, platform, date_range)


@app.get("/api/dashboard/platform-breakdown")
async def get_platform_breakdown(creator_id: str):
    return AnalyticsService.get_platform_breakdown(creator_id)


@app.get("/api/dashboard/content-format-comparison")
async def get_content_format_comparison(creator_id: str):
    return AnalyticsService.get_content_format_comparison(creator_id)


@app.get("/api/dashboard/trends")
async def get_trends(creator_id: str):
    return TrendsService.get_trends(creator_id)


@app.get("/api/dashboard/posting-time-analysis")
async def get_posting_time_analysis(creator_id: str):
    return AnalyticsService.get_posting_time_analysis(creator_id)


@app.get("/api/creator/profile-metrics")
async def get_creator_profile_metrics(creator_id: str):
    return AnalyticsService.get_profile_metrics(creator_id)


@app.get("/api/creator/audience-insights")
async def get_audience_insights(creator_id: str):
    return AnalyticsService.get_audience_insights(creator_id)


@app.get("/api/creator/monetization")
async def get_monetization(creator_id: str):
    return AnalyticsService.get_monetization_metrics(creator_id)


@app.get("/api/business/profile")
async def get_business_profile(user_id: str):
    return BusinessService.get_business_profile(user_id)


# --- AI & RECOMMENDATIONS ENDPOINTS ---

@app.post("/api/ai/explain")
async def explain_performance(request: ExplainRequest):
    """
    AI EXPLANATION STUB (NO MODELS)
    Returns structured facts with placeholder explanation text.
    """
    creator_id = request.creator_id
    trends = TrendsService.get_trends(creator_id)
    facts = trends['facts']
    
    explanation = "Engagement dropped due to reduced posting frequency and increased static posts."
    recommendation = "Increase reel frequency and post during peak hours."
    
    if facts['engagement_change'].startswith('+'):
        explanation = "Engagement is up due to high-performing video content and consistent posting."
        recommendation = "Continue with current strategy and explore more video collaborations."

    return {
        "facts": facts,
        "explanation": explanation,
        "recommendation": recommendation
    }


@app.get("/api/recommendations")
async def get_recommendations(creator_id: str):
    return RecommendationsService.get_recommendations(creator_id)


@app.get("/api/notifications")
async def get_notifications(user_id: str):
    return CollaborationService.get_notifications(user_id)


# --- COLLABORATION ENDPOINTS ---

@app.post("/api/business/contact-creator")
async def contact_creator(payload: ContactRequest):
    return CollaborationService.send_email(payload.sender_id, payload.receiver_id, payload.dict())


@app.get("/api/creator/inbox")
async def get_inbox(user_id: str):
    return CollaborationService.get_inbox(user_id)


@app.get("/api/creator/inbox/{email_id}")
async def get_email_detail(email_id: str):
    return CollaborationService.get_email_detail(email_id)


# --- PROFILE & REPORTS ---

@app.get("/api/profile")
async def get_profile(user_id: str):
    try:
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            cursor.execute("""
                SELECT u.user_id, u.username, u.display_name, u.email, u.user_type,
                       c.bio, c.content_categories, c.verified
                FROM users u
                LEFT JOIN creators c ON u.user_id = c.user_id
                WHERE u.user_id = %s
            """, (user_id,))
            user = cursor.fetchone()
            
            if not user:
                raise HTTPException(status_code=404, detail="User not found")
                
            # Add summary stats
            stats = AnalyticsService.get_dashboard_overview(user_id) if user['user_type'] == 'creator' else {}
            
            return {
                "user": user,
                "analytics_summary": stats
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/reports/export")
async def export_report(creator_id: str, format: str = "csv"):
    if format != "csv":
        raise HTTPException(status_code=400, detail="Only CSV format is supported")
    
    with get_db_connection() as conn:
        cursor = get_db_cursor(conn)
        cursor.execute("SELECT * FROM posts_master WHERE creator_id = %s", (creator_id,))
        posts = cursor.fetchall()
        
        if not posts:
            raise HTTPException(status_code=404, detail="No data to export")
            
        output = io.StringIO()
        writer = csv.DictWriter(output, fieldnames=posts[0].keys())
        writer.writeheader()
        writer.writerows(posts)
        
        response = Response(content=output.getvalue())
        response.headers["Content-Disposition"] = f"attachment; filename=analytics_report_{creator_id}.csv"
        response.headers["Content-Type"] = "text/csv"
        return response


# --- LEGACY / OTHER ENDPOINTS ---

@app.get("/api/dashboard/stats")
async def get_dashboard_stats(business_id: Optional[str] = None):
    # (Existing implementation kept for compatibility)
    try:
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            query = """
                SELECT 
                    COUNT(DISTINCT c.campaign_id) as active_count,
                    COALESCE(SUM(r.total_spend), 0) as total_spent,
                    COALESCE(SUM(r.total_reach), 0) as total_reach,
                    COALESCE(AVG(r.roi), 0) as avg_roi
                FROM campaigns c
                LEFT JOIN campaign_roi_summary r ON c.campaign_id = r.campaign_id
                WHERE c.status = 'active'
            """
            if business_id:
                query += " AND c.business_id = %s"
                cursor.execute(query, (business_id,))
            else:
                cursor.execute(query)
            result = cursor.fetchone()
            return {
                "active_count": int(result['active_count'] or 0),
                "total_spent": float(result['total_spent'] or 0),
                "total_reach": int(result['total_reach'] or 0),
                "avg_roi": float(result['avg_roi'] or 0)
            }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/creators/search")
async def search_creators(
    domain: Optional[str] = Query(None, description="Content niche/domain"),
    region: Optional[str] = Query(None, description="Geographic region"),
    min_engagement: Optional[float] = Query(None, description="Minimum engagement rate")
):
    """
    Search for creators based on filters
    Returns list of creators with calculated match scores
    """
    try:
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            
            # Simple search logic for demo
            query = """
                SELECT 
                    c.creator_id, u.user_id, u.username, u.display_name, u.email, c.bio, 
                    c.content_categories, c.verified
                FROM creators c
                INNER JOIN users u ON c.user_id = u.user_id
                WHERE u.user_type = 'creator'
            """
            cursor.execute(query)
            results = cursor.fetchall()
            
            creators = []
            for row in results:
                # Mock stats for search results
                stats = AnalyticsService.get_dashboard_overview(str(row['creator_id']))
                match_score = calculate_match_score(
                    engagement_rate=stats['engagement_rate'],
                    verified=row['verified'],
                    domain_match=(domain in (row['content_categories'] or [])) if domain else False
                )
                
                creators.append({
                    **row,
                    "stats": stats,
                    "match_score": match_score
                })
            
            return {"creators": creators, "count": len(creators)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


def calculate_match_score(engagement_rate: float, verified: bool, domain_match: bool) -> float:
    score = 0.0
    score += min(engagement_rate * 10, 50)
    if verified: score += 20
    if domain_match: score += 30
    return round(min(score, 100), 2)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

