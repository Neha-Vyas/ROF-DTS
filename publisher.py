import paho.mqtt.client as mqtt
import time
import random

# MQTT broker config
MQTT_BROKER = "localhost"
MQTT_PORT = 1883
MQTT_TOPIC = "agnirakshak/temperature"

# Define MQTT client
client = mqtt.Client()

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("✅ Connected to MQTT Broker")
    else:
        print(f"❌ Failed to connect, return code {rc}")

client.on_connect = on_connect
client.connect(MQTT_BROKER, MQTT_PORT, 60)
client.loop_start()

# Function to publish random temperature and distance
def publish_temperature():
    temp = round(random.uniform(20.0, 50.0), 2)
    dist = round(random.uniform(1.0, 5.0), 2)
  
    message = f"{temp},{dist}"
    client.publish(MQTT_TOPIC, message)
    print(f"[PUBLISH] {message}")

if __name__ == "__main__":
    while True:
        publish_temperature()
        time.sleep(5)
