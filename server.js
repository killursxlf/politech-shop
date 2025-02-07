const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { sequelize, DataTypes } = require('./models');
const { Product } = require('./models/product');
const session = require('express-session');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;  // Используем 3000 порт для сервера


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

sequelize.sync()
  .then(() => console.log('База данных синхронизирована'))
  .catch(err => console.log('Ошибка синхронизации базы данных:', err));


app.use(session({
  secret: 'your-secret-key',  // Уникальный секрет, можно выбрать любой
  resave: false,              // Не перезаписывать сессию, если нет изменений
  saveUninitialized: false,   // Не сохранять сессию, если она пустая
  cookie: { secure: false }   // Установите true, если работаете через HTTPS
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));


// Настройка подключения к базе данных
const connection = mysql.createConnection({
  host: '127.127.126.26',
  user: 'root',
  password: '', // Замените на свой пароль
  database: 'coursach'
});

// Подключение к базе данных
connection.connect((err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
    process.exit(1); // Если не удается подключиться, останавливаем сервер
  }
  console.log('База данных подключена!');
});

function getAllProducts() {
  return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM AllItems()', (err, results) => {
          if (err) {
              reject(err);
          } else {
              resolve(results);
          }
      });
  });
}


app.post('/api/data', (req, res) => {
  const { field1, field2 } = req.body;
  const query = 'INSERT INTO my_table (field1, field2) VALUES (?, ?)';
  connection.query(query, [field1, field2], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Ошибка добавления данных' });
    }
    res.status(200).json({ message: 'Данные успешно добавлены' });
  });
});

// Главная страница
app.get('/', (req, res) => {
  const topProducts = [
    { article: "H754LLK", image: 'images/shoes/H754LLK.jpg', name: 'Кросівки теплі', description: 'Зручні теплі повсякденні кросівки чорного кольору, підійдуть для жінок та чоловіків', price: '4300.00' },
    { article: "H754LFN", image: 'images/shoes/H754LFN.jpg', name: 'Кросівки теплі', description: 'Зручні теплі повсякденні кросівки темно-синього кольору, підійдуть для жінок та чоловіків', price: '4100.00' },
    { article: "MP43522BK", image: 'images/trousers/MP43522BK.jpg', name: 'Теплі бавовняні спортивні штани', description: 'Бавовняні теплі спортивні штани чорного кольору, підійдуть для жінок та чоловіків', price: '2700.00' },
    { article: "MT43524BK", image: 'images/hoodies/MT43524BK.jpg', name: 'Бавовняне тепле спортивне худі', description: 'Бавовняне тепле спортивне худі чорного кольору, підійде для жінок та чоловіків', price: '2900.00' }
  ];

  res.render('main_page', { 
    title: 'Магазин Політехнік', 
    products: topProducts 
  });
});


app.get('/shoes', (req, res) => {
    const query = 'SELECT * FROM shoes';  
    
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Ошибка выполнения запроса: ', err);
        res.status(500).send('Ошибка на сервере');
      } else {
        res.render('shoes', { 
          shoes: results,
          title: 'Взуття'  
        }); 
      }
    });
});

app.get('/shorts', (req, res) => {
    const query = 'SELECT * FROM shorts';  
    
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Ошибка выполнения запроса: ', err);
        res.status(500).send('Ошибка на сервере');
      } else {
        res.render('shorts', { 
          shorts: results,
          title: 'Шорти'  
        }); 
      }
    });
});

app.get('/trousers', (req, res) => {
  const query = 'SELECT * FROM trousers';  
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ', err);
      res.status(500).send('Ошибка на сервере');
    } else {
      res.render('trousers', { 
        trousers: results,
        title: 'Штани'  
      }); 
    }
  });
});

app.get('/t_shirt', (req, res) => {
  const query = 'SELECT * FROM t_shirt';  
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ', err);
      res.status(500).send('Ошибка на сервере');
    } else {
      res.render('t_shirt', { 
        t_shirt: results,
        title: 'Футболки'  
      }); 
    }
  });
});

app.get('/socks', (req, res) => {
  const query = 'SELECT * FROM socks';  
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ', err);
      res.status(500).send('Ошибка на сервере');
    } else {
      res.render('socks', { 
        socks: results,
        title: 'Шкарпетки'  
      }); 
    }
  });
});

app.get('/hoodies', (req, res) => {
  const query = 'SELECT * FROM hoodies';  
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ', err);
      res.status(500).send('Ошибка на сервере');
    } else {
      res.render('hoodies', { 
        hoodies: results,
        title: 'Худі'  
      }); 
    }
  });
});

app.get('/jackets', (req, res) => {
  const query = 'SELECT * FROM jackets';  
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Ошибка выполнения запроса: ', err);
      res.status(500).send('Ошибка на сервере');
    } else {
      res.render('jackets', { 
        jackets: results,
        title: 'Кофти'  
      }); 
    }
  });
});

app.get('/instock-page', (req, res) => {
  let sortOrder = req.query.sort || 'priceAsc'; 

  const query = 'CALL AllItems(?)'; 

  connection.query(query, [sortOrder], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Ошибка запроса к базе данных');
      return;
    }

    const products = results[0]; 

    res.render('instock-page', { instock_page: products, title: 'xxd'});
  });
});

app.get('/shoes/:article', (req, res) => {
  const article = req.params.article;

  const query = 'SELECT * FROM shoes WHERE article = ?';
  connection.query(query, [article], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
          res.render('shoes-prod', { product: results[0] });
      } else {
          res.status(404).send('Товар не найден');
      }
  });
});

app.get('/shorts/:article', (req, res) => {
  const article = req.params.article;

  const query = 'SELECT * FROM shorts WHERE article = ?';
  connection.query(query, [article], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
          res.render('shorts-prod', { product: results[0] });
      } else {
          res.status(404).send('Товар не найден');
      }
  });
});

app.get('/jackets/:article', (req, res) => {
  const article = req.params.article;

  const query = 'SELECT * FROM jackets WHERE article = ?';
  connection.query(query, [article], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
          res.render('jackets-prod', { product: results[0] });
      } else {
          res.status(404).send('Товар не найден');
      }
  });
});

app.get('/instock-page/:article', (req, res) => {
  const article = req.params.article;

  const query = 'CALL FindItem(?)';
  connection.query(query, [article], (err, results) => {
      if (err) {
          console.error(err);
          res.status(500).send('Ошибка запроса к базе данных');
          return;
      }

      // Убедимся, что у нас есть результат в results[0]
      if (results[0] && results[0].length > 0) {
          // Получаем товар из results[0], так как результат хранимой процедуры может быть массивом
          const product = results[0][0];

          // Преобразуем sizes в строку, если она не строка
          if (product.sizes && typeof product.sizes !== 'string') {
            product.sizes = String(product.sizes); // Преобразуем в строку
          }

          // Если sizes не существует, устанавливаем пустую строку
          if (!product.sizes) {
            product.sizes = '';
          }

          // Отправляем данные в шаблон
          res.render('instock-page-prod', { product: product });
      } else {
          res.status(404).send('Товар не найден');
      }
  });
});

app.get('/socks/:article', (req, res) => {
  const article = req.params.article;

  const query = 'SELECT * FROM socks WHERE article = ?';
  connection.query(query, [article], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
          res.render('socks-prod', { product: results[0] });
      } else {
          res.status(404).send('Товар не найден');
      }
  });
});

app.get('/trousers/:article', (req, res) => {
  const article = req.params.article;

  const query = 'SELECT * FROM trousers WHERE article = ?';
  connection.query(query, [article], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
          res.render('trousers-prod', { product: results[0] });
      } else {
          res.status(404).send('Товар не найден');
      }
  });
});


app.get('/t_shirt/:article', (req, res) => {
  const article = req.params.article;

  const query = 'SELECT * FROM t_shirt WHERE article = ?';
  connection.query(query, [article], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
          res.render('t_shirt-prod', { product: results[0] });
      } else {
          res.status(404).send('Товар не найден');
      }
  });
});

app.get('/hoodies/:article', (req, res) => {
  const article = req.params.article;

  const query = 'SELECT * FROM hoodies WHERE article = ?';
  connection.query(query, [article], (err, results) => {
      if (err) throw err;

      if (results.length > 0) {
          res.render('hoodies-prod', { product: results[0] });
      } else {
          res.status(404).send('Товар не найден');
      }
  });
});

app.get('/cart', (req, res) => {
  // Логируем сессию, чтобы понять, что в ней хранится
  console.log(req.session);

  // Если корзина не существует, создаем пустую корзину
  const cart = req.session.cart || [];
  res.render('cart', { cart });
});


app.post('/add-to-cart', async (req, res) => {
  const { article, size, category } = req.body; // Получаем артикул, размер и категорию товара

  // Ищем товар по артикулу и категории
  let productDetails = await Product.findOne({ 
    where: { 
      article, 
      category // Фильтруем по категории
    } 
  });

  if (!productDetails) {
    return res.status(404).json({ error: 'Товар не найден' });
  }

  // Пример добавления товара в корзину
  const cart = JSON.parse(req.cookies.cart || '[]');
  cart.push({ ...productDetails.dataValues, size });
  res.cookie('cart', JSON.stringify(cart));

  res.json({ success: true, cart });
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
