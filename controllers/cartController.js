const { Product } = require('../models/product'); 

exports.getCart = (req, res) => {
  const cart = req.session.cart || [];
  res.render('cart', { cart });
};

exports.addToCart = async (req, res) => {
  const { article, size, category } = req.body;

  let productDetails;
  try {
    productDetails = await Product.findOne({ 
      where: { 
        article, 
        category 
      } 
    });
  } catch (error) {
    console.error('Ошибка поиска товара:', error);
    return res.status(500).json({ error: 'Ошибка на сервере' });
  }

  if (!productDetails) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  if (!req.session.cart) {
    req.session.cart = [];
  }

  req.session.cart.push({ ...productDetails.dataValues, size });

  res.json({ success: true, cart: req.session.cart });
};
