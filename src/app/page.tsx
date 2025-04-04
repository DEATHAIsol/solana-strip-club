'use client';

import Link from 'next/link';
import Image from 'next/image';
import { streamers } from '@/data/streamers';
import WalletConnectButton from '@/components/WalletConnectButton';

export default function Home() {
  // Get the first 3 streamers
  const featuredStreamers = streamers.slice(0, 3);

  const handleJoinStream = (youtubeUrl: string) => {
    window.open(youtubeUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-16 relative">
        <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-4xl animate-bounce">💝</span>
        <h1 className="text-[#FF1493] text-5xl font-bold mb-4 animate-pulse">
          Welcome to Solana Strip Club
        </h1>
        <p className="text-white text-xl mb-2">
          The first virtual strip club on Solana 💖
        </p>
        <p className="text-[#FF1493] hover:scale-105 transition-transform cursor-pointer">
          Powered by Solana Blockchain 💫
        </p>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          <span className="animate-bounce delay-100">💗</span>
          <span className="animate-bounce delay-200">💓</span>
          <span className="animate-bounce delay-300">💝</span>
        </div>
      </div>

      <div className="relative mb-8 group">
        <input
          type="text"
          placeholder="Search performers... 💕"
          className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg pl-10 border-2 border-[#FF1493]/30 focus:border-[#FF1493] outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(255,20,147,0.3)] hover:border-[#FF1493]/50"
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 group-hover:rotate-12 transition-transform duration-300">🔍</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredStreamers.map((streamer) => (
          <div 
            key={streamer.displayName} 
            className="bg-gray-900 rounded-lg overflow-hidden border-2 border-[#FF1493]/20 hover:border-[#FF1493]/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,20,147,0.2)] hover:-translate-y-1 group"
          >
            <div className="relative">
              <div className="absolute top-4 left-4 z-10">
                <h3 className="text-[#FF1493] text-xl font-bold mb-1 flex items-center gap-2 group-hover:scale-105 transition-transform">
                  {streamer.displayName} <span className="text-sm group-hover:animate-spin">💝</span>
                </h3>
                {streamer.isLive && (
                  <span className="bg-[#FF1493] text-white px-2 py-1 rounded text-sm group-hover:animate-pulse">
                    +LIVE
                  </span>
                )}
              </div>
              <div className="absolute bottom-4 right-4 z-10">
                <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded group-hover:bg-black/70 transition-colors">
                  {streamer.viewers.toLocaleString()} viewers 💖
                </span>
              </div>
              <div className="relative h-[300px] overflow-hidden">
                <Image
                  src={streamer.avatar}
                  alt={streamer.displayName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            <div className="p-4">
              <p className="text-white mb-4 group-hover:text-pink-200 transition-colors">{streamer.bio}</p>
              <button 
                onClick={() => handleJoinStream(streamer.youtubeUrl)}
                className="w-full bg-[#FF1493] text-white font-bold py-3 rounded-lg transition-all duration-300
                  hover:bg-[#FF1493]/80 hover:shadow-[0_0_20px_rgba(255,20,147,0.4)]
                  transform hover:scale-[1.02] active:scale-[0.98]
                  relative overflow-hidden group/button
                  before:content-[''] before:absolute before:w-12 before:h-full before:top-0 before:-left-10
                  before:bg-white/20 before:transform before:-skew-x-30 before:transition-transform
                  hover:before:translate-x-[500px] before:duration-1000"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Join Stream <span className="group-hover/button:animate-bounce">💕</span>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
