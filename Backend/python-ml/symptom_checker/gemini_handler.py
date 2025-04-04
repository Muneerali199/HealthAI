import os
import json
import logging
from typing import List, Dict, Optional
import google.generativeai as genai
from dotenv import load_dotenv
import pandas as pd
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class GeminiSymptomAnalyzer:
    def __init__(self):
        load_dotenv()
        self.api_key = os.getenv('GEMINI_API_KEY')
        if not self.api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel('gemini-pro')
        self.safety_settings = [
            {
                "category": "HARM_CATEGORY_MEDICAL",
                "threshold": "BLOCK_MEDIUM_AND_ABOVE"
            }
        ]
        
    def generate_prompt(self, symptoms: List[Dict]) -> str:
        """Generate structured prompt for symptom analysis"""
        symptom_details = "\n".join(
            f"- {s['name']} (Severity: {s.get('severity', 'unknown')}/10, "
            f"Duration: {s.get('duration', 'unknown')}, "
            f"Notes: {s.get('notes', 'none')})"
            for s in symptoms
        )
        
        return f"""
        Analyze these symptoms and provide:
        1. Possible conditions (list, most likely first with brief 1-sentence explanation)
        2. Recommended actions (prioritized list)
        3. Urgency level (low, medium, high)
        4. Confidence score (0-100%)
        
        Format your response as valid JSON with these keys:
        - "possible_conditions" (list of objects with "condition" and "explanation")
        - "recommendations" (list)
        - "urgency"
        - "confidence"
        
        Symptoms:
        {symptom_details}
        
        Current date: {datetime.now().strftime('%Y-%m-%d')}
        """

    def analyze_symptoms(self, symptoms: List[Dict]) -> Dict:
        """Analyze symptoms with error handling and validation"""
        if not symptoms:
            raise ValueError("No symptoms provided for analysis")
        
        prompt = self.generate_prompt(symptoms)
        
        try:
            response = self.model.generate_content(
                prompt,
                safety_settings=self.safety_settings
            )
            
            # Extract the text response
            response_text = response.text
            
            # Clean the response (Gemini sometimes adds markdown)
            if '```json' in response_text:
                response_text = response_text.split('```json')[1].split('```')[0]
            
            analysis = json.loads(response_text)
            
            # Validate response structure
            required_keys = {'possible_conditions', 'recommendations', 'urgency', 'confidence'}
            if not all(key in analysis for key in required_keys):
                raise ValueError("Invalid analysis format from Gemini API")
            
            return analysis
            
        except Exception as e:
            logger.error(f"Error analyzing symptoms: {str(e)}")
            return {
                "possible_conditions": [],
                "recommendations": [
                    "Unable to complete analysis. Please consult a healthcare professional.",
                    "Try again later or provide more symptom details."
                ],
                "urgency": "high",
                "confidence": 0
            }