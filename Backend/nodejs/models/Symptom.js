const mongoose = require('mongoose');

const SymptomSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    symptoms: [{
        name: String,
        severity: {
            type: Number,
            min: 1,
            max: 10
        },
        duration: String,
        notes: String
    }],
    aiAnalysis: {
        possibleConditions: [String],
        recommendations: [String],
        confidence: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Symptom', SymptomSchema);