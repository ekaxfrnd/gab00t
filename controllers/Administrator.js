const User = require('../models/User')

module.exports = {
    getAllUser: async (req, res) => {
        try {
            const users = await User.findAll()
            res.render('administrator', {
                users: users
            })
            console.log(users)
        } catch (err) {
            console.log(err.message)
        }
    }
}