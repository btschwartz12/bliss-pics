from flask import Flask, render_template, send_from_directory

app = Flask(__name__)


app.static_folder = 'static'

app.config.from_object('BlissSlideshow.config')


@app.route("/pics/static/<path:path>")
def serve_static(path):
    return send_from_directory('static', path)

@app.route('/pics')
@app.route('/pics/')
def index():
    return render_template('index.html')

@app.route('/pics/other')
@app.route('/pics/other/')
def bruh():
    return render_template('index.html')




if __name__ == "__main__":
    app.run()