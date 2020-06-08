const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get('/cities', function (req, res) {
  db.getAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.send(data.rows);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

module.exports = app;
