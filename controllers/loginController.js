const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const connection = require('../config/database');

exports.getLogin = (req, res) => {
  res.render('login', {
    title: 'Вхід в адмінку',
    error: null,
    success: null,
    username: ''
  });
};

exports.postLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [results] = await connection.execute('SELECT * FROM admins WHERE username = ?', [username]);

    if (results.length === 0) {
      return res.render('login', {
        title: 'Вхід в адмінку',
        error: 'Невірний логін або пароль',
        success: null,
        username
      });
    }

    const admin = results[0];
    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.render('login', {
        title: 'Вхід в адмінку',
        error: 'Невірний логін або пароль',
        success: null,
        username
      });
    }

    const tokenPayload = {
      id: admin.id,
      username: admin.username,
      email: admin.email,
      name: `${admin.first_name} ${admin.last_name}`,
      role: admin.role
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      maxAge: 2 * 60 * 60 * 1000 
    });

    return res.redirect('/admin');
  } catch (err) {
    console.error('Ошибка при логине:', err);
    return res.render('login', {
      title: 'Вхід в адмінку',
      error: 'Серверна помилка.',
      success: null,
      username
    });
  }
};