import React from 'react';
import { Link } from 'react-router-dom';
import Scene3D from '../components/Scene3D';
import SymptomTracker from '../components/SymptomTracker';
import HealthChatbot from '../components/HealthChatbot';
import MedicationReminder from '../components/MedicationReminder';

export default function HomePage() {
  return (
    <>
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Your Health, Powered by AI
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience the future of healthcare with personalized AI assistance, real-time symptom tracking, and instant access to healthcare professionals.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/symptom-tracker"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
            >
              Get Started
            </Link>
            <Link
              to="/doctors"
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
            >
              Meet Our Doctors
            </Link>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/symptom-tracker" className="transform hover:scale-105 transition">
            <SymptomTracker />
          </Link>
          <Link to="/health-chatbot" className="transform hover:scale-105 transition">
            <HealthChatbot />
          </Link>
          <Link to="/medication-reminder" className="transform hover:scale-105 transition">
            <MedicationReminder />
          </Link>
        </div>
      </main>
    </>
  );
}