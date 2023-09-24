from flask import Flask
from flask_cors import CORS

from config import Config
from script.Face_recognition_model import Face_recognition_model


config = Config()
face_recognition_model = Face_recognition_model()
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = config.PATH_UPLOAD_DIR
cors = CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

from get_api import *
from post_api import *


if __name__ == '__main__':
    app.run(port=5000, debug=True)
