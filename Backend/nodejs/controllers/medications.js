const Medication = require('../models/Medication');
const User = require('../models/User');

exports.addMedication = async(req, res) => {
    try {
        const { name, dosage, frequency, startDate, endDate, reminders, notes } = req.body;

        const medication = new Medication({
            user: req.user.id,
            name,
            dosage,
            frequency,
            startDate,
            endDate,
            reminders,
            notes
        });

        await medication.save();
        res.status(201).json(medication);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getMedications = async(req, res) => {
    try {
        const medications = await Medication.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(medications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateMedication = async(req, res) => {
    try {
        const { name, dosage, frequency, startDate, endDate, reminders, notes } = req.body;

        let medication = await Medication.findById(req.params.id);
        if (!medication) {
            return res.status(404).json({ message: 'Medication not found' });
        }

        if (medication.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        medication = await Medication.findByIdAndUpdate(
            req.params.id, { name, dosage, frequency, startDate, endDate, reminders, notes }, { new: true }
        );

        res.json(medication);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteMedication = async(req, res) => {
    try {
        const medication = await Medication.findById(req.params.id);
        if (!medication) {
            return res.status(404).json({ message: 'Medication not found' });
        }

        if (medication.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await medication.remove();
        res.json({ message: 'Medication removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};