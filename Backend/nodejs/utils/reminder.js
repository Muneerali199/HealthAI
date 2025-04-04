const Medication = require('../models/Medication');
const nodemailer = require('nodemailer');
const config = require('../config/config');

// Set up email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Check for due medications and send reminders
exports.checkMedicationReminders = async() => {
    try {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });

        // Find all active medications with reminders enabled for current time and day
        const medications = await Medication.find({
            'reminders.enabled': true,
            'reminders.time': `${currentHour}:${currentMinute}`,
            'reminders.days': currentDay,
            startDate: { $lte: now },
            $or: [
                { endDate: { $exists: false } },
                { endDate: { $gte: now } }
            ]
        }).populate('user', 'email name');

        // Send reminders
        for (const med of medications) {
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: med.user.email,
                subject: 'Medication Reminder',
                text: `Hi ${med.user.name},\n\nIt's time to take your medication:\n\n${med.name} - ${med.dosage}\n\nThank you!`
            };

            await transporter.sendMail(mailOptions);
            console.log(`Reminder sent to ${med.user.email} for ${med.name}`);
        }
    } catch (err) {
        console.error('Error sending medication reminders:', err);
    }
};