#!/bin/bash

sudo apt-get update
sudo apt-get -y upgrade
sudo apt-get install -y vim
cd /home/pi/
git clone https://github.com/senbeiman/housework-todo-app.git
cd ./housework-todo-app/edge
sudo \cp -f config.txt /boot/
sudo \cp -f 40-libinput.conf /usr/share/X11/xorg.conf.d/
cp run_housework_todo_app.sh /home/pi/Desktop/
sudo cp housework.service /lib/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable housework.service
curl -L https://git.io/v7kPb | bash
sudo npm -g install yarn
sudo apt-get install -y xdotool