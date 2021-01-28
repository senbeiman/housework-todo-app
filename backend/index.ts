import express from 'express';
import childProcess from 'child_process'

const app = express();
app.use(express.json());
app.use(express.static('build-react'))

const PORT = 3001;

app.get('/keyboard_show', (_req, _res) => {
  childProcess.exec('DISPLAY=:0 wmctrl -a keyboard')
});

app.get('/keyboard_hide', (_req, _res) => {
  childProcess.exec('DISPLAY=:0 wmctrl -a chromium')
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});