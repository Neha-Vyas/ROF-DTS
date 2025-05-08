from flask import Flask, render_template, jsonify
import paho.mqtt.client as mqtt
from threading import Thread

app = Flask(__name__)

# Store latest sensor data
latest_data = {
    'temperature': 0,
    'distance': 0
}

# MQTT Callback
def on_message(client, userdata, msg):
    try:
        temp, dist = map(float, msg.payload.decode().split(','))
        latest_data.update({
            'temperature': temp,
            'distance': dist
        })
        print(f"[MQTT] Updated: Temp: {temp}°C | Dist: {dist}m")
    except Exception as e:
        print(f"Error processing MQTT message: {e}")

# MQTT Setup
client = mqtt.Client()
client.on_message = on_message
client.connect("localhost", 1883, 60)
client.subscribe("agnirakshak/temperature")

# Start MQTT loop in background
def mqtt_loop():
    client.loop_forever()

mqtt_thread = Thread(target=mqtt_loop, daemon=True)
mqtt_thread.start()

# Routes
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/data')
def get_data():
    return jsonify(latest_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)