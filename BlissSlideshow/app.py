from flask import Flask, render_template, send_from_directory
from flask_limiter import Limiter
import redis
from flask_limiter.util import get_remote_address
import os
app = Flask(__name__)

class Config:
    ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg', 'gif'])
    MAX_CONTENT_LENGTH = 32 * 2048 * 2048

app.static_folder = 'static'

app.config.from_object(Config)

redis_url = os.getenv("REDIS_URL")
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["10 per minute", "50 per hour"],
    storage_uri=redis_url
)


@app.route("/pics/static/<path:path>")
def serve_static(path):
    return send_from_directory('static', path)

@app.route('/pics')
@app.route('/pics/')
def index():
    return render_template('index.html')






if __name__ == "__main__":
    app.run()