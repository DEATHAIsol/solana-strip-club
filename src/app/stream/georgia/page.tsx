'use client';

import { streamers } from '@/data/streamers';
import StreamPage from '@/components/StreamPage';

export default function GeorgiaStreamPage() {
  const georgia = streamers.find(s => s.username === 'georgia');
  
  if (!georgia) {
    return <div>Stream not found</div>;
  }

  return <StreamPage streamer={georgia} />;
} 