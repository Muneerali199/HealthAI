const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const symptomsController = require('../controllers/symptoms');

router.post('/analyze', auth, symptomsController.analyzeSymptoms);
router.get('/history', auth, symptomsController.getSymptomHistory);

module.exports = router;