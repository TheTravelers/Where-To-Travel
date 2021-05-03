require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session')
const userCtrl = require('./controllers/authController')
const userListCtrl = require('./controllers/userListController')
const filterCtrl = require('./controllers/filters')

app.use(express.json());

const { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env;
const nodemailerCtrl = require('./controllers/nodeMailerCtrl')

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 //one week?
    }
}))

// AUTH ENDPOINTS
app.post('/auth/register', userCtrl.register)
app.post('/auth/login', userCtrl.login)
app.post('/auth/logout', userCtrl.logout)

app.get('/auth/me', userCtrl.getUser)
//USER LIST ENDPOINTS
app.get('/userDestList/:user_id', userListCtrl.getDestinations)
app.post('/userDestList/:user_id', userListCtrl.addDestination)

// FILTER ENDPOINTS

app.post('/api/filters', filterCtrl.filter)

// NODEMAILER ENDPOINT
app.post('/api/send-email',nodemailerCtrl.sendEmail);

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