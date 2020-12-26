const helpers = require('../helpers/dataBase');
const { validationResult } = require('express-validator')
module.exports = {
	// Root - Show all products
	index: (req, res) => {
		const products = helpers.getAllDataBase('products.json');
		res.render('products/products', { allProducts: products })
	},
	sales:(req,res)=>{
		const products = helpers.getAllDataBase('products.json');
		const inSale = products.filter((product) => {
			return product.category == 'in-sale';
		});
		res.render('products/sales', {
			inSaleProducts: inSale
		});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const products = helpers.getAllDataBase('products.json');
		const id = req.params.id;
		const result = products.find((product) => {
			return product.id == id;
		})

		res.render('products/detail', {
			product: result
		})
	},
	// Create - Form to create
	create: (req, res) => {
		res.render('products/product-create-form')
	},

	// Create -  Method to store
	store: (req, res, next) => {
		const result = validationResult(req)
		if(!result.isEmpty()){
			return res.render('products/product-create-form', {
				errors : result.mapped(),
				old : req.body
			})
		}
		const newProduct = {
			id: helpers.generateId('products.json'),
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.files[0].filename
		}

		const products = helpers.getAllDataBase('products.json');
		const productsToSave = [...products, newProduct];

		helpers.writeNewDataBase(productsToSave,'products.json');
		
		res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const products = helpers.getAllDataBase('products.json');
		const id = req.params.id;
		const result = products.find((product) => {
			return product.id == id;
		})

		res.render('products/product-edit-form',{
			productToEdit: result
		})
		
	},

	// Update - Method to update
	update: (req, res) => {

		// Do the magic

		/*
		1) llamamos la funcion que nos trae todos los productos 
		2) recorremos el array de productos
		3) identificamos el producto que queres editar
		4) lo editamos
		5) lo guardamos en la base de datos todo el array de productos
		*/


		const products = helpers.getAllDataBase('products.json');
		const id = req.params.id;
	
		const editedProducts = products.map(function(product){
			if (product.id == id){
				product.name = req.body.name
				product.price = req.body.price
				product.discount = req.body.discount
				product.category = req.body.category
				product.description = req.body.description
				product.image = req.files[0] ? req.files[0].filename : product.image
			}
			return product
		})

		helpers.writeNewDataBase(editedProducts,'products.json');

		res.redirect('/')
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		const products = helpers.getAllDataBase('products.json');
		const id = req.params.id
		const productDeletedDone = products.filter(product =>{
			return product.id != id;
		})
		helpers.writeNewDataBase(productDeletedDone,'products.json')
		res.redirect('/')	
		}
	}
	

