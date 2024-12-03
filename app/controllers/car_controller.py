from flask import Blueprint, request, jsonify
from app.services.inspection_service import supabase_client, create_car_criteria

car_bp = Blueprint('car', __name__)

@car_bp.route('/cars', methods=['GET'])
def get_cars():
    response = supabase_client.table('cars').select("*").execute()
    cars = response.data
    return jsonify(cars), 200

@car_bp.route('/cars', methods=['POST'])
def create_car():
    data = request.get_json()
    response = supabase_client.table('cars').insert(data).execute()

    if response.data:
        car_id = response.data[0]['id']
        create_car_criteria(car_id)

    return jsonify(response.data), 201
