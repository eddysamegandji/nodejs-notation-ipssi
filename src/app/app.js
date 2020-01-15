const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const User = require('./api/models/userModel');
const jsonwebtoken = require('jsonwebtoken');

const hostname = "0.0.0.0";
const port = 3000;

const mongooseParams = {
  useUnifiedTopology: true,
  useNewUrlParse: true,
  useCreateIndex: true
}
mongoose.connect('mongodb://mongo/sqynode', mongooseParams);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use((req, res, next) => {
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'nodejs_api', (err, decode) => {
      if (err) {
        req.user = undefined;
      } else {
        req.user = decode;
      }
      next();
    })
  } else {
    req.user = undefined;
    next();
  }
})


app.listen(port, hostname);