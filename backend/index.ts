import express from 'express';
const childProcess = require('child_process');

const app = express();
app.use(express.json());
app.use(express.static('build-react'))

const PORT = 3001;

app.get('/keyboard_on', (_req, _res) => {
  childProcess.exec('DISPLAY=:0 matchbox-keyboard')
  childProcess.exec('DISPLAY=:0 wmctrl -r keyboard -e 0,0,700,600,300')
});

app.get('/keyboard_off', (_req, _res) => {
  childProcess.exec('DISPLAY=:0 wmctrl -c keyboard')
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});