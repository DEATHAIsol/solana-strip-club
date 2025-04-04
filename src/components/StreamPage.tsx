'use client';

import { type Streamer } from '@/data/streamers';

interface StreamPageProps {
  streamer: Streamer;
}

export default function StreamPage({ streamer }: StreamPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="aspect-video bg-gray-900 rounded-lg mb-8">
          <iframe
            src={streamer.youtubeUrl}
            className="w-full h-full rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={streamer.avatar}
            alt={streamer.displayName}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-pink-500">{streamer.displayName}</h1>
            <p className="text-gray-400">@{streamer.username}</p>
          </div>
          {streamer.isLive && (
            <span className="ml-auto bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-pink-400 mb-4">About</h2>
            <p className="text-gray-300">{streamer.bio}</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-pink-400 mb-4">Schedule</h2>
            <div className="space-y-2">
              {Object.entries(streamer.schedule).map(([day, time]) => (
                time && (
                  <div key={day} className="flex justify-between">
                    <span className="text-gray-400 capitalize">{day}</span>
                    <span className="text-white">{time}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-pink-400 mb-4">Support</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 mb-1">Total Donations</p>
              <p className="text-2xl font-bold text-pink-500">◎ {streamer.totalDonations.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1">Top Donation</p>
              <p className="text-2xl font-bold text-pink-500">◎ {streamer.topDonation.toFixed(2)}</p>
            </div>
            <button className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition-colors">
              Donate ◎
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 