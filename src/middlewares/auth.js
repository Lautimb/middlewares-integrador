module.exports = (req, res, next) => {
    if(!req.session.user){
       return res.redirect('/user/login')
    }
    return next();
}