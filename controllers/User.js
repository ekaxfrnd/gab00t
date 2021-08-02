const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../models/User')

module.exports = {
    getRegister: (req, res) => {
        res.render('auth/register', {
            layout: 'auth',
            title: 'Register',
            fail: req.flash('fail'),
            error: req.flash('error')
        })
    },
    getLogin: (req, res) => {
        res.render('auth/login', {
            layout: 'auth',
            title: 'Login',
            success: req.flash('success'),
            fail: req.flash('fail'),
            error: req.flash('error')
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
                req.flash('fail', 'content can not be empty!')
                res.redirect('/auth/register')
                return
            }
            if(password != confirm_password) {
                req.flash('fail', 'password do not match!')
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
                req.flash('success', 'you are now registered.')
                res.redirect('/auth/login')
                return
            } else {
                req.flash('fail', 'email already registered!')
                res.redirect('/auth/register')
                return
            }
        } catch (err) {
            req.flash('error', 'something error, call developer!')
            res.redirect('/auth/register')
            return
        }
    },
    postLogin: (req, res, next) => {
        const {
            email,
            password
        } = req.body
        if(!email || !password) {
            req.flash('fail', 'content can not be empty!')
            res.redirect('/auth/login')
            return
        }
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/auth/login',
            successFlash: true
        })(req, res, next)
    },
    getDashboard: (req, res) => {
        res.render('dashboard', {
            email: req.user.email
        })
    }
}