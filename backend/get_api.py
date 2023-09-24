from flask import jsonify

from server import app, config, face_recognition_model


@app.route('/process', methods=["GET"])
def process():
  n = face_recognition_model.count_human(config.PATH_IMAGE)

  response = jsonify({
      'path': config.PATH_RESULT_IMAGE,
      "n": n,
      })
  return response

