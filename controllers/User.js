const User = require('../models/User')

module.exports = {
    getRegister: (req, res) => {
        res.render('register', {
            layout: 'auth',
            title: 'Register'
        })
    },
    getLogin: (req, res) => {
        res.render('login', {
            layout: 'auth',
            title: 'Login'
        })
    }
}