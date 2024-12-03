from flask import Flask
from app.controllers.car_controller import car_bp
from app.controllers.criteria_controller import criteria_bp
from app.controllers.car_criteria_controller import car_criteria_bp
from app.services.inspection_service import supabase_client

def create_app():
    app = Flask(__name__)

    # Register Blueprints
    app.register_blueprint(car_bp, url_prefix='/api')
    app.register_blueprint(criteria_bp, url_prefix='/api')
    app.register_blueprint(car_criteria_bp, url_prefix='/api')

    return app