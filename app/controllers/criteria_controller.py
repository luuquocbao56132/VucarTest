from flask import Blueprint, jsonify
from app.services.inspection_service import supabase_client

criteria_bp = Blueprint('criteria', __name__)

@criteria_bp.route('/criteria', methods=['GET'])
def get_criteria():
    response = supabase_client.table('criteria').select("*").execute()
    return jsonify(response.data), 200