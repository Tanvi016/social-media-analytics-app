from database import get_db_connection, get_db_cursor
from typing import Dict, Any, Optional

class BusinessService:
    @staticmethod
    def get_business_profile(user_id: str) -> Dict[str, Any]:
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            cursor.execute("""
                SELECT 
                    b.business_id, b.user_id, b.company_name, b.industry, b.website,
                    b.target_audience_description, b.company_logo, b.account_owner_role,
                    b.social_links, b.team_leads, b.visibility_settings,
                    u.email, u.display_name
                FROM businesses b
                JOIN users u ON b.user_id = u.user_id
                WHERE u.user_id = %s
            """, (user_id,))
            result = cursor.fetchone()
            
            if not result:
                return {}
                
            return {
                "business_id": result['business_id'],
                "companyName": result['company_name'],
                "domain": result['industry'],
                "website": result['website'],
                "companyLogo": result['company_logo'],
                "bio": result['target_audience_description'],
                "accountOwnerRole": result['account_owner_role'],
                "socialLinks": result['social_links'],
                "leads": result['team_leads'],
                "visibilitySettings": result['visibility_settings'],
                "email": result['email'],
                "displayName": result['display_name']
            }
