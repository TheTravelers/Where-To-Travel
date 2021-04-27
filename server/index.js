require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session')

app.use(express.json());

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 //one week?
    }
}))

// AUTH ENDPOINTS



// ENDPOINTS



// NODEMAILER ENDPOINT

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then((dbInstance) => {
    app.set('db', dbInstance)
    app.listen(SERVER_PORT, () => console.log(`Server and db are up and running on port ${SERVER_PORT}`))
})
.catch(err => console.log(err))