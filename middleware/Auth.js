module.exports = {
    checkAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()) {
            return next()
        }
        res.redirect('/auth/login')
        return
    },
    checkNotAuthenticated: (req, res, next) => {
        if(req.isAuthenticated()) {
            return res.redirect('/dashboard')
        }
        next()
        return 
    }
}