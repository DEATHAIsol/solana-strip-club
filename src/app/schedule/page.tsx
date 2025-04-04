'use client';

import { useEffect, useState } from 'react';
import { streamers } from '@/data/streamers';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export default function SchedulePage() {
  const [selectedDay, setSelectedDay] = useState<string>(daysOfWeek[0]);

  const getStreamersForDay = (day: string) => {
    const lowercaseDay = day.toLowerCase() as DayOfWeek;
    return streamers.filter(streamer => 
      streamer.schedule && streamer.schedule[lowercaseDay]
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-pink-500">Weekly Schedule</h1>
      
      {/* Day selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {daysOfWeek.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-full ${
              selectedDay === day
                ? 'bg-pink-500 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-pink-700'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule grid */}
      <div className="max-w-4xl mx-auto">
        <div className="grid gap-4">
          {getStreamersForDay(selectedDay).map((streamer) => (
            <div
              key={streamer.displayName}
              className="bg-gray-900 rounded-lg p-6 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img
                  src={streamer.avatar}
                  alt={streamer.displayName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold text-pink-400">{streamer.displayName}</h3>
                  <p className="text-gray-400">
                    {streamer.schedule[selectedDay.toLowerCase() as DayOfWeek]}
                  </p>
                </div>
              </div>
              <button 
                className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full"
                onClick={() => window.open(streamer.youtubeUrl || 'https://www.youtube.com/watch?v=ysR-4J3Tz3M', '_blank')}
              >
                Join Stream
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 