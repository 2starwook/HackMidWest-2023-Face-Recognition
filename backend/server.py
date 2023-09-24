from flask import Flask
from flask_cors import CORS

from config import Config


config = Config()
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = config.PATH_UPLOAD_DIR
cors = CORS(app, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'


from get import *
from post import *


if __name__ == '__main__':
    app.run(port=5000, debug=True)
