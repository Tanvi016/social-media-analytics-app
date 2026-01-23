from database import get_db_connection, get_db_cursor
from typing import List, Dict, Any, Optional
from datetime import datetime, timedelta

class AnalyticsService:
    @staticmethod
    def get_dashboard_overview(creator_id: str, platform: Optional[str] = None, date_range: Optional[str] = None) -> Dict[str, Any]:
        """
        Computes total engagement, engagement rate, and platform metrics.
        engagement_score = (likes + comments + shares) / views
        """
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            
            query = """
                SELECT 
                    COALESCE(SUM(views), 0) as total_views,
                    COALESCE(SUM(likes), 0) as total_likes,
                    COALESCE(SUM(comments), 0) as total_comments,
                    COALESCE(SUM(shares), 0) as total_shares,
                    COUNT(*) as total_posts
                FROM posts_master
                WHERE creator_id = %s
            """
            params = [creator_id]
            
            if platform:
                query += " AND platform = %s"
                params.append(platform)
            
            if date_range == '7d':
                query += " AND post_datetime >= NOW() - INTERVAL '7 days'"
            elif date_range == '30d':
                query += " AND post_datetime >= NOW() - INTERVAL '30 days'"
            
            cursor.execute(query, params)
            result = cursor.fetchone()
            
            if not result or not result['total_views']:
                return {
                    "total_engagement": 0,
                    "engagement_rate": 0,
                    "total_views": 0,
                    "total_posts": 0
                }
            
            total_engagement = (result['total_likes'] or 0) + (result['total_comments'] or 0) + (result['total_shares'] or 0)
            engagement_rate = (total_engagement / result['total_views']) if result['total_views'] > 0 else 0
            
            return {
                "total_engagement": int(total_engagement),
                "engagement_rate": float(engagement_rate),
                "total_views": int(result['total_views']),
                "total_likes": int(result['total_likes'] or 0),
                "total_comments": int(result['total_comments'] or 0),
                "total_shares": int(result['total_shares'] or 0),
                "total_posts": int(result['total_posts'])
            }

    @staticmethod
    def get_platform_breakdown(creator_id: str) -> List[Dict[str, Any]]:
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            
            query = """
                SELECT 
                    platform,
                    SUM(views) as views,
                    SUM(likes + comments + shares) as engagement,
                    COUNT(*) as post_count
                FROM posts_master
                WHERE creator_id = %s
                GROUP BY platform
            """
            cursor.execute(query, (creator_id,))
            results = cursor.fetchall()
            
            breakdown = []
            for row in results:
                er = (row['engagement'] / row['views']) if row['views'] > 0 else 0
                breakdown.append({
                    "platform": row['platform'],
                    "views": int(row['views']),
                    "engagement": int(row['engagement']),
                    "engagement_rate": float(er),
                    "post_count": int(row['post_count'])
                })
            return breakdown

    @staticmethod
    def get_content_format_comparison(creator_id: str) -> List[Dict[str, Any]]:
        """
        Compare Reels vs Carousels vs Static posts
        """
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            
            query = """
                SELECT 
                    content_type,
                    AVG((likes + comments + shares)::float / NULLIF(views, 0)) as avg_engagement_score,
                    AVG(views) as avg_reach,
                    COUNT(*) as post_count
                FROM posts_master
                WHERE creator_id = %s
                GROUP BY content_type
            """
            cursor.execute(query, (creator_id,))
            results = cursor.fetchall()
            
            comparison = []
            for row in results:
                comparison.append({
                    "content_type": row['content_type'],
                    "avg_engagement_score": float(row['avg_engagement_score'] or 0),
                    "avg_reach": float(row['avg_reach'] or 0),
                    "post_count": int(row['post_count'])
                })
            return comparison

    @staticmethod
    def get_posting_time_analysis(creator_id: str) -> Dict[str, Any]:
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            
            # Engagement by Hour
            cursor.execute("""
                SELECT 
                    post_hour,
                    AVG((likes + comments + shares)::float / NULLIF(views, 0)) as avg_engagement
                FROM posts_master
                WHERE creator_id = %s
                GROUP BY post_hour
                ORDER BY post_hour
            """, (creator_id,))
            hour_results = cursor.fetchall()
            
            # Engagement by Day
            cursor.execute("""
                SELECT 
                    post_day,
                    AVG((likes + comments + shares)::float / NULLIF(views, 0)) as avg_engagement
                FROM posts_master
                WHERE creator_id = %s
                GROUP BY post_day
                ORDER BY post_day
            """, (creator_id,))
            day_results = cursor.fetchall()
            
            return {
                "hourly_analysis": [{ "hour": r['post_hour'], "avg_engagement": float(r['avg_engagement'] or 0) } for r in hour_results],
                "daily_analysis": [{ "day": r['post_day'], "avg_engagement": float(r['avg_engagement'] or 0) } for r in day_results]
            }

    @staticmethod
    def get_profile_metrics(creator_id: str) -> Dict[str, Any]:
        """
        Fetches consolidated profile metrics for the creator profile page.
        """
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            
            # 1. Follower Count & Growth
            cursor.execute("""
                SELECT follower_count, snapshot_at
                FROM follower_growth_snapshots
                WHERE creator_id = %s
                ORDER BY snapshot_at DESC
                LIMIT 2
            """, (creator_id,))
            follower_snapshots = cursor.fetchall()
            
            curr_followers = follower_snapshots[0]['follower_count'] if len(follower_snapshots) > 0 else 0
            prev_followers = follower_snapshots[1]['follower_count'] if len(follower_snapshots) > 1 else curr_followers
            follower_growth = ((curr_followers - prev_followers) / prev_followers * 100) if prev_followers > 0 else 0
            
            # 2. Performance Stats
            overview = AnalyticsService.get_dashboard_overview(creator_id)
            
            # 3. Best Content Format
            formats = AnalyticsService.get_content_format_comparison(creator_id)
            best_format = max(formats, key=lambda x: x['avg_engagement_score']) if formats else {"content_type": "N/A", "avg_engagement_score": 0}
            
            # 4. Audience Retention & Sentiment (Stubs for future DB expansion)
            audience_retention = 96.8 
            audience_sentiment = {"positive": 78.5, "negative": 12.3, "neutral": 9.2}
            
            return {
                "follower_count": {
                    "value": curr_followers,
                    "growth": f"{follower_growth:+.1f}%"
                },
                "engagement_rate": {
                    "value": f"{overview['engagement_rate'] * 100:.1f}%",
                    "growth": "+2.1%" 
                },
                "audience_retention": {
                    "value": f"{audience_retention:.1f}%",
                    "growth": "+0.8%"
                },
                "audience_sentiment": audience_sentiment,
                "best_format": {
                    "name": best_format['content_type'].capitalize() if isinstance(best_format['content_type'], str) else "N/A",
                    "performance": f"{best_format['avg_engagement_score'] * 100:.1f}%"
                }
            }

    @staticmethod
    def get_audience_insights(creator_id: str) -> Dict[str, Any]:
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            
            # Follower Growth Timeline (Last 6 snapshots)
            cursor.execute("""
                SELECT p.platform_name as platform, f.follower_count, f.snapshot_at
                FROM follower_growth_snapshots f
                JOIN platforms p ON f.platform_id = p.platform_id
                WHERE f.creator_id = %s
                ORDER BY f.snapshot_at ASC
            """, (creator_id,))
            rows = cursor.fetchall()
            
            timeline = {}
            for row in rows:
                p = row['platform'].lower()
                if p not in timeline: timeline[p] = []
                timeline[p].append({
                    "month": row['snapshot_at'].strftime('%b'),
                    "followers": row['follower_count']
                })
            
            # Simple hash-based seed for audience composition for consistency across calls
            seed = sum(ord(c) for c in creator_id)
            returning = 65 + (seed % 15)
            new = 100 - returning
            
            return {
                "growth_timeline": timeline,
                "composition": {"returning": returning, "new": new},
                "behavior": {
                    "instagram": {"avgSessionDuration": "4.2 min", "bounceRate": 32, "returningRate": returning},
                    "youtube": {"avgSessionDuration": "12.5 min", "bounceRate": 28, "returningRate": returning - 5},
                    "facebook": {"avgSessionDuration": "3.1 min", "bounceRate": 45, "returningRate": returning - 10}
                }
            }

    @staticmethod
    def get_monetization_metrics(creator_id: str) -> Dict[str, Any]:
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            
            # Base logic: Scale mock values by actual views
            cursor.execute("SELECT COALESCE(SUM(views), 0) as total_views FROM posts_master WHERE creator_id = %s", (creator_id,))
            total_views = cursor.fetchone()['total_views']
            scale = (total_views / 150000) or 1.0 # 150k is base per-creator seed approx
            
            return {
                "revenue": {
                    "total": round(8700 * scale),
                    "growth": 6.2,
                    "platforms": {
                        "instagram": round(2890 * scale),
                        "youtube": round(4250 * scale),
                        "facebook": round(1560 * scale)
                    }
                },
                "content_performance": [
                    {"type": "Long-form", "revenue": round(4100 * scale), "conversion": 5.8, "platform": "YouTube"},
                    {"type": "Reels", "revenue": round(3200 * scale), "conversion": 4.2, "platform": "Instagram"},
                    {"type": "Carousels", "revenue": round(1800 * scale), "conversion": 3.1, "platform": "Instagram"}
                ]
            }
