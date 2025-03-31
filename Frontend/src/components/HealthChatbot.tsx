import { MessageSquare } from 'lucide-react';

export default function HealthChatbot() {
  return (
    <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <MessageSquare className="w-6 h-6 text-blue-400" />
        <h2 className="text-xl font-bold text-white">AI Health Assistant</h2>
      </div>
      <div className="h-48 bg-gray-700/50 rounded-lg p-4 mb-4">
        <p className="text-gray-400">Chat messages will appear here...</p>
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask about your health..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Send
        </button>
      </div>
    </div>
  );
}