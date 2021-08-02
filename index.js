const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')
const exphbs = require('express-handlebars')
const flash = require('connect-flash')
require('dotenv').config()
const path = require('path')

const logger = require('morgan')

const app = express()

const {
    SERVER_HOST,
    SERVER_PORT,
    SESSION_SECRET
} = process.env

app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }))

// session config
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

// passport config
require('./config/passport')
app.use(passport.initialize())
app.use(passport.session())

// database connection
const connection = require('./config/connection')
const connectDB = async () => {
    try {
        await connection.authenticate()
        console.log('db connected success.')
    } catch (err) {
        console.log(`db connection error: ${err.message}`)
    }
}
connectDB()

// view engine
const hbs = exphbs.create({
    defaultLayout: 'dashboard',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.use(flash())

// static folder
app.use(express.static(path.join(__dirname, 'assets')))

// main routes
app.get('/', (req, res) => {
    res.redirect('/dashboard')
})

// routes user
app.use('/', require('./routes/User'))

app.listen(SERVER_PORT, () => {
    console.log(`server running on: http://${SERVER_HOST}:${SERVER_PORT}`)
})