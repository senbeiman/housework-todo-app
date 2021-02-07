#!/bin/bash

cd /home/pi/
git clone https://github.com/senbeiman/housework-todo-app.git
cd ./housework-todo-app/edge
sudo \cp -f config.txt /boot/
sudo \cp -f 40-libinput.conf /usr/share/X11/xorg.conf.d/
sudo cp housework.service /lib/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable housework.service
curl -L https://git.io/v7kPb | bash
sudo npm -g install yarn
sudo apt-get install -y xdotool