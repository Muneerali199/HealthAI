import { Brain, Activity } from 'lucide-react';

export default function SymptomTracker() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold text-white">AI Symptom Tracker</h2>
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-300">
          <Activity className="w-5 h-5 text-blue-400" />
          <span>Track your symptoms in real-time</span>
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          Start Tracking
        </button>
      </div>
    </div>
  );
}