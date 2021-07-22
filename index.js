const express = require('express')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')
require('dotenv').config()
const path = require('path')

const logger = require('morgan')

const app = express()

const {
    SERVER_HOST,
    SERVER_PORT
} = process.env

app.use(logger('dev'))

app.use(bodyParser.urlencoded({ extended: false }))

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

// static folder
app.use(express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Dashboard',
        user: 'unique'
    })
})

// routes user
app.use('/', require('./routes/User'))

app.listen(SERVER_PORT, () => {
    console.log(`server running on: http://${SERVER_HOST}:${SERVER_PORT}`)
})