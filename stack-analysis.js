const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const crypto = require('crypto')

const getFrames = require('./docker');

app.listen(process.env.PORT || 9001);
app.use(cors());
app.use(require('body-parser').json())

function sha1(input) {
  const shasum = crypto.createHash('sha1');
  shasum.update(input);
  return shasum.digest('hex');
}

app.use((req, res, next) => {
  if(!req.body.code) { return next(); }
  req.sha = sha1(req.body.code);
  res.set('Content-Type', 'text/json');
  next();
});

app.post('/', (req, res, next) => {
  fs.readdir('cache', (err, files) => {
    if(err) { return next(err); }
    if(files.includes(req.sha + '.json')) {
      fs.readFile(`cache/${req.sha}.json`, function(err, file) {
        if(err) { return next(err); }
        res.send(file);
      });
    } else {
      next();
    }
  });
});

app.post('/', function(req, res, next) {
  return getFrames(req.body.code)
    .then(fileData => {
      res.send(fileData.frames);
      // intentionally exclude from req res cycle
      fs.writeFile(`cache/${req.sha}.json`, fileData.frames);
    })
    .catch(next);
});