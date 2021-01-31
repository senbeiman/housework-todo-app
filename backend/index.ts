import express from 'express'
import childProcess from 'child_process'
import cors from 'cors'

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors())
app.use(express.json());
app.use(express.static('build-react'))

const PORT = 3001;

app.get('/keyboard_show', (_req, res) => {
  childProcess.exec('DISPLAY=:0 wmctrl -a keyboard')
  res.send()
});

app.get('/mock/weather', (_req, res) => {
  const data = {
    "coord": {
      "lon": -122.08,
      "lat": 37.39
    },
    "weather": [
      {
        "id": 800,
        "main": "Clear",
        "description": "clear sky",
        "icon": "01d"
      }
    ],
    "base": "stations",
    "main": {
      "temp": 28.55,
      "feels_like": 28.86,
      "temp_min": 8.37,
      "temp_max": 28.26,
      "pressure": 1023,
      "humidity": 100
    },
    "visibility": 16093,
    "wind": {
      "speed": 1.5,
      "deg": 350
    },
    "clouds": {
      "all": 1
    },
    "dt": 1560350645,
    "sys": {
      "type": 1,
      "id": 5122,
      "message": 0.0139,
      "country": "US",
      "sunrise": 1560343627,
      "sunset": 1560396563
    },
    "timezone": -25200,
    "id": 420006353,
    "name": "Mountain View",
    "cod": 200
  }
  res.json(data)
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});