'use client';

import { type Streamer } from '@/data/streamers';
import Link from 'next/link';

interface StreamerCardProps {
  streamer: Streamer;
}

export default function StreamerCard({ streamer }: StreamerCardProps) {
  const youtubeUrl = "https://www.youtube.com/watch?v=2lBKh_5T_A8&ab_channel=Bhavss14";
  
  return (
    <div className="bg-gray-900/90 rounded-lg overflow-hidden border border-pink-500/20 hover:border-pink-500/40 transition-all hover:shadow-lg hover:shadow-pink-500/5">
      <div className="aspect-video relative">
        <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
          <img
            src={streamer.avatar}
            alt={streamer.displayName}
            className="w-full h-full object-cover"
          />
          {streamer.isLive && (
            <span className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-lg shadow-pink-500/20">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              LIVE
            </span>
          )}
        </a>
      </div>
      
      <div className="p-4">
        <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="block mb-4">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={streamer.avatar}
              alt={streamer.displayName}
              className="w-10 h-10 rounded-full object-cover border border-pink-500"
            />
            <div>
              <h3 className="font-semibold text-pink-400">{streamer.displayName}</h3>
              <p className="text-sm text-pink-300/60">@{streamer.username}</p>
            </div>
          </div>
          
          <p className="text-gray-400 text-sm line-clamp-2">{streamer.bio}</p>
        </a>
        
        <a 
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-pink-500 text-white text-center py-2 rounded-full hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/20"
        >
          Join Stream 💝
        </a>
      </div>
    </div>
  );
} 