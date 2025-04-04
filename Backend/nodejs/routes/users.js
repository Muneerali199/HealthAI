const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get all doctors
router.get('/doctors', auth, async(req, res) => {
    try {
        const doctors = await User.find({ role: 'doctor' }).select('-password');
        res.json(doctors);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update user profile
router.put('/profile', auth, async(req, res) => {
    try {
        const { age, gender, bloodType, allergies, conditions } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id, { profile: { age, gender, bloodType, allergies, conditions } }, { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;