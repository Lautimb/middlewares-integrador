
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')


const manageUserData = require('../helpers/dataBase')

module.exports = {
    showRegister: (req, res) => {
        return res.render('user/user-register-form');
    },
    processRegister: (req, res) => {

        const result = validationResult(req)
        if(!result.errors.isEmpty()){
            
            return res.render('user/user-register-form', {
                errors : result.errors,
                email : req.body.email
            })
        }
        const hashedPassword = bcrypt.hashSync(req.body.password, 12);
        const newUser = {
            id: manageUserData.generateId('users.json'),
            email: req.body.email,
            password: hashedPassword,
            avatar: req.file.filename
        }
        const allUsers = manageUserData.getAllDataBase('users.json');
        const usersToSave = [...allUsers, newUser];
        manageUserData.writeNewDataBase(usersToSave,'users.json');

        return res.redirect('/');
    },
    showLogin: (req, res) => {
        // Do the magic
       res.render('user/user-login-form');
    },
    processLogin: (req, res) => {
        // Do the magic
        return res.send('Do the magic');
    },
    showProfile: (req, res) => {
        return res.render('user/profile');
    },
    logout: (req, res) => {
        // Do the magic
        return res.redirect('/');
    }

}