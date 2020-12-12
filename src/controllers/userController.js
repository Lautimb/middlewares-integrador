
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const helpers = require('../helpers/dataBase');

module.exports = {
    showRegister: (req,res) => {
        return res.render('user/user-register-form');
    },
    processRegister: (req, res) => {

        const results = validationResult(req)
        if(!results.isEmpty()){
            
            return res.render('user/user-register-form', {
                errors : results.errors,
                email : req.body.email
            })
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const newUser = {
            id: helpers.generateId('users.json'),
            email: req.body.email,
            password: hashedPassword,
            avatar: req.file.filename
        }
        const allUsers = helpers.getAllDataBase('users.json');
        const usersToSave = [...allUsers, newUser];
        helpers.writeNewDataBase(usersToSave,'users.json');

        return res.redirect('/');
    },
    showLogin: (req,res) => {
       res.render('user/user-login-form');
    },
    processLogin: (req, res) => {
        const results = validationResult(req);
        
        if(!results.isEmpty()){
            return res.render('user/user-login-form',{
                errors : results,
                email: req.body.email
            })
        }
        const users = helpers.getAllDataBase('users.json')
        const userFound = users.find( user => user.email == req.body.email )
        
        req.session.user = userFound

        if (req.body.remember){
            res.cookie('user', userFound.id, {maxAge: 1000 * 60 * 60 * 24 * 365})
        }

        return res.redirect('/')

    },
    showProfile: (req, res) => {
        return res.render('user/profile');
    },
    logout: (req, res) => {
     
        return res.redirect('/');
    }

}