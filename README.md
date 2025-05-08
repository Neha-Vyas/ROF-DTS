brew install mosquitto 
brew services start mosquitto
netstat -an | grep 1883

Enable WebSocket Support (Optional but Required for Web UI)
By default, Mosquitto doesn't support WebSockets on macOS unless configured.

Create the Parent Directory First
Run this command to create the missing folders:
bash
sudo mkdir -p /opt/homebrew/etc/mosquitto
-p ensures that all parent directories are created as needed.

🔹 2. Create the Config File
Now try again:
bash

sudo touch /opt/homebrew/etc/mosquitto/mosquitto.conf

🔹 3. Edit the Config File to Enable WebSocket
Now open it in a text editor:
bash

sudo nano /opt/homebrew/etc/mosquitto/mosquitto.conf
Paste the following content into the file:
c
listener 1883
protocol mqtt

listener 9001
protocol websockets

Save and exit:
* Press CTRL + O to write/save.
* Press ENTER to confirm.
* Press CTRL + X to exit.

🔹 4. Restart Mosquitto with New Config
bash

brew services restart mosquitto

Confirm Mosquitto is Running
Check if Mosquitto is running on both ports:
bash

netstat -an | grep 1883
netstat -an | grep 9001



Now run app.py file 
python3 /Users/apple/Downloads/agni-rakshak-main/app.py

