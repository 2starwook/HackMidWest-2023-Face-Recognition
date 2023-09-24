from flask import jsonify

from server import app

@app.route('/data', methods=["GET"])
def get_data():
  response = jsonify({
      'Name':"geek",
      "Age":"22",
      "programming":"python"
      })
  return response