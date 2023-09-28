from flask import Flask
from flask_pymongo import PyMongo
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask import jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['MONGO_URI'] = "mongodb://localhost:27017/videostreamer"

mongo = PyMongo(app)

# @app.route('/add', methods=['POST'])
# def add_user():
#     logo=request.files['logo']
#     mongo.save_file(logo.filename,logo)
#     title = request.form.get('title')

#     if logo and title and request.method == 'POST':
#         mongo.db.overlays.insert_one({'title':title,'logo_name':logo.filename})
#         resp = jsonify("Overlay added Successfully!")
#         resp.status_code = 200
#         return resp
#     else:
#         return not_found()

@app.route('/overlays')
def overlays():
    overlays=mongo.db.overlays.find()
    resp = dumps(overlays)
    return resp

@app.route('/overlays/<id>', methods=['PUT'])
def update_overlays(id):
    _id = id
    _json = request.json
    _title = _json['title']

    if _title and request.method == 'PUT':
        mongo.db.overlays.update_one({'_id': ObjectId(_id['$oid']) if '$oid' in _id else ObjectId(_id)},{'$set': {'title':_title}})

        resp = jsonify("User Updated Successfully")
        resp.status_code = 200
        return resp
    else:
        return not_found()

@app.errorhandler(404)
def not_found(error=None):
    message = {
        'status': 404,
        'message': 'Not Found' + request.url
    }
    resp = jsonify(message)

    resp.status_code = 404

    return resp

if __name__ == "__main__":
    app.run(debug=True)
