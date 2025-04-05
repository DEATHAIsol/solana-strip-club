'use client';

import { streamers } from '@/data/streamers';
import Link from 'next/link';

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-500">Explore Performers</h1>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {streamers.map((streamer) => (
          <div
            key={streamer.displayName}
            className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300"
          >
            <div className="relative">
              <img
                src={streamer.avatar}
                alt={streamer.displayName}
                className="w-full h-64 object-cover"
              />
              {streamer.isLive && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  LIVE
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-pink-400">{streamer.displayName}</h2>
                  <p className="text-gray-400">@{streamer.username}</p>
                </div>
                {streamer.isLive && (
                  <div className="text-gray-400 text-sm">
                    {streamer.viewers.toLocaleString()} viewers
                  </div>
                )}
              </div>
              
              <p className="text-gray-300 mb-6 line-clamp-2">{streamer.bio}</p>
              
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-400">Total Donations</p>
                  <p className="text-lg font-semibold text-pink-400">
                    ◎ {streamer.totalDonations.toFixed(2)}
                  </p>
                </div>
                
                <Link
                  href={`/stream/${streamer.username.toLowerCase()}`}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition-colors duration-200"
                >
                  {streamer.isLive ? 'Join Stream 💕' : 'View Profile 💝'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 