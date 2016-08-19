const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('docs'));

app.use(bodyParser.json());


app.listen(9001);