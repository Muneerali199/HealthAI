import React from 'react';
import { Users, Video, Calendar, Star, Clock } from 'lucide-react';

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    rating: 4.9,
    available: true,
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300",
    rating: 4.8,
    available: true,
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300",
    rating: 4.9,
    available: false,
  },
];

export default function DoctorsPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Connect with Top Healthcare Providers</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Schedule secure video consultations with licensed healthcare professionals
            specializing in various medical fields.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <div
              key={index}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
            >
              <div className="relative mb-4">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm ${
                    doctor.available
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}
                >
                  {doctor.available ? 'Available Now' : 'In 30 min'}
                </span>
              </div>

              <h2 className="text-xl font-bold mb-2">{doctor.name}</h2>
              <p className="text-gray-400 mb-4">{doctor.specialty}</p>

              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-white">{doctor.rating}</span>
                <span className="text-gray-400">(120+ reviews)</span>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2">
                  <Video className="w-5 h-5" />
                  Book Video Consultation
                </button>
                <button className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-600 transition flex items-center justify-center gap-2">
                  <Calendar className="w-5 h-5" />
                  View Schedule
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}