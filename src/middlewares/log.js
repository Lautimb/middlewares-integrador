const helpers = require('../helpers/dataBase');

module.exports = (req, res, next) =>{
    if(!req.session.user && req.cookies.user){
        const allUser = helpers.getAllDataBase('users.json')
        const userFound = allUser.find( user => user.id == req.cookies.user )
        req.session.user = userFound;
    }
    return next()
}