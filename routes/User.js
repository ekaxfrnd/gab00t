const router = require('express').Router()

const {
    getRegister,
    getLogin,
    postRegister
} = require('../controllers/User')

router.get('/auth/register', getRegister)
router.get('/auth/login', getLogin)
router.post('/auth/register', postRegister)

module.exports = router