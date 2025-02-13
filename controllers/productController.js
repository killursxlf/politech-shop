// controllers/productController.js
const connection = require('../config/database');

// -------------------- Shoes --------------------
exports.getShoes = async (req, res) => {
  try {
    const query = 'SELECT * FROM shoes';
    const [results] = await connection.query(query);
    res.render('shoes', { shoes: results, title: 'Взуття' });
  } catch (err) {
    console.error('Ошибка выполнения запроса (shoes): ', err);
    res.status(500).send('Ошибка на сервере');
  }
};

exports.getShoeByArticle = async (req, res) => {
  try {
    const article = req.params.article;
    const query = 'SELECT * FROM shoes WHERE article = ?';
    const [results] = await connection.query(query, [article]);
    if (results.length > 0) {
      res.render('shoes-prod', { product: results[0] });
    } else {
      res.status(404).send('Товар не найден');
    }
  } catch (err) {
    console.error('Ошибка выполнения запроса (shoes by article): ', err);
    res.status(500).send('Ошибка на сервере');
  }
};

// -------------------- Shorts --------------------
exports.getShorts = async (req, res) => {
  try {
    const query = 'SELECT * FROM shorts';
    const [results] = await connection.query(query);
    res.render('shorts', { shorts: results, title: 'Шорти' });
  } catch (err) {
    console.error('Ошибка выполнения запроса (shorts): ', err);
    res.status(500).send('Ошибка на сервере');
  }
};

exports.getShortsByArticle = async (req, res) => {
  try {
    const article = req.params.article;
    const query = 'SELECT * FROM shorts WHERE article = ?';
    const [results] = await connection.query(query, [article]);
    if (results.length > 0) {
      res.render('shorts-prod', { product: results[0] });
    } else {
      res.status(404).send('Товар не найден');
    }
  } catch (err) {
    console.error('Ошибка выполнения запроса (shorts by article): ', err);
    res.status(500).send('Ошибка на сервере');
  }
};

// -------------------- Trousers --------------------
exports.getTrousers = async (req, res) => {
  try {
    const query = 'SELECT * FROM trousers';
    const [results] = await connection.query(query);
    res.render('trousers', { trousers: results, title: 'Штани' });
  } catch (err) {
    console.error('Ошибка выполнения запроса (trousers): ', err);
    res.status(500).send('Ошибка на сервере');
  }
};

exports.getTrousersByArticle = async (req, res) => {
  try {
    const article = req.params.article;
    const query = 'SELECT * FROM trousers WHERE article = ?';
    const [results] = await connection.query(query, [article]);
    if (results.length > 0) {
      res.render('trousers-prod', { product: results[0] });
    } else {
      res.status(404).send('Товар не найден');
    }
  } catch (err) {
    console.error('Ошибка выполнения запроса (trousers by article): ', err);
    res.status(500).send('Ошибка на сервере');
  }
};

// -------------------- T-shirt --------------------
exports.getTShirt = async (req, res) => {
  try {
    const query = 'SELECT * FROM t_shirt';
    const [results] = await connection.query(query);
    res.render('t_shirt', { t_shirt: results, title: 'Футболки' });
  } catch (err) {
    console.error('Ошибка выполнения запроса (t_shirt): ', err);
    res.status(500).send('Ошибка на сервере');
  }
};

exports.getTShirtByArticle = async (req, res) => {
  try {
    const article = req.params.article;
    const query = 'SELECT * FROM t_shirt WHERE article = ?';
    const [results] = await connection.query(query, [article]);
    if (results.length > 0) {
      res.render('t_shirt-prod', { product: results[0] });
    } else {
      res.status(404).send('Товар не найден');
    }
  } catch (err) {
    console.error('Ошибка выполнения запроса (t_shirt by article): ', err);
    res.status(500).send('Ошибка на сервере');
  }
};

// -------------------- Socks --------------------
exports.getSocks = async (req, res) => {
  try {
    const query = 'SELECT * FROM socks';
    const [results] = await connection.query(query);
    res.render('socks', { socks: results, title: 'Шкарпетки' });
  } catch (err) {
    console.error('Ошибка выполнения запроса (socks): ', err);
    res.status(500).send('Ошибка на сервере');
  }
};

exports.getSocksByArticle = async (req, res) => {
  try {
    const article = req.params.article;
    const query = 'SELECT * FROM socks WHERE article = ?';
    const [results] = await connection.query(query, [article]);
    if (results.length > 0) {
      res.render('socks-prod', { product: results[0] });
    } else {
      res.status(404).send('Товар не найден');
    }
  } catch (err) {
    console.error('Ошибка выполнения запроса (socks by article): ', err);
    res.status(500).send('Ошибка на сервере');
  }
};

// -------------------- Hoodies --------------------
exports.getHoodies = async (req, res) => {
  try {
    const query = 'SELECT * FROM hoodies';
    const [results] = await connection.query(query);
    res.render('hoodies', { hoodies: results, title: 'Худі' });
  } catch (err) {
    console.error('Ошибка выполнения запроса (hoodies): ', err);
    res.status(500).send('Ошибка на сервере');
  }
};

exports.getHoodiesByArticle = async (req, res) => {
  try {
    const article = req.params.article;
    const query = 'SELECT * FROM hoodies WHERE article = ?';
    const [results] = await connection.query(query, [article]);
    if (results.length > 0) {
      res.render('hoodies-prod', { product: results[0] });
    } else {
      res.status(404).send('Товар не найден');
    }
  } catch (err) {
    console.error('Ошибка выполнения запроса (hoodies by article): ', err);
    res.status(500).send('Ошибка на сервере');
  }
};

// -------------------- Jackets --------------------
exports.getJackets = async (req, res) => {
  try {
    const query = 'SELECT * FROM jackets';
    const [results] = await connection.query(query);
    res.render('jackets', { jackets: results, title: 'Кофти' });
  } catch (err) {
    console.error('Ошибка выполнения запроса (jackets): ', err);
    res.status(500).send('Ошибка на сервере');
  }
};

exports.getJacketsByArticle = async (req, res) => {
  try {
    const article = req.params.article;
    const query = 'SELECT * FROM jackets WHERE article = ?';
    const [results] = await connection.query(query, [article]);
    if (results.length > 0) {
      res.render('jackets-prod', { product: results[0] });
    } else {
      res.status(404).send('Товар не найден');
    }
  } catch (err) {
    console.error('Ошибка выполнения запроса (jackets by article): ', err);
    res.status(500).send('Ошибка на сервере');
  }
};

// -------------------- In-stock page (через хранимые процедуры) --------------------

// GET /products/instock-page?sort=priceAsc
exports.getInstockPage = async (req, res) => {
  try {
    let sortOrder = req.query.sort || 'priceAsc';
    const query = 'CALL AllItems(?)';
    const [results] = await connection.query(query, [sortOrder]);
    const products = results[0];
    res.render('instock-page', { instock_page: products, title: 'In Stock' });
  } catch (err) {
    console.error('Ошибка выполнения запроса (instock-page): ', err);
    res.status(500).send('Ошибка запроса к базе данных');
  }
};

// GET /products/instock-page/:article
exports.getInstockPageProduct = async (req, res) => {
  try {
    const article = req.params.article;
    const query = 'CALL FindItem(?)';
    const [results] = await connection.query(query, [article]);
    if (results[0] && results[0].length > 0) {
      const product = results[0][0];
      // Если поле sizes не строка – приводим к строке
      if (product.sizes && typeof product.sizes !== 'string') {
        product.sizes = String(product.sizes);
      }
      if (!product.sizes) {
        product.sizes = '';
      }
      res.render('instock-page-prod', { product });
    } else {
      res.status(404).send('Товар не найден');
    }
  } catch (err) {
    console.error('Ошибка выполнения запроса (instock-page product): ', err);
    res.status(500).send('Ошибка запроса к базе данных');
  }
};
