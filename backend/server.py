from flask import Flask
from flask_cors import CORS

UPLOAD_FOLDER = "./uploads"

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
cors = CORS(app)


from get import *
from post import *


if __name__ == '__main__':
    app.run(port=5000, debug=True)
