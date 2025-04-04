const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const appointmentsController = require('../controllers/appointments');

router.post('/', auth, appointmentsController.bookAppointment);
router.get('/', auth, appointmentsController.getAppointments);
router.put('/:id', auth, appointmentsController.updateAppointment);
router.delete('/:id', auth, appointmentsController.cancelAppointment);

module.exports = router;