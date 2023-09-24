import os
from flask import session, request
from werkzeug.utils import secure_filename
from flask_cors import cross_origin

from server import app, UPLOAD_FOLDER

@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_file():
    if not os.path.isdir(UPLOAD_FOLDER):
        os.mkdir(UPLOAD_FOLDER)
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination="/".join([UPLOAD_FOLDER, filename])
    file.save(destination)
    session['uploadFilePath']=destination
    
    return '200 OK'
