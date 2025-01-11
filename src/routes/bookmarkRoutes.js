const express = require('express');  
const router = express.Router();  
const { authenticate, isStudent } = require('../middleware/middleware');  
const bookmarkController = require('../controllers/bookmarkController');  
 
//Bookmark Endpoint
router.post('/bookmarks', authenticate, bookmarkController.addBookmark);  
router.get('/bookmarks', authenticate, bookmarkController.showBookmarks);  
router.delete('/bookmarks/:id', authenticate, bookmarkController.deleteBookmark);  
  
module.exports = router;  
