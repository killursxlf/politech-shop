require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');

const indexRoutes = require('./routes/index');
const productRoutes = require('./routes/products');
const cartRoutes = require('./routes/cart');
const loginRouter = require('./routes/login');
const adminRoutes = require('./routes/admin');
const searchRoutes = require('./routes/search');

const app = express();
const port = 3000;

if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

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

app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/login', loginRouter);
app.use('/admin', adminRoutes);
app.use('/search', searchRoutes);  

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
