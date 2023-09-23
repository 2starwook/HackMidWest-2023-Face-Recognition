from flask import Flask, jsonify
from flask_cors import CORS


app = Flask(__name__)
cors = CORS(app)

@app.route('/data', methods=["GET"])
def hello_world():
  response = jsonify({
      'Name':"geek",
      "Age":"22",
      "programming":"python"
      })
  return response

if __name__ == '__main__':
    app.run(port=5000, debug=True)
