// var selectAll = function(callback) {
//   connection.query('SELECT * FROM items', function(err, results, fields) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, results);
//     }
//   });
// };

const {Client} = require('pg');

const db = new Client({
  user: 'postgres',
  password: '25638965',
  database: 'airports',
});

db.connect( (err) => {
  if (err) {
    console.log('Error connecting to psql', err);
  } else {
    console.log('Successfully Connected to psql db');
  }
})

const getAll = (callback) => {
  db.query('SELECT code, city, country FROM code ORDER BY city', (err, results) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const save = (data, callback) => {
  db.query(`INSERT into searchHistory (code, city, country, date, link) VALUES ('${data.code}', '${data.city}', '${data.country}', '${data.date}', '${data.link}')`, (err, results) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

const readHistory = (callback) => {
  db.query('SELECT * FROM searchHistory ORDER BY id DESC LIMIT 10', (err, results) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = db;
module.exports.save = save;
module.exports.getAll = getAll;
module.exports.readHistory = readHistory;
