// routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Shoes
router.get('/shoes', productController.getShoes);
router.get('/shoes/:article', productController.getShoeByArticle);

// Shorts
router.get('/shorts', productController.getShorts);
router.get('/shorts/:article', productController.getShortsByArticle);

// Trousers
router.get('/trousers', productController.getTrousers);
router.get('/trousers/:article', productController.getTrousersByArticle);

// T-shirt
router.get('/t_shirt', productController.getTShirt);
router.get('/t_shirt/:article', productController.getTShirtByArticle);

// Socks
router.get('/socks', productController.getSocks);
router.get('/socks/:article', productController.getSocksByArticle);

// Hoodies
router.get('/hoodies', productController.getHoodies);
router.get('/hoodies/:article', productController.getHoodiesByArticle);

// Jackets
router.get('/jackets', productController.getJackets);
router.get('/jackets/:article', productController.getJacketsByArticle);

// In-stock page (хранимые процедуры)
router.get('/instock-page', productController.getInstockPage);
router.get('/instock-page/:article', productController.getInstockPageProduct);

module.exports = router;
