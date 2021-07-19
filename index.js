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

// view engine
app.engine('.hbs', exphbs({ extname: '.hbs' }))
app.set('view engine', '.hbs')

// static folder
app.use(express.static(path.join(__dirname, 'assets')))

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(SERVER_PORT, () => {
    console.log(`server running on: http://${SERVER_HOST}:${SERVER_PORT}`)
})