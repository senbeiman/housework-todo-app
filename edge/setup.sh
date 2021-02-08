#!/bin/bash

sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get install -y vim
curl -L https://git.io/v7kPb | bash
sudo npm -g install yarn
sudo apt-get install -y xdotool
sudo apt-get install -y fonts-noto-cjk
cd /home/pi/
git clone https://github.com/senbeiman/housework-todo-app.git
cd /home/pi/housework-todo-app/edge
sudo \cp -f config.txt /boot/
sudo \cp -f 40-libinput.conf /usr/share/X11/xorg.conf.d/
cp run_housework_todo_app.sh /home/pi/Desktop/
sudo cp housework.service /lib/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable housework.service
cd /home/pi/housework-todo-app/frontend
echo GENERATE_SOURCEMAP=false >> .env
read -p "enter your openweathermap api key: " key
echo REACT_APP_WEATHER_URL="https://api.openweathermap.org/data/2.5/weather?q=Kokubunji&units=metric&lang=ja&appid=${key}" >> .env
echo "enable vnc manually"
sudo raspi-config
echo "access vnc, set locale, and install chrome extension https://chrome.google.com/webstore/detail/google-input-tools/mclkkofklkfljcocdinagocijmpgbhab and set alt+shift+i to toggle input method"