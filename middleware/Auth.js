module.exports = {
    checkAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next()
        }
        return res.redirect('/auth/login')
    },
    checkNotAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()) {
            return res.redirect('/dashboard')
        }
        return next()
    }
}