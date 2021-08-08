const router = require('express').Router()

const {
    getLogin,
    postLogin,
    getDashboard,
    logout
} = require('../controllers/User')

const {
    getAllUser
} = require('../controllers/Administrator')

const {
    checkNotAuthenticated,
    checkAuthenticated
} = require('../middleware/Auth')

router.get('/auth/login', checkNotAuthenticated, getLogin)
router.post('/auth/login', checkNotAuthenticated, postLogin)
router.get('/dashboard/administrator', checkAuthenticated, getDashboard)
router.get('/logout', logout)

router.get('/dashboard/administrator/users', getAllUser)

module.exports = router