'use client';

import { useState } from 'react';
import { streamers } from '@/data/streamers';

// This would come from your database in a real app
const mockDonations = [
  { donor: '7xKX...9aB2', amount: 500, streamer: 'Amanda', timestamp: '2024-04-04' },
  { donor: '3mNP...2cF4', amount: 300, streamer: 'Caitlin', timestamp: '2024-04-04' },
  { donor: '9pQR...5vH8', amount: 250, streamer: 'Georgia', timestamp: '2024-04-03' },
  { donor: '2kLM...7jN4', amount: 200, streamer: 'Bella', timestamp: '2024-04-03' },
  { donor: '5tWX...1yP6', amount: 150, streamer: 'Jess', timestamp: '2024-04-02' },
];

export default function Leaderboard() {
  const [timeframe, setTimeframe] = useState('all');
  const [category, setCategory] = useState('donors');

  return (
    <div className="min-h-screen bg-background-dark pt-24">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-8">Leaderboard</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-background-card border border-background-border text-white px-4 py-2 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
            <option value="day">Today</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-background-card border border-background-border text-white px-4 py-2 rounded-lg focus:outline-none focus:border-primary"
          >
            <option value="donors">Top Donors</option>
            <option value="streamers">Top Streamers</option>
          </select>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-background-card rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-background-border">
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">
                  {category === 'donors' ? 'Donor' : 'Streamer'}
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockDonations.map((donation, index) => (
                <tr
                  key={index}
                  className="border-b border-background-border hover:bg-background-border/50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-background-border text-primary font-bold">
                      {index + 1}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">
                    {category === 'donors' ? donation.donor : donation.streamer}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-secondary font-bold">{donation.amount} SOL</span>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{donation.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 