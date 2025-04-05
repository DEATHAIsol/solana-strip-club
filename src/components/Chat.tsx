'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { database } from '@/lib/firebase';
import { ref, push, onValue, off } from 'firebase/database';

interface ChatProps {
  streamerName: string;
}

interface Message {
  text: string;
  sender: string;
  timestamp: number;
}

export default function Chat({ streamerName }: ChatProps) {
  const { connected, publicKey } = useWallet();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const chatRef = database ? ref(database, `chats/${streamerName}`) : null;

  useEffect(() => {
    if (!chatRef) return;

    // Listen for new messages
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data) as Message[];
        setMessages(messageList.sort((a, b) => a.timestamp - b.timestamp));
      }
    });

    return () => {
      if (chatRef) off(chatRef);
    };
  }, [streamerName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !connected || !publicKey || !chatRef) return;
    
    const username = publicKey.toString().slice(0, 5);
    const message: Message = {
      text: newMessage,
      sender: username,
      timestamp: Date.now()
    };

    try {
      await push(chatRef, message);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900/95 rounded-lg border border-pink-500/20">
      <div className="p-4 border-b border-pink-500/20 bg-gray-900/90">
        <h2 className="text-xl font-semibold text-pink-400">Chat with {streamerName} 💕</h2>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900/95 to-gray-900/90">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400">
            <p>Be the first to chat! 💖</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-sm text-pink-300/80">{msg.sender}</span>
              <span className="text-white bg-gray-800/50 rounded-lg p-2 mt-1">{msg.text}</span>
            </div>
          ))
        )}
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
          <WalletMultiButton className="!bg-pink-500 !text-white hover:!bg-pink-600 active:!bg-pink-700 !py-2 !text-base !rounded-lg" />
        </div>
      )}
    </div>
  );
} 