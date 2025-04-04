const Appointment = require('../models/Appointment');
const User = require('../models/User');

exports.bookAppointment = async(req, res) => {
    try {
        const { doctorId, date, time, reason } = req.body;

        // Check if doctor exists
        const doctor = await User.findById(doctorId);
        if (!doctor || doctor.role !== 'doctor') {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        // Check for existing appointment at same time
        const existingAppointment = await Appointment.findOne({
            doctor: doctorId,
            date,
            time,
            status: 'scheduled'
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'Time slot already booked' });
        }

        const appointment = new Appointment({
            patient: req.user.id,
            doctor: doctorId,
            date,
            time,
            reason,
            status: 'scheduled'
        });

        await appointment.save();
        res.status(201).json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAppointments = async(req, res) => {
    try {
        let appointments;

        if (req.user.role === 'doctor') {
            appointments = await Appointment.find({ doctor: req.user.id })
                .populate('patient', 'name email profile')
                .sort({ date: 1, time: 1 });
        } else {
            appointments = await Appointment.find({ patient: req.user.id })
                .populate('doctor', 'name email profile')
                .sort({ date: 1, time: 1 });
        }

        res.json(appointments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateAppointment = async(req, res) => {
    try {
        const { date, time, reason, status, notes } = req.body;

        let appointment = await Appointment.findById(req.params.id)
            .populate('doctor', 'name email')
            .populate('patient', 'name email');

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        // Check authorization
        if (appointment.patient._id.toString() !== req.user.id &&
            appointment.doctor._id.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Only allow status change by doctor
        if (status && req.user.role !== 'doctor') {
            return res.status(401).json({ message: 'Only doctors can update status' });
        }

        appointment = await Appointment.findByIdAndUpdate(
            req.params.id, { date, time, reason, status, notes }, { new: true }
        ).populate('doctor', 'name email').populate('patient', 'name email');

        res.json(appointment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.cancelAppointment = async(req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        if (appointment.patient.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        appointment.status = 'cancelled';
        await appointment.save();

        res.json({ message: 'Appointment cancelled' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};