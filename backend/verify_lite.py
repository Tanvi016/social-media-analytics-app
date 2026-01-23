import urllib.request
import json
import sys

BASE_URL = "http://localhost:8000/api"

def test_endpoint(path, method="GET", data=None):
    url = f"{BASE_URL}{path}"
    print(f"Testing {method} {url}...", end=" ")
    try:
        req = urllib.request.Request(url, method=method)
        if data:
            req.add_header('Content-Type', 'application/json')
            data = json.dumps(data).encode('utf-8')
        
        with urllib.request.urlopen(req, data=data) as response:
            status = response.getcode()
            body = json.loads(response.read().decode())
            print(f"✅ {status}")
            return body
    except urllib.error.HTTPError as e:
        print(f"❌ HTTP Error {e.code}: {e.read().decode()}")
        return None
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

def main():
    print("🔍 Starting Standard Library Verification...")
    
    # 1. Health
    test_endpoint("/v1/health")
    
    # 2. Get Creators to find an ID
    creators_data = test_endpoint("/creators/search")
    if not creators_data or not creators_data['creators']:
        print("❌ No creators found")
        return
        
    creator = creators_data['creators'][0]
    creator_id = creator['creator_id']
    user_id = creator['user_id']
    print(f"👤 Found Creator: {creator['username']} ({creator_id})")
    
    # 3. Analytics
    test_endpoint(f"/dashboard/overview?creator_id={creator_id}")
    test_endpoint(f"/dashboard/trends?creator_id={creator_id}")
    
    # 4. Collaboration
    test_endpoint(f"/creator/inbox?user_id={user_id}")
    
    # 5. AI Explain
    test_endpoint("/ai/explain", method="POST", data={"creator_id": creator_id})
    
    print("\n✨ VERIFICATION COMPLETED!")

if __name__ == "__main__":
    main()
