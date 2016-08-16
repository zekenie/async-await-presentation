const express = require('express');
const app = express();

const getFrames = require('./docker');

app.listen(process.env.PORT || 9001);
app.use(require('body-parser').json())
app.post('/', function() {
  return getFrames(req.body.code)
    .then(frames => res.json(frames))
    .catch(next);
});