require('dotenv').config();
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cors = require('cors'); 
const app = express();
const PASSWORD = process.env.Password;

const MAX_RESULTS = 10;

// Use Helmet for basic security
app.use(helmet());

// Use compression
app.use(compression());
app.use(cors());
// Rate limiting
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 60 minutes
    max: 1000 // limit each IP to 1000 requests per windowMs
});
app.use(limiter);
app.use(express.static('public'));
let singleLinerDb = new sqlite3.Database('singleliner.db');
let jokesDb = new sqlite3.Database('jokes.db');

app.get('/api/singleliner', (req, res) => {
    let result = req.query.result || 1;
    let id = req.query.id;
    let password = req.query.password;
    let sql;

    if (result > MAX_RESULTS && (!password || !PASSWORD.includes(password))) {
        res.json({success: false, error: `Parameter value not allowed. Maximum value for "result" is ${MAX_RESULTS}.`});
        return;
    }

    if (id) {
        sql = `SELECT * FROM singleliner WHERE id = ${id}`;
    } else {
        sql = `SELECT * FROM singleliner ORDER BY RANDOM() LIMIT ${result}`;
    }

    singleLinerDb.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json({success: true, jokes: rows});
    });
});

app.get('/api/jokes', (req, res) => {
    let result = req.query.result || 1;
    let id = req.query.id;
    let password = req.query.password;
    let sql;

    if (result > MAX_RESULTS && (!password || !PASSWORD.includes(password))) {
        res.json({success: false, error: `Parameter value not allowed. Maximum value for "result" is ${MAX_RESULTS}.`});
        return;
    }

    if (id) {
        sql = `SELECT * FROM jokes WHERE id = ${id}`;
    } else {
        sql = `SELECT * FROM jokes ORDER BY RANDOM() LIMIT ${result}`;
    }

    jokesDb.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json({success: true, jokes: rows});
    });
});

app.get('/api/random', (req, res) => {
    // Randomly select a database
    let db = Math.random() < 0.5 ? singleLinerDb : jokesDb;
    let tableName = db === singleLinerDb ? 'singleliner' : 'jokes';

    let sql = `SELECT * FROM ${tableName} ORDER BY RANDOM() LIMIT 1`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.json({success: true, joke: rows[0]});
    });
});
app.use(function (req, res, next) {
    res.status(404).sendFile(path.join(__dirname+'/404.html'));
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

process.on('SIGINT', () => {
    singleLinerDb.close();
    jokesDb.close();
    process.exit();
});