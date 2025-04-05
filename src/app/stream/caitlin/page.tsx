'use client';

import { streamers } from '@/data/streamers';
import StreamPage from '@/components/StreamPage';

export default function CaitlinStreamPage() {
  const caitlin = streamers.find(s => s.username === 'caitlin');
  
  if (!caitlin) {
    return <div>Stream not found</div>;
  }

  return <StreamPage streamer={caitlin} />;
} 