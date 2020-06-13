from flask import Flask, send_from_directory
from flask_socketio import SocketIO, send, emit

from listener import Listener

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secretkeyforsocket'
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/<path:path>', methods=['GET'])
def static_proxy(path):
  return send_from_directory('./front_dist/dashboard/', path)

@app.route('/')
def root():
  return send_from_directory('./front_dist/dashboard/', 'index.html')

@socketio.on('give_status')
def send_status():
    """
    Emit a json with an array having a json with each pilot information (sorted in position).
    If the race is not started, emit an empty array.

    Exemple for one pilot:
    {
        "name" : "Max Verstappen",
        "position" : 1,
        "tyre" : "soft",
        "team" : "Red Bull Racing",
        "lap" : 3,
        "total_lap" : 10,
        "fastest_lap" : 84.248,
        "status" : 2,
        "is_fastest" : true,
        "is_bot" : true,
        "wear" : 3.25
    }
    """
    if udp_listener.status is None:
        emit('status', [])
    else:
        sorted_pilot = sorted(udp_listener.status, key=lambda x:x.position)
        data = [pilot.to_json() for pilot in sorted_pilot]
        emit('status', data)

@socketio.on('give_track')
def send_track():
    """
    emit a json with the race information.

    Exemple:
    {
        "track" : "Sakhir (Bahrain)",
        "weather" : "wi-day-sunny",
        "trackTemperature" : "29",
        "airTemperature" : "21",
        "sessionDuration" : 127
    }
    """
    emit('track', udp_listener.race_info)

if __name__ == '__main__':
    """
    Run the Listener to parse UDP in a Thread
    Run the Flask website using socketio in a separated Thread
    """
    udp_listener = Listener()
    udp_listener.start()

    socketio.run(app, debug=False, use_reloader=False, host='0.0.0.0', port=5000)

