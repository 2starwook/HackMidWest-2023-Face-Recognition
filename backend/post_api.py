import os
from os.path import sep
from flask import session, request
from werkzeug.utils import secure_filename
from flask_cors import cross_origin

from server import app, config
import okta_api as okta

@app.route('/upload', methods=['POST'])
@cross_origin()
def upload_file():
    if not os.path.isdir(config.PATH_UPLOAD_DIR):
        os.mkdir(config.PATH_UPLOAD_DIR)
    file = request.files['file'] 
    filename = secure_filename(file.filename)
    destination=sep.join([config.PATH_UPLOAD_DIR, filename])
    file.save(destination)
    session['uploadFilePath']=destination
    return '200 OK'

@app.route('/createuser', methods=['POST'])
@cross_origin()
def create_user():
    firstname = request.form['firstName']
    lastname = request.form['lastName']
    email = request.form['email']
    mobilephone = request.form['mobilePhone']
    is_created = okta.create_user(firstname, lastname, email, mobilephone)
    return '200 OK'
