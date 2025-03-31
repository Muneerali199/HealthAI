import React, { useState } from 'react';
import { MessageSquare, Send, Bot } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export default function HealthChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Hello! I'm your AI health assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim()) {
      const userMessage = {
        text: input.trim(),
        isBot: false,
        timestamp: new Date(),
      };
      setMessages([...messages, userMessage]);
      setInput('');

      // Simulate AI response
      setTimeout(() => {
        const botMessage = {
          text: "I understand your concern. Based on what you've described, I recommend...",
          isBot: true,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 border border-gray-700 h-[600px] flex flex-col">
          <div className="flex items-center gap-4 mb-6">
            <Bot className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold text-white">AI Health Assistant</h1>
              <p className="text-gray-400">Get instant health advice and recommendations</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 mb-6">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-700/50 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  <p>{message.text}</p>
                  <span className="text-xs opacity-70 mt-2 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your health question..."
              className="flex-1 px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}