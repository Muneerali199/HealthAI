import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Particles from './Background';
import { Stethoscope, ChevronDown, Brain, Users, MessageSquare, FileText, Bell } from 'lucide-react';
import HomePage from './pages/HomePage';
import SymptomTrackerPage from './pages/SymptomTrackerPage';
import HealthChatbotPage from './pages/HealthChatbotPage';
import MedicationReminderPage from './pages/MedicationReminderPage';
import DoctorsPage from './pages/DoctorsPage';

function App() {
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>
      
      <div className="relative z-10">
        <nav className="bg-gray-800/30 backdrop-blur-xl border-b border-gray-700/50 sticky top-0">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between h-20">
              <Link 
                to="/" 
                className="flex items-center gap-3 group"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                  <Stethoscope className="w-10 h-10 text-white relative transform group-hover:scale-110 transition duration-200" />
                </div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  HealthAI
                </h1>
              </Link>
              
              <div className="hidden md:flex items-center gap-8">
                <NavLink to="/about" text="About Us" />
                
                <div className="relative group">
                  <button 
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors py-2"
                  >
                    Services
                    <ChevronDown className="w-4 h-4 transform group-hover:rotate-180 transition-transform duration-200" />
                  </button>
                  
                  <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800/95 backdrop-blur-xl rounded-xl border border-gray-700/50 shadow-xl transform scale-95 opacity-0 invisible group-hover:scale-100 group-hover:opacity-100 group-hover:visible transition-all duration-200 py-3">
                    <div className="space-y-1">
                      <ServiceLink to="/symptom-tracker" icon={<Brain className="w-5 h-5" />} text="Symptom Tracker" desc="AI-powered health monitoring" />
                      <ServiceLink to="/doctors" icon={<Users className="w-5 h-5" />} text="Doctor Portal" desc="Connect with specialists" />
                      <ServiceLink to="/health-chatbot" icon={<MessageSquare className="w-5 h-5" />} text="Health GPT" desc="24/7 AI health assistant" />
                      <ServiceLink to="/medication-reminder" icon={<Bell className="w-5 h-5" />} text="Patient Portal" desc="Manage your health records" />
                    </div>
                  </div>
                </div>
                
                <NavLink to="/business" text="Business" />
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/symptom-tracker" element={<SymptomTrackerPage />} />
          <Route path="/health-chatbot" element={<HealthChatbotPage />} />
          <Route path="/medication-reminder" element={<MedicationReminderPage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
        </Routes>

        <footer className="bg-gray-800/50 backdrop-blur-lg border-t border-gray-700 py-12">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">About HealthAI</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Our Mission</li>
                  <li>Team</li>
                  <li>Careers</li>
                  <li>Press</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Services</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Teleconsultation</li>
                  <li>Health Monitoring</li>
                  <li>AI Diagnosis</li>
                  <li>Mental Health</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Health Blog</li>
                  <li>Research</li>
                  <li>Guidelines</li>
                  <li>FAQ</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Cookie Policy</li>
                  <li>HIPAA Compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

function NavLink({ to, text }: { to: string; text: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`relative group ${
        isActive ? 'text-blue-400' : 'text-gray-300 hover:text-white'
      }`}
    >
      <span className="relative z-10">{text}</span>
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${
        isActive ? 'scale-x-100' : ''
      }`}></span>
    </Link>
  );
}

function ServiceLink({ to, icon, text, desc }: { to: string; icon: React.ReactNode; text: string; desc: string }) {
  return (
    <Link
      to={to}
      className="flex items-start gap-3 px-4 py-2 hover:bg-gray-700/50 transition-colors"
    >
      <div className="text-blue-400 mt-1">{icon}</div>
      <div>
        <div className="font-medium text-white">{text}</div>
        <div className="text-sm text-gray-400">{desc}</div>
      </div>
    </Link>
  );
}

export default App;