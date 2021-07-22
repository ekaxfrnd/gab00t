const bcrypt = require('bcryptjs')

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
    },
    postRegister: async (req, res) => {
        try {
            const {
                first_name,
                last_name,
                email
            } = req.body
            let { password, confirm_password } = req.body
            if(!first_name || !last_name || !email || !password || !confirm_password) {
                res.redirect('/auth/register')
                return
            }
            if(password != confirm_password) {
                res.redirect('/auth/register')
                return
            }
            const user = await User.findOne({ where: { email }})
            if(!user) {
                const hashedPassword = await bcrypt.hash(password, 12)
                await User.create({
                    first_name,
                    last_name,
                    email,
                    password: hashedPassword
                })
                res.redirect('/auth/login')
                return
            } else {
                res.redirect('/auth/register')
                return
            }
        } catch (err) {
            res.redirect('/auth/register')
            return
        }
    }
}