const express = require("express");
const { authenticate } = require("../middleware/middleware");
const { addCompletionTracking, showCompletionTracking, deleteCompletionTracking } = require("../controllers/contentCompletion");
const router = express.Router();

router.post('/completion', authenticate, addCompletionTracking);
router.get('/completion/:courseId', authenticate, showCompletionTracking);
router.delete('/completion/:completionId', authenticate, deleteCompletionTracking);

module.exports = router;
