const Symptom = require('../models/Symptom');
const axios = require('axios');
const config = require('../config/config');

exports.analyzeSymptoms = async(req, res) => {
    try {
        const { symptoms } = req.body;

        // Save symptoms to database
        const symptomRecord = new Symptom({
            user: req.user.id,
            symptoms
        });

        // Call Gemini API for analysis
        const prompt = `Analyze these symptoms: ${JSON.stringify(symptoms)}. 
      Provide possible conditions, recommendations, and confidence level (0-100). 
      Return as JSON with fields: possibleConditions, recommendations, confidence.`;

        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            }, {
                params: { key: config.geminiAPIKey },
                headers: { 'Content-Type': 'application/json' }
            }
        );

        const analysis = JSON.parse(response.data.candidates[0].content.parts[0].text);

        // Update symptom record with analysis
        symptomRecord.aiAnalysis = analysis;
        await symptomRecord.save();

        res.json({
            symptoms: symptomRecord.symptoms,
            analysis: symptomRecord.aiAnalysis
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getSymptomHistory = async(req, res) => {
    try {
        const symptoms = await Symptom.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(symptoms);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};