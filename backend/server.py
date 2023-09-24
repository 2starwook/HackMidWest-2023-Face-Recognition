from flask import Flask
from flask_cors import CORS

from backend.config import Config
from backend.script.Face_recognition_model import Face_recognition_model


config = Config()
face_recognition_model = Face_recognition_model()
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = config.PATH_UPLOAD_DIR
cors = CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

from backend.get_api import *
from backend.post_api import *


if __name__ == '__main__':
    app.run(port=5000, debug=True)
