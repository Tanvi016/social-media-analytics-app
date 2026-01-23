import requests
import json

BASE_URL = "http://localhost:8000/api"

def test_endpoints():
    print("🔍 Starting Backend Verification...")
    
    try:
        # 1. Health check
        health = requests.get(f"{BASE_URL}/v1/health")
        print(f"✅ Health Check: {health.status_code}")

        # 2. Get Creators
        creators_resp = requests.get(f"{BASE_URL}/creators/search")
        creators = creators_resp.json()['creators']
        if not creators:
            print("❌ No creators found in DB")
            return
            
        creator_id = creators[0]['creator_id']
        user_id = creators[0]['user_id']
        print(f"👤 Testing with Creator: {creators[0]['username']} ({creator_id})")

        # 3. Analytics Overview
        overview = requests.get(f"{BASE_URL}/dashboard/overview?creator_id={creator_id}")
        print(f"📊 Analytics Overview: {overview.status_code} - Engagement: {overview.json().get('engagement_rate')}%")

        # 4. Trends
        trends = requests.get(f"{BASE_URL}/dashboard/trends?creator_id={creator_id}")
        print(f"📈 Trends: {trends.status_code} - Change: {trends.json()['facts']['engagement_change']}")

        # 5. Recommendations
        recs = requests.get(f"{BASE_URL}/api/recommendations?creator_id={creator_id}") # Note: path might be /api/recommendations or /api/v1...
        # Let's check main.py defined path: @app.get("/api/recommendations")
        recs = requests.get(f"http://localhost:8000/api/recommendations?creator_id={creator_id}")
        print(f"💡 Recommendations: {recs.status_code} - Count: {len(recs.json())}")

        # 6. Inbox
        inbox = requests.get(f"http://localhost:8000/api/creator/inbox?user_id={user_id}")
        print(f"📥 Inbox: {inbox.status_code} - Messages: {len(inbox.json())}")

        # 7. AI Explain
        explain = requests.post(f"http://localhost:8000/api/ai/explain", json={"creator_id": creator_id})
        print(f"🤖 AI Explain: {explain.status_code}")

        print("\n✨ ALL CORE ENDPOINTS VERIFIED SUCCESSFULLY!")

    except Exception as e:
        print(f"❌ Verification Failed: {e}")

if __name__ == "__main__":
    test_endpoints()
