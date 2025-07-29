const connection = require('../config/database');
const currencyService = require('../services/currencyService');
const path = require('path');
const fs = require('fs');

exports.getAdminPanel = async (req, res) => {
  try {
    const [ordersRaw] = await connection.execute(`
      SELECT order_id, first_name, last_name, total_amount, currency, status 
      FROM order_history
    `);

    const currencySymbols = {
      'UAH': '₴',
      'USD': '$',
      'EUR': '€',
    };

    const rates = await currencyService.getExchangeRates();

    const orders = ordersRaw.map(order => {
      const currencySymbol = currencySymbols[order.currency] || '';
      return {
        id: order.order_id,
        customerName: `${order.first_name} ${order.last_name}`,
        total: parseFloat(order.total_amount),
        currency: currencySymbol,
        status: order.status,
        originalCurrency: order.currency
      };
    });

    const totalRevenueUAH = orders.reduce((sum, order) => {
      const rate = order.originalCurrency === 'UAH' ? 1 : rates[order.originalCurrency] || 1;
      return sum + (order.total * rate);
    }, 0);

    const productTables = ['hoodies', 'jackets', 'shoes', 'shorts', 'socks', 'trousers', 't_shirt'];
    let products = [];

    for (const table of productTables) {
      const [rows] = await connection.execute(`SELECT article AS id, name, price FROM ${table}`);
      products = products.concat(rows.map(row => ({ ...row, category: table })));
    }

    const adminInfo = {
      name: req.admin.name || 'Имя отсутствует',
      email: req.admin.email || 'Email отсутствует',
      role: req.admin.role || 'Роль отсутствует',
    };

    res.render('admin', {
      admin: adminInfo,
      products,
      orders,
      stats: {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: totalRevenueUAH,
      },
    });

  } catch (err) {
    console.error('Ошибка при получении данных админки:', err);
    res.status(500).send('Ошибка сервера');
  }
};

exports.addProduct = async (req, res) => {
  try {
    const { article, name, description, price, category, color } = req.body;
    let sizes = req.body.size || [];
    console.log('Размеры, пришедшие с формы:', req.body.size);

    if (!Array.isArray(sizes)) {
      sizes = [sizes]; 
    }

    const sizesString = sizes.join(' ');

    const imageFile = req.file;
    const ext = path.extname(imageFile.originalname);
    const newFileName = `${article}${ext}`;
    const categoryFolder = path.join(__dirname, '..', 'public', 'images', category);

    if (!fs.existsSync(categoryFolder)) {
      fs.mkdirSync(categoryFolder, { recursive: true });
    }

    const finalPath = path.join(categoryFolder, newFileName);
    fs.renameSync(imageFile.path, finalPath);

    const imagePath = `/images/${category}/${newFileName}`;

    const query = `
      INSERT INTO ${category} 
      (article, name, description, price, color, sizes) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await connection.execute(query, [
      article,
      name,
      description,
      parseFloat(price),
      color,
      sizesString
    ]);

    res.redirect('/admin#products');

  } catch (err) {
    console.error('Ошибка при добавлении товара:', err);
    res.status(500).send('Ошибка сервера');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const article = req.params.id; 
    const category = req.body.category;

    if (!article || !category) {
      return res.status(400).send('Отсутствует артикул или категория товара');
    }

    const query = `DELETE FROM ${category} WHERE article = ?`;
    await connection.execute(query, [article]);

    res.redirect('/admin#products');

  } catch (err) {
    console.error('Ошибка при удалении товара:', err);
    res.status(500).send('Ошибка сервера');
  }
};
