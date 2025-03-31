import React, { useState } from 'react';
import { Bell, Clock, Plus, Calendar, AlertCircle } from 'lucide-react';

interface Medication {
  name: string;
  time: string;
  dosage: string;
  frequency: string;
}

export default function MedicationReminderPage() {
  const [medications, setMedications] = useState<Medication[]>([
    { name: "Aspirin", time: "08:00", dosage: "100mg", frequency: "Daily" },
    { name: "Vitamin D", time: "09:00", dosage: "1000IU", frequency: "Daily" },
  ]);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700">
          <div className="flex items-center gap-4 mb-8">
            <Bell className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">Medication Reminder</h1>
              <p className="text-gray-400">Never miss your medications again</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Today's Schedule
              </h2>
              {medications.map((med, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-700/50 rounded-lg border border-gray-600"
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-white">{med.name}</h3>
                    <span className="text-blue-400 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {med.time}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm">
                    <p>Dosage: {med.dosage}</p>
                    <p>Frequency: {med.frequency}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="p-6 bg-blue-500/20 rounded-lg border border-blue-400/30">
                <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Upcoming Reminder
                </h3>
                <p className="text-gray-300">
                  Next medication: Aspirin at 08:00 AM
                </p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Mark as Taken
                </button>
              </div>

              <button className="w-full bg-gray-700 text-white p-4 rounded-lg hover:bg-gray-600 transition flex items-center justify-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Medication
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}