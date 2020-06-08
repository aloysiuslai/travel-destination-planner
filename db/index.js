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

const getAll = function(callback) {
  db.query('SELECT code, city, country FROM code ORDER BY city', (err, results) => {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = db;

module.exports.getAll = getAll;

// import React, { Component } from 'react';
// import Calendar from 'react-calendar';

// class MyApp extends Component {
//   state = {
//     date: new Date(),
//   }

//   onChange = date => this.setState({ date })

//   render() {
//     return (
//       <div>
//         <Calendar
//           onChange={this.onChange}
//           value={this.state.date}
//         />
//       </div>
//     );
//   }
// }
