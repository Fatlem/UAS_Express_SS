const express = require('express');    
const router = express.Router();    
const { authenticate } = require('../middleware/middleware');    
const feedbackController = require('../controllers/feedbackController');    
    
// Route untuk Feedback    
router.post('/courses/:courseId/feedback', authenticate, feedbackController.createFeedback);
router.get('/courses/:courseId/feedback', authenticate, feedbackController.getAllFeedback);   
router.put('/feedback/:feedbackId', authenticate, feedbackController.updateFeedback);    
router.delete('/feedback/:feedbackId', authenticate, feedbackController.deleteFeedback);      
    
module.exports = router;    
