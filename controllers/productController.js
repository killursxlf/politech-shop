// controllers/productController.js
const connection = require('../config/database');

// -------------------- Shoes --------------------
exports.getShoes = (req, res) => {
  const query = 'SELECT * FROM shoes';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (shoes): ', err);
      return res.status(500).send('Ошибка на сервере');
    }
    res.render('shoes', { shoes: results, title: 'Взуття' });
  });
};

exports.getShoeByArticle = (req, res) => {
  const article = req.params.article;
  const query = 'SELECT * FROM shoes WHERE article = ?';
  connection.query(query, [article], (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (shoes by article): ', err);
      return res.status(500).send('Ошибка на сервере');
    }
    if (results.length > 0) {
      res.render('shoes-prod', { product: results[0] });
    } else {
      res.status(404).send('Товар не найден');
    }
  });
};

// -------------------- Shorts --------------------
exports.getShorts = (req, res) => {
  const query = 'SELECT * FROM shorts';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (shorts): ', err);
      return res.status(500).send('Ошибка на сервере');
    }
    res.render('shorts', { shorts: results, title: 'Шорти' });
  });
};

exports.getShortsByArticle = (req, res) => {
  const article = req.params.article;
  const query = 'SELECT * FROM shorts WHERE article = ?';
  connection.query(query, [article], (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (shorts by article): ', err);
      return res.status(500).send('Ошибка на сервере');
    }
    if (results.length > 0) {
      res.render('shorts-prod', { product: results[0] });
    } else {
      res.status(404).send('Товар не найден');
    }
  });
};

// -------------------- Trousers --------------------
exports.getTrousers = (req, res) => {
  const query = 'SELECT * FROM trousers';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (trousers): ', err);
      return res.status(500).send('Ошибка на сервере');
    }
    res.render('trousers', { trousers: results, title: 'Штани' });
  });
};

exports.getTrousersByArticle = (req, res) => {
  const article = req.params.article;
  const query = 'SELECT * FROM trousers WHERE article = ?';
  connection.query(query, [article], (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (trousers by article): ', err);
      return res.status(500).send('Ошибка на сервере');
    }
    if (results.length > 0) {
      res.render('trousers-prod', { product: results[0] });
    } else {
      res.status(404).send('Товар не найден');
    }
  });
};

// -------------------- T-shirt --------------------
exports.getTShirt = (req, res) => {
  const query = 'SELECT * FROM t_shirt';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (t_shirt): ', err);
      return res.status(500).send('Ошибка на сервере');
    }
    res.render('t_shirt', { t_shirt: results, title: 'Футболки' });
  });
};

exports.getTShirtByArticle = (req, res) => {
  const article = req.params.article;
  const query = 'SELECT * FROM t_shirt WHERE article = ?';
  connection.query(query, [article], (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (t_shirt by article): ', err);
      return res.status(500).send('Ошибка на сервере');
    }
    if (results.length > 0) {
      res.render('t_shirt-prod', { product: results[0] });
    } else {
      res.status(404).send('Товар не найден');
    }
  });
};

// -------------------- Socks --------------------
exports.getSocks = (req, res) => {
  const query = 'SELECT * FROM socks';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (socks): ', err);
      return res.status(500).send('Ошибка на сервере');
    }
    res.render('socks', { socks: results, title: 'Шкарпетки' });
  });
};

exports.getSocksByArticle = (req, res) => {
  const article = req.params.article;
  const query = 'SELECT * FROM socks WHERE article = ?';
  connection.query(query, [article], (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (socks by article): ', err);
      return res.status(500).send('Ошибка на сервере');
    }
    if (results.length > 0) {
      res.render('socks-prod', { product: results[0] });
    } else {
      res.status(404).send('Товар не найден');
    }
  });
};

// -------------------- Hoodies --------------------
exports.getHoodies = (req, res) => {
  const query = 'SELECT * FROM hoodies';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (hoodies): ', err);
      return res.status(500).send('Ошибка на сервере');
    }
    res.render('hoodies', { hoodies: results, title: 'Худі' });
  });
};

exports.getHoodiesByArticle = (req, res) => {
  const article = req.params.article;
  const query = 'SELECT * FROM hoodies WHERE article = ?';
  connection.query(query, [article], (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (hoodies by article): ', err);
      return res.status(500).send('Ошибка на сервере');
    }
    if (results.length > 0) {
      res.render('hoodies-prod', { product: results[0] });
    } else {
      res.status(404).send('Товар не найден');
    }
  });
};

// -------------------- Jackets --------------------
exports.getJackets = (req, res) => {
  const query = 'SELECT * FROM jackets';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (jackets): ', err);
      return res.status(500).send('Ошибка на сервере');
    }
    res.render('jackets', { jackets: results, title: 'Кофти' });
  });
};

exports.getJacketsByArticle = (req, res) => {
  const article = req.params.article;
  const query = 'SELECT * FROM jackets WHERE article = ?';
  connection.query(query, [article], (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (jackets by article): ', err);
      return res.status(500).send('Ошибка на сервере');
    }
    if (results.length > 0) {
      res.render('jackets-prod', { product: results[0] });
    } else {
      res.status(404).send('Товар не найден');
    }
  });
};

// -------------------- In-stock page (через хранимые процедуры) --------------------

// GET /products/instock-page?sort=priceAsc
exports.getInstockPage = (req, res) => {
  let sortOrder = req.query.sort || 'priceAsc';
  const query = 'CALL AllItems(?)';
  connection.query(query, [sortOrder], (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (instock-page): ', err);
      return res.status(500).send('Ошибка запроса к базе данных');
    }
    const products = results[0];
    res.render('instock-page', { instock_page: products, title: 'In Stock' });
  });
};

// GET /products/instock-page/:article
exports.getInstockPageProduct = (req, res) => {
  const article = req.params.article;
  const query = 'CALL FindItem(?)';
  connection.query(query, [article], (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса (instock-page product): ', err);
      return res.status(500).send('Ошибка запроса к базе данных');
    }
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
  });
};
