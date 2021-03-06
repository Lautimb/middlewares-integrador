// ************ Require's ************
const express = require('express');
const router = express.Router();
const validator = require('../middlewares/validator')
const multerProducts = require('../middlewares/multer/products')
const auth = require('../middlewares/auth');



// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/
router.get('/', productsController.index);

/*** CREATE ONE PRODUCT ***/
router.get('/create', auth, productsController.create);
router.post('/create', multerProducts.single('image'), validator.productsUp, productsController.store);
router.get('/sales', productsController.sales);

/*** GET ONE PRODUCT ***/
router.get('/detail/:id', productsController.detail); // http://localhost:3000/products/detail/6

/*** EDIT ONE PRODUCT ***/
router.get('/edit/:id', auth, productsController.edit);
router.put('/edit/:id', multerProducts.single('image'), validator.productsUp, productsController.update);

/*** DELETE ONE PRODUCT***/
router.delete('/delete/:id', auth, productsController.destroy);


module.exports = router;
