import express from 'express';
import childProcess from 'child_process'

const app = express();
app.use(express.json());
app.use(express.static('build-react'))

const PORT = 3001;

app.get('/keyboard_show', (_req, res) => {
  childProcess.exec('DISPLAY=:0 wmctrl -a keyboard', (err, stdout, stderr) => {
    if (err) {
      console.log(`stderr: ${stderr}`)
      return
    }
    console.log(`stdout: ${stdout}`)
  })
  res.send()
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});