from supabase import create_client
from app.config import Config

supabase_client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)

def update_car_status(id):
    carInfo = supabase_client.table('car_criteria').select("car_id").eq('id', id).execute().data[0]['car_id']
    all_criteria = supabase_client.table('car_criteria').select("is_good").eq("car_id", carInfo).execute()

    # if all_criteria.data:
    all_good = all(item['is_good'] for item in all_criteria.data)
    all_bad = all(not item['is_good'] for item in all_criteria.data)

    if all_good:
        new_status = 2  # All criteria are good
    elif all_bad:
        new_status = 0  # All criteria are bad
    else:
        new_status = 1  # Mixed criteria

    # Update the car status
    print(f"Updating car {carInfo} status to {new_status}")
    supabase_client.table('cars').update({"status": new_status}).eq("id", carInfo).execute()

def create_car_criteria(car_id):
    # Fetch all existing criteria
    response = supabase_client.table('criteria').select("*").execute()
    criteria = response.data

    # Create car_criteria entries
    car_criteria_data = [
        {
            "car_id": car_id,
            "criteria_id": crit['id'],
            "is_good": False,
            "note": ""
        }
        for crit in criteria
    ]
    supabase_client.table('car_criteria').insert(car_criteria_data).execute()
    print(f"Created {len(car_criteria_data)} car_criteria entries for car {car_id}")