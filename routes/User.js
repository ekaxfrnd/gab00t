const router = require('express').Router()

const {
    getRegister,
    getLogin,
    postRegister,
    postLogin,
    getDashboard
} = require('../controllers/User')

const {
    checkNotAuthenticated,
    checkAuthenticated
} = require('../middleware/Auth')

router.get('/auth/register', checkNotAuthenticated, getRegister)
router.get('/auth/login', checkNotAuthenticated, getLogin)
router.post('/auth/register', checkNotAuthenticated, postRegister)
router.post('/auth/login', checkNotAuthenticated, postLogin)

router.get('/dashboard', checkAuthenticated, getDashboard)

module.exports = router