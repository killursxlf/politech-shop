require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
  
const indexRoutes = require('./routes/index');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

sequelize.sync()
  .then(() => console.log('База данных синхронизирована'))
  .catch(err => console.log('Ошибка синхронизации базы данных:', err));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key', 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

const searchRoutes = require('./routes/search');
app.use('/', searchRoutes); 

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
