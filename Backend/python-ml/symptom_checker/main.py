from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from gemini_handler import GeminiSymptomAnalyzer
from data_processor import SymptomDataProcessor
import logging
from typing import Dict, List

# Initialize Flask
app = Flask(__name__)
CORS(app)

# Initialize components
analyzer = GeminiSymptomAnalyzer()
data_processor = SymptomDataProcessor()

@app.route('/analyze', methods=['POST'])
def analyze_symptoms() -> Dict:
    """
    Endpoint for symptom analysis
    Expected JSON payload:
    {
        "symptoms": [
            {
                "name": "headache",
                "severity": 5,
                "duration": "2 days",
                "notes": "throbbing pain"
            }
        ],
        "user_context": {
            "age": 30,
            "gender": "male",
            "existing_conditions": ["hypertension"]
        }
    }
    """
    try:
        data = request.get_json()
        
        if not data or 'symptoms' not in data:
            return jsonify({"error": "Invalid request format"}), 400
        
        # Perform analysis
        analysis = analyzer.analyze_symptoms(data['symptoms'])
        
        # Record the analysis
        data_processor.record_analysis(data['symptoms'], analysis)
        
        # Add contextual suggestions if user data provided
        if 'user_context' in data:
            analysis['contextual_recommendations'] = self._add_contextual_suggestions(
                analysis, 
                data['user_context']
            )
        
        return jsonify(analysis)
    
    except Exception as e:
        logging.error(f"API error: {str(e)}")
        return jsonify({
            "error": "Internal server error",
            "details": str(e)
        }), 500

@app.route('/history', methods=['GET'])
def get_history() -> List[Dict]:
    """Retrieve historical symptom analyses"""
    try:
        limit = int(request.args.get('limit', 10))
        return jsonify(data_processor.get_historical_data(limit))
    except Exception as e:
        logging.error(f"History error: {str(e)}")
        return jsonify({"error": str(e)}), 500

def _add_contextual_suggestions(analysis: Dict, user_context: Dict) -> List[str]:
    """Enhance recommendations based on user context"""
    suggestions = []
    
    if user_context.get('age', 0) > 65:
        suggestions.append("Given your age, consider consulting a doctor for persistent symptoms.")
    
    if 'existing_conditions' in user_context:
        conditions = user_context['existing_conditions']
        if 'diabetes' in conditions and analysis['urgency'] != 'low':
            suggestions.append("As a diabetic patient, monitor your symptoms closely.")
    
    return suggestions

if __name__ == '__main__':
    load_dotenv()
    port = int(os.getenv('ML_PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)