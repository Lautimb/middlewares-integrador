// ************ Require's ************
const express = require('express');
const router = express.Router();
const path = require('path')
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join('public/images/products'))
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

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index);

/*** CREATE ONE PRODUCT ***/
router.get('/create', productsController.create);
router.post('/create', upload.any(), productsController.store);
router.get('/sales', productsController.sales)

/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productsController.detail); // http://localhost:3000/products/detail/6

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', upload.any(), productsController.update);

/*** DELETE ONE PRODUCT***/
router.delete('/delete/:id', productsController.destroy);


module.exports = router;
