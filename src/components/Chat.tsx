'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState, useEffect } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { database } from '@/lib/firebase';
import { ref, push, onValue, off, set, get } from 'firebase/database';
import toast from 'react-hot-toast';

interface ChatProps {
  streamerName: string;
}

interface Message {
  text: string;
  timestamp: number;
  username: string;
}

interface UserData {
  username: string;
  createdAt: number;
}

export default function Chat({ streamerName }: ChatProps) {
  const { connected, publicKey } = useWallet();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const chatRef = database ? ref(database, `chats/${streamerName}`) : null;

  // Chat messages listener
  useEffect(() => {
    if (!chatRef) return;

    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data) as Message[];
        setMessages(messageList.sort((a, b) => a.timestamp - b.timestamp));
      } else {
        setMessages([]);
      }
    }, (error) => {
      console.error('Database error:', error);
      toast.error('Error loading messages');
    });

    return () => {
      if (chatRef) off(chatRef);
    };
  }, [chatRef]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    
    if (!connected || !publicKey) {
      toast.error('Please connect your wallet to chat');
      return;
    }

    if (!newMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }
    
    if (!chatRef) {
      toast.error('Chat system is not available');
      return;
    }

    setIsSending(true);
    
    try {
      const message: Message = {
        text: newMessage.trim(),
        timestamp: Date.now(),
        username: publicKey.toString().slice(0, 4) + '...'
      };

      await push(chatRef, message);
      setNewMessage('');
      toast.success('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900/95 rounded-lg border border-pink-500/20">
      <div className="p-4 border-b border-pink-500/20 bg-gray-900/90">
        <h2 className="text-lg font-semibold text-pink-400">
          Chat with {streamerName} 💕 ({messages.length} messages)
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className="bg-black/40 p-2 rounded-lg">
            <span className="font-bold text-pink-400">{msg.username}:</span>
            <span className="ml-2">{msg.text}</span>
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
              className="flex-1 bg-black/40 p-2 rounded-lg"
            />
            <button
              type="submit"
              disabled={isSending}
              className="bg-pink-500 hover:bg-pink-600 active:bg-pink-700 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </form>
      ) : (
        <div className="p-6 border-t border-pink-500/20 text-center bg-gray-900/90">
          <p className="text-gray-400 mb-3 text-sm">Connect your wallet to join the chat</p>
          <WalletMultiButton className="!bg-pink-500 !text-white hover:!bg-pink-600 active:!bg-pink-700 !py-2 !text-sm !rounded-lg" />
        </div>
      )}
    </div>
  );
} 