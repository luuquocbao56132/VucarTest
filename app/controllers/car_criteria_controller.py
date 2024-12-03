from flask import Blueprint, request, jsonify
from app.services.inspection_service import supabase_client, update_car_status

car_criteria_bp = Blueprint('car_criteria', __name__)

@car_criteria_bp.route('/car_criteria/<int:car_id>', methods=['GET'])
def get_car_criteria(car_id):  
    response = supabase_client.table('car_criteria') \
        .select('*, cars (name), criteria (description)') \
        .eq('car_id', car_id) \
        .execute()     
    if response.data is None or len(response.data) == 0:
        return jsonify({"error": response.error.message}), 400  
    return jsonify(response.data), 200

@car_criteria_bp.route('/car_criteria/<int:id>', methods=['PUT'])
def update_car_criteria(id):
    data = request.get_json()
    if data.get("is_good"):
        data["note"] = ""
    response = supabase_client.table('car_criteria').update(data).eq('id', id).execute()

    update_car_status(id)
    if response.data is None or len(response.data) == 0:
        return jsonify({"error": "Failed to update car criteria"}), 400
    return jsonify(response.data), 200
