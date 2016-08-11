const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const runCode = require('./runCode');

app.use(express.static('public'));

app.use(bodyParser.json());

app.post('/', (req, res, next) => {
  runCode(req.body.code)
    .then(frames => res.json(frames))
    .catch(next);
});


app.listen(9001);