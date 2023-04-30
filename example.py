import pathlib
import uuid
from flask import Flask, request, jsonify
import os
import base64

from flask_cors import CORS

app = Flask(__name__)

CORS(app)

# Flask-Uploads configuration
app.config['UPLOADED_IMAGES_DEST'] = 'static/uploads'

# In-memory "database" to store images
image_store = {}

def create_image_path(file):
    """Create and save image path. Return path."""
    # From spec
    stem = uuid.uuid4().hex
    suffix = pathlib.Path(file.filename).suffix.lower()
    uuid_basename = f"{stem}{suffix}"

    # Save to disk
    path = pathlib.Path('/Users/benschwartz/Documents/personal_dev/Web/bliss-slideshow/var') / uuid_basename
    file.save(path)

    return uuid_basename

@app.route('/upload', methods=['POST'])
def upload():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file found in the request'}), 400

    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({'error': 'No image file found in the request'}), 400

    if image_file:
        filename = create_image_path(image_file)
        image_store[filename] = image_file.read()
        return jsonify({'message': 'Image saved', 'filename': filename})
    

if __name__ == '__main__':
    app.run(debug=True)
