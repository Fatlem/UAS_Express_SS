const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/middleware');
const courseController = require('../controllers/courseController');

//Course/Comment Endpoint
router.get('/courses', courseController.listCourses);
router.get('/courses/:courseId', courseController.detailCourse);
router.get('/mycourses', authenticate, courseController.myCourses);                                                         
router.post('/courses', authenticate, courseController.createCourse);
router.put('/courses/:courseId', authenticate, courseController.updateCourse);
router.post('/courses/:courseId/enroll', authenticate, courseController.enrollCourse);
router.get('/contents/:contentId/comments', authenticate, courseController.getContentComment);
router.post('/contents/:contentId/comments', authenticate, courseController.createContentComment);

module.exports = router;
