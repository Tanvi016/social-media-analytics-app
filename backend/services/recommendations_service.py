from database import get_db_connection, get_db_cursor
from typing import List, Dict, Any
from services.analytics_service import AnalyticsService
from services.trends_service import TrendsService

class RecommendationsService:
    @staticmethod
    def get_recommendations(creator_id: str) -> List[Dict[str, Any]]:
        """
        Generate recommendations using deterministic rules:
        Best content type, Best posting time, Content fatigue detection
        """
        recs = []
        
        # 1. Best Content Type Rule
        comparison = AnalyticsService.get_content_format_comparison(creator_id)
        if comparison:
            best_format = max(comparison, key=lambda x: x['avg_engagement_score'])
            recs.append({
                "type": "content_type",
                "title": f"Increase {best_format['content_type']} frequency",
                "description": f"Your {best_format['content_type']}s have a {best_format['avg_engagement_score']:.1f}% engagement rate, higher than other formats.",
                "priority": 1
            })

        # 2. Best Posting Time Rule
        time_analysis = AnalyticsService.get_posting_time_analysis(creator_id)
        if time_analysis['hourly_analysis']:
            best_hour = max(time_analysis['hourly_analysis'], key=lambda x: x['avg_engagement'])
            recs.append({
                "type": "posting_time",
                "title": f"Optimal posting time: {best_hour['hour']}:00",
                "description": f"Posts at {best_hour['hour']}:00 see {best_hour['avg_engagement']:.1f}% more reach on average.",
                "priority": 2
            })

        # 3. Content Fatigue Rule
        trends = TrendsService.get_trends(creator_id)
        if trends['facts']['engagement_change'].startswith('-'):
            recs.append({
                "type": "content_fatigue",
                "title": "Engagement Drop Alert",
                "description": "Your engagement has dropped. Try varying your content types or interacting more with comments.",
                "priority": 1
            })

        return recs
