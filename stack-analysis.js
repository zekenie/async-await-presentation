const express = require('express');
const app = express();
const cors = require('cors');

const getFrames = require('./docker');

app.listen(process.env.PORT || 9001);
app.use(cors());
app.use(require('body-parser').json())
app.post('/', function(req, res, next) {
  return getFrames(req.body.code)
    .then(frames => res.json(frames))
    .catch(next);
});