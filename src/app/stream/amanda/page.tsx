'use client';

import { streamers } from '@/data/streamers';
import StreamPage from '@/components/StreamPage';

export default function AmandaStreamPage() {
  const amanda = streamers.find(s => s.username === 'amanda');
  
  if (!amanda) {
    return <div>Stream not found</div>;
  }

  return <StreamPage streamer={amanda} />;
} 