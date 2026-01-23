from database import get_db_connection, get_db_cursor
from typing import Dict, Any, List
from datetime import datetime, timedelta
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TrendsService:
    @staticmethod
    def get_trends(creator_id: str) -> Dict[str, Any]:
        """
        Compute trends with extreme safety to prevent 500 errors.
        """
        try:
            with get_db_connection() as conn:
                cursor = get_db_cursor(conn)
                
                # Helper to get stats for a period
                def get_period_stats(days_offset: int):
                    cursor.execute("""
                        SELECT 
                            COALESCE(SUM(views), 0) as views,
                            COALESCE(SUM(likes + comments + shares), 0) as engagement,
                            COUNT(*) as post_count,
                            MODE() WITHIN GROUP (ORDER BY content_type) as top_content_type
                        FROM posts_master
                        WHERE creator_id = %s
                        AND post_datetime >= NOW() - INTERVAL '%s days'
                        AND post_datetime < NOW() - INTERVAL '%s days'
                    """, (creator_id, str(days_offset + 7), str(days_offset)))
                    return cursor.fetchone()

                current_stats = get_period_stats(0) or {}
                previous_stats = get_period_stats(7) or {}

                def safe_float(val):
                    try:
                        return float(val) if val is not None else 0.0
                    except:
                        return 0.0

                def safe_int(val):
                    try:
                        return int(val) if val is not None else 0
                    except:
                        return 0

                curr_views = safe_float(current_stats.get('views'))
                curr_eng = safe_float(current_stats.get('engagement'))
                prev_views = safe_float(previous_stats.get('views'))
                prev_eng = safe_float(previous_stats.get('engagement'))

                curr_er = (curr_eng / curr_views) if curr_views > 0 else 0.0
                prev_er = (prev_eng / prev_views) if prev_views > 0 else 0.0

                def calc_change(curr, prev):
                    if prev == 0: return 0.0
                    return ((curr - prev) / prev) * 100

                top_type_curr = str(current_stats.get('top_content_type') or "None")
                top_type_prev = str(previous_stats.get('top_content_type') or "None")

                return {
                    "facts": {
                        "engagement_change": f"{calc_change(curr_er, prev_er):+.1f}%",
                        "posting_frequency_change": f"{calc_change(safe_int(current_stats.get('post_count')), safe_int(previous_stats.get('post_count'))):+.1f}%",
                        "top_content_type": top_type_curr,
                        "previous_top_content_type": top_type_prev
                    },
                    "current": {
                        "engagement_rate": curr_er,
                        "post_count": safe_int(current_stats.get('post_count'))
                    },
                    "previous": {
                        "engagement_rate": prev_er,
                        "post_count": safe_int(previous_stats.get('post_count'))
                    }
                }
        except Exception as e:
            logger.error(f"Error in get_trends: {e}")
            # Fallback return to never error out
            return {
                "facts": {
                    "engagement_change": "0.0%",
                    "posting_frequency_change": "0.0%",
                    "top_content_type": "None",
                    "previous_top_content_type": "None"
                },
                "current": {"engagement_rate": 0.0, "post_count": 0},
                "previous": {"engagement_rate": 0.0, "post_count": 0}
            }
