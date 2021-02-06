# housework todo app
this is housework todo manager designed to run on raspberry pi with touch display  
# how to use with Raspberry Pi with touch display
[MacでRaspberryPi入門](https://qiita.com/shippokun/items/9070fc58f69d8c063e44)

[How to rotate display](https://www.amazon.com/ask/questions/asin/B01GDMDFZA/5/ref=ask_ql_psf_ql_hza?sort=SUBMIT_DATE&isAnswered=true)  
search by 'rotate'

[Raspberry PiにNode.jsとnpmの最新版をインストールする](https://qiita.com/mascii/items/77c685df65c4cbca9315)

install yarn and serve
```
sudo npm -g install yarn
sudo yarn global add serve
```
install xdotool for automating keyboard popup
```
sudo apt-get xdotool
```
add this chrome-extension(https://chrome.google.com/webstore/detail/google-input-tools/mclkkofklkfljcocdinagocijmpgbhab) to input Japanese and set this hotkey for toggling handwriting keyboard
```
alt+shift+i
```
install japanese fonts and set as system fonts in Settings > Appearance > Customize fonts
```
sudo apt-get install fonts-noto-cjk
```
[[Raspberry Pi][FileMaker] Chromium で Noto フォントを使う – with a Christian Wife](https://blog.withachristianwife.com/2020/05/20/noto-font-in-chromium/)   
clone this repository, install dependent packages, build and run
```
git clone https://github.com/senbeiman/housework-todo-app.git
cd housework-todo-app/frontend
yarn install
yarn build
cd ../backend
npm install
npm run build
npm run start:json &
npm start &
DISPLAY=:0 chromium-browser -kiosk --app=http://localhost:3001
```
the last line is to start chromium-browser with another terminal  
[How launch chromium browser from terminal?](https://www.raspberrypi.org/forums/viewtopic.php?t=189006)  
You may automate this process on startup by referencing this article.  
[How to Run a Raspberry Pi Program on Startup](https://learn.sparkfun.com/tutorials/how-to-run-a-raspberry-pi-program-on-startup/all)  
