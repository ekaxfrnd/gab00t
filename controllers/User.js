const User = require('../models/User')

module.exports = {
    getRegister: (req, res) => {
        res.render('auth/register', {
            layout: 'auth',
            title: 'Register'
        })
    },
    getLogin: (req, res) => {
        res.render('auth/login', {
            layout: 'auth',
            title: 'Login'
        })
    }
}