const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://localhost/${env.db}`);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error in connecting to DataBase'));

db.once('open', function(){
    console.log("Successfully connected to Data Base");
});

module.exports = db;