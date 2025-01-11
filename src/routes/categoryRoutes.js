const express = require('express');  
const router = express.Router();  
const { authenticate } = require('../middleware/middleware'); // Jika Anda menggunakan autentikasi  
const categoryController = require('../controllers/categoryController'); // Pastikan path ini sesuai  

// Categori
router.post('/categories', authenticate, categoryController.addCategory);  
router.get('/categories', authenticate, categoryController.showCategories);  
router.delete('/categories/:categoryId', authenticate, categoryController.deleteCategory);  
  
module.exports = router;  
