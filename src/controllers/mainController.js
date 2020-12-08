const helper = require('../helpers/dataBase');


module.exports = {
	index: (req, res) => {
		const products = helper.getAllDataBase('products.json');

		const visitedProducts = products.filter(product => product.category == 'visited');
		const inSaleProducts = products.filter(product => product.category == 'in-sale');

		return res.render('index', {
			visitedProducts,
			inSaleProducts
		});
	},
	search: (req, res) => {
		const products = helper.getAllDataBase('products.json')	
		const searched = req.query.keywords.toLowerCase();  // Guardo en una variable lo escrito en el fomulario 
		
		const foundProducts = products.filter(product => product.name.toLowerCase().includes(searched));   // A través de un filter guardo en una variable los productos que coinciden 
																										   //en su nombre transformando el string en lowercase 
																										   //con las lestras guardabas en searched

		res.render('results', {					// Renderizo results, y envio los productos encontrados dentro de un objeto a la vista para poder manipularlo
			products: foundProducts
		})
	}	
}


