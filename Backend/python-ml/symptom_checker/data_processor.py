import pandas as pd
import sqlite3
from pathlib import Path
from typing import List, Dict
import logging

logger = logging.getLogger(__name__)

class SymptomDataProcessor:
    def __init__(self, data_dir: str = "data"):
        self.data_dir = Path(data_dir)
        self.data_dir.mkdir(exist_ok=True)
        self.csv_path = self.data_dir / "symptoms.csv"
        self.db_path = self.data_dir / "conditions.db"
        
        # Initialize data storage
        self._init_csv()
        self._init_db()
    
    def _init_csv(self):
        """Initialize CSV file with headers if it doesn't exist"""
        if not self.csv_path.exists():
            pd.DataFrame(columns=[
                'timestamp',
                'symptoms',
                'possible_conditions',
                'primary_condition',
                'recommendations',
                'urgency',
                'confidence'
            ]).to_csv(self.csv_path, index=False)
    
    def _init_db(self):
        """Initialize SQLite database for more complex queries"""
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS symptom_analysis (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT NOT NULL,
                    symptoms TEXT NOT NULL,
                    possible_conditions TEXT NOT NULL,
                    primary_condition TEXT,
                    recommendations TEXT NOT NULL,
                    urgency TEXT NOT NULL,
                    confidence REAL NOT NULL,
                    user_notes TEXT
                )
            """)
            conn.commit()
    
    def record_analysis(self, symptoms: List[Dict], analysis: Dict) -> None:
        """Record symptom analysis to both CSV and database"""
        timestamp = pd.Timestamp.now().isoformat()
        primary_condition = analysis['possible_conditions'][0]['condition'] if analysis['possible_conditions'] else None
        
        # CSV recording
        new_row = {
            'timestamp': timestamp,
            'symptoms': json.dumps(symptoms),
            'possible_conditions': json.dumps(analysis['possible_conditions']),
            'primary_condition': primary_condition,
            'recommendations': json.dumps(analysis['recommendations']),
            'urgency': analysis['urgency'],
            'confidence': analysis['confidence']
        }
        
        pd.DataFrame([new_row]).to_csv(
            self.csv_path,
            mode='a',
            header=False,
            index=False
        )
        
        # Database recording
        with sqlite3.connect(self.db_path) as conn:
            cursor = conn.cursor()
            cursor.execute("""
                INSERT INTO symptom_analysis (
                    timestamp, symptoms, possible_conditions,
                    primary_condition, recommendations,
                    urgency, confidence
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                timestamp,
                json.dumps(symptoms),
                json.dumps(analysis['possible_conditions']),
                primary_condition,
                json.dumps(analysis['recommendations']),
                analysis['urgency'],
                analysis['confidence']
            ))
            conn.commit()
    
    def get_historical_data(self, limit: int = 100) -> List[Dict]:
        """Retrieve historical analysis data"""
        try:
            with sqlite3.connect(self.db_path) as conn:
                conn.row_factory = sqlite3.Row
                cursor = conn.cursor()
                cursor.execute("""
                    SELECT * FROM symptom_analysis
                    ORDER BY timestamp DESC
                    LIMIT ?
                """, (limit,))
                return [dict(row) for row in cursor.fetchall()]
        except Exception as e:
            logger.error(f"Error fetching historical data: {e}")
            return []