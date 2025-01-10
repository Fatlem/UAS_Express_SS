const express = require('express');  
const router = express.Router();  
const { authenticate, isStudent } = require('../middleware/middleware');  
const bookmarkController = require('../controllers/bookmarkController');  
  
// Route untuk menambahkan bookmark  
router.post('/bookmarks', authenticate, isStudent, bookmarkController.addBookmark);  
  
// Route untuk menampilkan semua bookmark  
router.get('/bookmarks', authenticate, isStudent, bookmarkController.showBookmarks);  
  
// Route untuk menghapus bookmark  
router.delete('/bookmarks/:id', authenticate, isStudent, bookmarkController.deleteBookmark);  
  
module.exports = router;  
