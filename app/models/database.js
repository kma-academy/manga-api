const mysql = require('mysql');
const poolConfig = require('../config/database');
const pool = mysql.createPool(poolConfig);
pool.queryAsync = function (...args) {
    return new Promise(function (resolve, reject) {
        pool.query(...args, function (err, result) {
            if (err) reject(err);
            else resolve(result)
        })
    })
}
module.exports = pool;