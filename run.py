from app import create_app
from app.controllers.car_controller import car_bp
from app.controllers.criteria_controller import criteria_bp
from flask_cors import CORS

app = create_app()
CORS(app)

if __name__ == '__main__':
    app.run(debug=True)
