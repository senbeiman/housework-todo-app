#!/bin/bash -e

cd /home/pi/housework-todo-app
git pull
cd /home/pi/housework-todo-app/frontend
yarn install
yarn build
cd /home/pi/housework-todo-app/backend
npm install
npm run build
npm run start:json &
npm start &
DISPLAY=:0 chromium-browser -kiosk --app=http://localhost:3001
