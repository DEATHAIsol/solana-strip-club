'use client';

import { type Streamer } from '@/data/streamers';
import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';

interface StreamPageProps {
  streamer: Streamer;
}

interface TipLevel {
  level: number;
  tokens: string;
  time: string;
}

export default function StreamPage({ streamer }: StreamPageProps) {
  const { connected } = useWallet();
  const [messages, setMessages] = useState<Array<{text: string; sender: string; isNotice?: boolean}>>([
    { text: "Welcome to the stream! 💖", sender: "System" },
    { text: "Remember to connect your wallet to chat and tip! 💝", sender: "System" },
  ]);

  const tipLevels: TipLevel[] = [
    { level: 4, tokens: "100-199", time: "5s" },
    { level: 5, tokens: "200-499", time: "15s" },
    { level: 6, tokens: "500-999", time: "25s" },
    { level: 7, tokens: "1000-4999", time: "50s" },
  ];

  const quickTips = [
    { name: "Doggy", tokens: 140 },
    { name: "Suck finger", tokens: 150 },
    { name: "Spin the wheel", tokens: 160 },
    { name: "Tease Dance", tokens: 200 },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="flex">
        {/* Main Content */}
        <div className="flex-grow-[3] p-4">
          <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden border border-pink-500/20 shadow-lg shadow-pink-500/5 mb-4">
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500/5 to-gray-900">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-pink-400 mb-2">{streamer.displayName}'s Stream</h2>
                {streamer.isLive ? (
                  <div className="flex items-center gap-2 text-pink-300">
                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></span>
                    Live Now with {streamer.viewers} viewers
                  </div>
                ) : (
                  <p className="text-gray-400">Stream Starting Soon...</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/95 p-4 rounded-lg border border-pink-500/20">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={streamer.avatar}
                alt={streamer.displayName}
                className="w-16 h-16 rounded-full object-cover border-2 border-pink-500"
              />
              <div>
                <h1 className="text-2xl font-bold text-pink-400">{streamer.displayName}</h1>
                <p className="text-pink-300/60">@{streamer.username}</p>
              </div>
              <div className="ml-auto flex gap-4">
                <div className="text-center">
                  <p className="text-pink-300/80">Total Tips</p>
                  <p className="text-xl font-bold text-pink-500">◎ {streamer.totalDonations.toFixed(2)}</p>
                </div>
                <div className="text-center">
                  <p className="text-pink-300/80">Top Tip</p>
                  <p className="text-xl font-bold text-pink-500">◎ {streamer.topDonation.toFixed(2)}</p>
                </div>
              </div>
            </div>
            <p className="text-gray-300">{streamer.bio}</p>
          </div>
        </div>

        {/* Chat and Tips Sidebar */}
        <div className="w-[400px] h-screen flex flex-col bg-gray-900/95 border-l border-pink-500/20">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`p-2 rounded ${msg.isNotice ? 'bg-pink-500/10' : 'bg-gray-800/50'}`}>
                <span className="text-sm text-pink-300/80">{msg.sender}:</span>
                <span className="text-white ml-2">{msg.text}</span>
              </div>
            ))}
          </div>

          {/* Quick Tips Section */}
          <div className="p-4 border-t border-pink-500/20">
            <h3 className="text-pink-400 font-semibold mb-2">Quick Tips 💝</h3>
            <div className="grid grid-cols-2 gap-2">
              {quickTips.map((tip) => (
                <button
                  key={tip.name}
                  disabled={!connected}
                  className={`p-2 rounded-lg text-sm ${
                    connected
                      ? 'bg-pink-500 hover:bg-pink-600 text-white'
                      : 'bg-gray-800 text-gray-400'
                  }`}
                >
                  {tip.name}: ◎{tip.tokens}
                </button>
              ))}
            </div>
          </div>

          {/* Tip Levels */}
          <div className="p-4 border-t border-pink-500/20">
            <h3 className="text-pink-400 font-semibold mb-2">Tip Levels 💖</h3>
            <div className="space-y-2">
              {tipLevels.map((level) => (
                <div key={level.level} className="flex justify-between items-center bg-gray-800/50 p-2 rounded">
                  <span className="text-pink-300">Level {level.level}</span>
                  <span className="text-white">◎{level.tokens}</span>
                  <span className="text-gray-400">{level.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          {connected ? (
            <div className="p-4 border-t border-pink-500/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500/50 border border-pink-500/20"
                />
                <button className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors">
                  Send
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 border-t border-pink-500/20 text-center">
              <p className="text-gray-400 mb-2">Connect wallet to chat and tip</p>
              <button className="bg-pink-500/20 text-pink-300 px-6 py-2 rounded-full hover:bg-pink-500/30 transition-colors">
                Connect Wallet 💝
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 