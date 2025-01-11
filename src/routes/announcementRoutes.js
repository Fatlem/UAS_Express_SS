const express = require('express');
const { isTeacher } = require('../middleware/middleware');
const { createAnnouncement, showAnnouncements, editAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');
const router = express.Router();

// Annouchment
router.post('/course/:courseId/announcement', isTeacher, createAnnouncement);
router.get('/course/:courseId/announcements', showAnnouncements);
router.put('/announcement/:announcementId', isTeacher, editAnnouncement);
router.delete('/announcement/:announcementId', isTeacher, deleteAnnouncement);

module.exports = router;