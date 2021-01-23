# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Setup Raspberry Pi 3B+
[MacでRaspberryPi入門](https://qiita.com/shippokun/items/9070fc58f69d8c063e44)

[How to rotate display](https://www.amazon.com/ask/questions/asin/B01GDMDFZA/5/ref=ask_ql_psf_ql_hza?sort=SUBMIT_DATE&isAnswered=true)  
search by 'rotate'

[Raspberry PiにNode.jsとnpmの最新版をインストールする](https://qiita.com/mascii/items/77c685df65c4cbca9315)

install yarn and serve
```
sudo npm -g install yarn
sudo yarn global add serve
```
clone this repository, run install dependent packages, build and run
```
git clone https://github.com/senbeiman/housework-todo-app.git
cd housework-todo-app
yarn install
yarn build
serve -s build
```
start chromium-browser with another terminal  
[How launch chromium browser from terminal?](https://www.raspberrypi.org/forums/viewtopic.php?t=189006)
```
DISPLAY=:0 chromium-browser -kiosk --app=http://localhost:5000
```
or you may serve static server in background and run browser in the same terminal
```
serve -s build &
DISPLAY=:0 chromium-browser -kiosk --app=http://localhost:5000
```
You may automate this process on startup by referencing this article.  
[How to Run a Raspberry Pi Program on Startup](https://learn.sparkfun.com/tutorials/how-to-run-a-raspberry-pi-program-on-startup/all)
### Wi-Fi disconnecting problem
[Wifi disconnects after a random amount of time](https://www.raspberrypi.org/forums/viewtopic.php?t=25854)  
```
sudo iwconfig wlan0 power off
```
It's not certain that this is a solution.