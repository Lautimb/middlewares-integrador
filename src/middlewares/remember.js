const helpers = require('../helpers/dataBase');

module.exports = (req,res,next) => {

    if(req.cookies.user != undefined && req.session.user == undefined){
        const users = helpers.getAllDataBase('user.json')
        const userToLog = users.find( user => user.id == req.cookies.user.value)
        return req.session.user = userToLog
    }
    next()
}