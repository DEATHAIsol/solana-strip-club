'use client';

import { streamers } from '@/data/streamers';
import StreamPage from '@/components/StreamPage';

export default function JessStreamPage() {
  const jess = streamers.find(s => s.username === 'jess');
  
  if (!jess) {
    return <div>Stream not found</div>;
  }

  return <StreamPage streamer={jess} />;
} 