const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/cities', (req, res) => {
  db.getAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send(data.rows);
    }
  });
});

app.post('/save', (req, res) => {
  console.log(req.body)
  db.save(req.body, function(err, data) {
    if(err) {
      res.sendStatus(400);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/save', (req, res) => {
  db.readHistory((err, data) => {
    if(err) {
      res.sendStatus(400);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

module.exports = app;
