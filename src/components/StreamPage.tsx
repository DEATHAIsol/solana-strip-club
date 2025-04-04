'use client';

import { useState } from 'react';
import UserProfile from './UserProfile';
import DonateButton from './DonateButton';

interface StreamPageProps {
  streamer: {
    username: string;
    displayName: string;
    avatar: string;
    isLive: boolean;
    viewers: number;
    youtubeUrl: string;
    bio: string;
    solanaAddress: string;
    totalDonations: number;
    topDonation: number;
    socialLinks: {
      twitter?: string;
      instagram?: string;
      tiktok?: string;
    };
    schedule: {
      [key: string]: string;
    };
  };
}

export default function StreamPage({ streamer }: StreamPageProps) {
  const [isChatVisible, setIsChatVisible] = useState(true);
  const [message, setMessage] = useState('');

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(streamer.youtubeUrl);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;

  const handleSendMessage = () => {
    if (!message.trim()) return;
    // Add message to chat
    setMessage('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Stream Player */}
          <div className="relative aspect-video bg-background-card rounded-lg overflow-hidden">
            <iframe
              src={embedUrl}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Stream Info */}
          <div className="bg-background-card rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-white">{streamer.displayName}'s Stream</h1>
              <DonateButton
                recipientAddress={streamer.solanaAddress}
                streamerName={streamer.displayName}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-background-dark p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Total Donations</p>
                <p className="text-secondary text-2xl font-bold">{streamer.totalDonations} SOL</p>
              </div>
              <div className="bg-background-dark p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Top Donation</p>
                <p className="text-secondary text-2xl font-bold">{streamer.topDonation} SOL</p>
              </div>
              <div className="bg-background-dark p-4 rounded-lg">
                <p className="text-gray-400 text-sm">Current Viewers</p>
                <p className="text-primary text-2xl font-bold">{streamer.viewers}</p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-white font-bold mb-2">Schedule</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {Object.entries(streamer.schedule).map(([day, time]) => (
                  <div key={day} className="bg-background-dark p-2 rounded">
                    <p className="text-gray-400 text-sm capitalize">{day}</p>
                    <p className="text-white">{time}</p>
                  </div>
                ))}
              </div>
            </div>

            <UserProfile {...streamer} />
          </div>
        </div>

        {/* Chat Sidebar */}
        <div className={`lg:col-span-1 ${isChatVisible ? 'block' : 'hidden'}`}>
          <div className="bg-background-card rounded-lg h-[calc(100vh-8rem)] flex flex-col">
            <div className="p-4 border-b border-background-border flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Live Chat</h3>
              <button
                onClick={() => setIsChatVisible(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-center text-gray-400">
                Chat coming soon...
              </div>
            </div>
            <div className="p-4 border-t border-background-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Send a message..."
                  className="flex-1 bg-background-dark text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-primary text-black px-4 py-2 rounded-lg font-bold hover:bg-[#00dd00] transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 