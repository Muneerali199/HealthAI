const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const medicationsController = require('../controllers/medications');

router.post('/', auth, medicationsController.addMedication);
router.get('/', auth, medicationsController.getMedications);
router.put('/:id', auth, medicationsController.updateMedication);
router.delete('/:id', auth, medicationsController.deleteMedication);

module.exports = router;