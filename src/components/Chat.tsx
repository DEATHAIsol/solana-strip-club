'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';

interface ChatProps {
  streamerName: string;
}

export default function Chat({ streamerName }: ChatProps) {
  const { connected } = useWallet();
  const [messages, setMessages] = useState<Array<{text: string; sender: string}>>([
    { text: "Welcome to the stream! 💖", sender: "System" },
    { text: "Remember to connect your wallet to chat! 💝", sender: "System" }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !connected) return;
    
    setMessages([...messages, { text: newMessage, sender: 'You' }]);
    setNewMessage('');
  };

  return (
    <div className="h-full flex flex-col bg-gray-900/95 rounded-lg border border-pink-500/20">
      <div className="p-4 border-b border-pink-500/20 bg-gray-900/90">
        <h2 className="text-xl font-semibold text-pink-400">Chat with {streamerName} 💕</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/95 to-gray-900/90">
        {messages.map((msg, i) => (
          <div key={i} className="flex flex-col">
            <span className="text-sm text-pink-300/80">{msg.sender}</span>
            <span className="text-white bg-gray-800/50 rounded-lg p-2 mt-1">{msg.text}</span>
          </div>
        ))}
      </div>

      {connected ? (
        <form onSubmit={handleSubmit} className="p-4 border-t border-pink-500/20 bg-gray-900/90">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/50 border border-pink-500/20"
            />
            <button
              type="submit"
              className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/20"
            >
              Send
            </button>
          </div>
        </form>
      ) : (
        <div className="p-6 border-t border-pink-500/20 text-center bg-gray-900/90">
          <p className="text-gray-400 mb-3">Connect your wallet to join the chat</p>
          <button className="bg-pink-500/20 text-pink-300 px-6 py-2 rounded-full hover:bg-pink-500/30 transition-colors">
            Connect Wallet 💝
          </button>
        </div>
      )}
    </div>
  );
} 