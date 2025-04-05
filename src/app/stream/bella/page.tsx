'use client';

import { streamers } from '@/data/streamers';
import StreamPage from '@/components/StreamPage';

export default function BellaStreamPage() {
  const bella = streamers.find(s => s.username === 'bella');
  
  if (!bella) {
    return <div>Stream not found</div>;
  }

  return <StreamPage streamer={bella} />;
} 