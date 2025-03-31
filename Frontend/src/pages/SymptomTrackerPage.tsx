import React, { useState } from 'react';
import { Brain, Activity, Plus, Search } from 'lucide-react';

export default function SymptomTrackerPage() {
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [newSymptom, setNewSymptom] = useState('');

  const addSymptom = () => {
    if (newSymptom.trim()) {
      setSymptoms([...symptoms, newSymptom.trim()]);
      setNewSymptom('');
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700">
          <div className="flex items-center gap-4 mb-8">
            <Brain className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">AI Symptom Tracker</h1>
              <p className="text-gray-400">Track and analyze your symptoms in real-time</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={newSymptom}
                onChange={(e) => setNewSymptom(e.target.value)}
                placeholder="Enter a symptom..."
                className="flex-1 px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addSymptom}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Symptom
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {symptoms.map((symptom, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-blue-400" />
                    <span className="text-gray-200">{symptom}</span>
                  </div>
                  <span className="text-sm text-gray-400">Just now</span>
                </div>
              ))}
            </div>

            {symptoms.length > 0 && (
              <div className="mt-8 p-6 bg-blue-500/20 rounded-lg border border-blue-400/30">
                <h3 className="text-xl font-semibold mb-4 text-blue-400">AI Analysis</h3>
                <p className="text-gray-300">
                  Based on your symptoms, our AI suggests scheduling a consultation with a healthcare provider.
                  Would you like to book an appointment?
                </p>
                <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition">
                  Book Consultation
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}