const mysql = require('mysql2')

let db = mysql.createConnection({
    host: 'localhost',
    // port: '3307',
    user: 'root',
    // password: 'supersecret',
    password: '123456',
    database: 'quanlyluutru'
});

module.exports = db;