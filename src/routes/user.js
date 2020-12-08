const express = require('express');
const router = express.Router();
const path = require('path');
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join('public/images/users'))
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage,
  fileFilter: (req, file, cb)=>{
      const acceptedExt = ['.jpg','.png','.jpeg','.webp']
      const ext = path.extname(file.originalname);
      
      if(!acceptedExt.includes(ext)){
          req.file = file;
      }
      cb(null, acceptedExt.includes(ext))
  }
})

const userController = require('../controllers/userController');
const validator = require('../middlewares/validator');

// Muestra la vista de registro
router.get('/register', userController.showRegister);

// Procesa la vista de registro
router.post('/register', upload.single('avatar'), validator.register,  userController.processRegister);

// Muestra la vista de login
router.get('/login', userController.showLogin);

// Procesa la vista de login
router.post('/login', userController.processLogin);

// Muestra el perfil del usuario
router.get('/profile', userController.showProfile);

// Cierra la sesión
router.get('/logout', userController.logout);

module.exports = router;