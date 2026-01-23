from database import get_db_connection, get_db_cursor
from typing import List, Dict, Any, Optional
import uuid

class CollaborationService:
    @staticmethod
    def send_email(sender_id: str, receiver_id: str, payload: Dict[str, Any]) -> Dict[str, Any]:
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            
            email_id = str(uuid.uuid4())
            cursor.execute("""
                INSERT INTO emails (
                    email_id, sender_user_id, receiver_user_id, business_name, 
                    campaign_goal, metrics_justification, best_content_type, 
                    best_posting_time, subject, body
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING email_id
            """, (
                email_id, sender_id, receiver_id, 
                payload.get('business_name'), 
                payload.get('campaign_goal'),
                payload.get('metrics_justification'),
                payload.get('best_content_type'),
                payload.get('best_posting_time'),
                payload.get('subject'),
                payload.get('body')
            ))
            
            # Also create a notification for the creator
            cursor.execute("""
                INSERT INTO notifications (user_id, title, message, type)
                VALUES (%s, %s, %s, 'business_contact')
            """, (receiver_id, "New Collaboration Request", f"You received a new campaign request from {payload.get('business_name')}."))
            
            return {"email_id": email_id, "status": "sent"}

    @staticmethod
    def get_inbox(user_id: str) -> List[Dict[str, Any]]:
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            cursor.execute("""
                SELECT email_id, sender_user_id, business_name, subject, is_read, created_at
                FROM emails
                WHERE receiver_user_id = %s
                ORDER BY created_at DESC
            """, (user_id,))
            return cursor.fetchall()

    @staticmethod
    def get_email_detail(email_id: str) -> Dict[str, Any]:
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            
            # Mark as read
            cursor.execute("UPDATE emails SET is_read = TRUE WHERE email_id = %s", (email_id,))
            
            cursor.execute("SELECT * FROM emails WHERE email_id = %s", (email_id,))
            return cursor.fetchone()

    @staticmethod
    def get_notifications(user_id: str) -> List[Dict[str, Any]]:
        with get_db_connection() as conn:
            cursor = get_db_cursor(conn)
            cursor.execute("""
                SELECT * FROM notifications 
                WHERE user_id = %s 
                ORDER BY created_at DESC LIMIT 20
            """, (user_id,))
            return cursor.fetchall()
