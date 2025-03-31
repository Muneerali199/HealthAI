import { Bell, Clock } from 'lucide-react';

export default function MedicationReminder() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <Bell className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold text-white">Medication Reminder</h2>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
          <div className="flex items-center gap-2 text-gray-300">
            <Clock className="w-5 h-5 text-blue-400" />
            <span>Medication Name</span>
          </div>
          <span className="text-sm text-gray-400">8:00 AM</span>
        </div>
        <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
          Add Reminder
        </button>
      </div>
    </div>
  );
}