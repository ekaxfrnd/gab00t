const router = require('express').Router()

const {
    getRegister,
    getLogin
} = require('../controllers/User')

router.get('/auth/register', getRegister)
router.get('/auth/login', getLogin)

module.exports = router