const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const adminController = require('../controllers/adminController');
const verifyAdminToken = require('../middlewares/authMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// Роуты
router.get('/', verifyAdminToken, adminController.getAdminPanel);
router.post('/products/add', verifyAdminToken, upload.single('image'), adminController.addProduct);
router.post('/products/delete/:id', verifyAdminToken, adminController.deleteProduct);

module.exports = router;
