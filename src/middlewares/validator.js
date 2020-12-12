const {body} = require('express-validator');
const helpers = require('../helpers/dataBase');
const path = require('path');
const bcrypt = require('bcryptjs');

module.exports = { 
    register: [
        body('email')
            .notEmpty().
                withMessage('El campo email es obligatorio')
                .bail()
            .isEmail()
                .withMessage('Ingrese un email válido')
                .bail()
            .custom((value, { req })=>{
                const allUsers = helpers.getAllDataBase('users.json');
                const user = allUsers.find( user => user.email == value ) 
                    return !user
            })
                .withMessage('El email ya se encuentra registrado'),

        body('avatar')
            .custom((value, { req })=>{
                return req.file
            })
                .withMessage('Imagen obligatoria')
                .bail()
            .custom((value, { req })=>{
                if(!req.file != undefined){
                    const ext = path.extname(req.file.originalname)
                    const acceptedExt = ['.jpg','.png','.jpeg','.webp']
                    return acceptedExt.includes(ext)
                }
                
                return false;

            })
                .withMessage('Formatos de imagenes válidos jpg , png, jpeg o webp')
                .bail(),

        body('password')
            .notEmpty()
                .withMessage('El campo contraseña es obligatorio')
                .bail()
            .isLength({ min : 6})
                .withMessage('La contraseña debe tener mas de 6 caracteres')
                .bail()
            .custom((value, { req })=>{
                return value == req.body.retype
            })
                .withMessage('Las contraseñas deben ser iguales'),

        body('retype')
            .notEmpty()
                .withMessage('El campo repetir contraseña es obligatorio')
                .bail(),
    ],

    login:[ 
        body('email')
            .notEmpty()
                .withMessage('El campo email es obligatorio')
                .bail()
            .isEmail()
                .withMessage('Ingrese un email válido')
                .bail()
            .custom((value , {req})=>{
                const users = helpers.getAllDataBase('users.json')
                const userFound = users.find( user=>{
                    return user.email == value;
                })
                return userFound
            })
                .withMessage('El usuario no existe')
                .bail()
            .custom((value, {req})=>{
                const users = helpers.getAllDataBase('users.json')
                const userFound = users.find( user =>{
                    return user.email == req.body.email;
                })
                return bcrypt.compareSync(req.body.password, userFound.password)
            })
                .withMessage('Contraseña incorrecta')
        
    ]

}