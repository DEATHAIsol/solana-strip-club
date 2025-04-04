'use client';

import { useParams } from 'next/navigation';
import { streamers, type Streamer } from '@/data/streamers';
import StreamPage from '@/components/StreamPage';

export default function Page() {
  const params = useParams();
  const streamer = streamers.find(s => s.username === params.username);

  if (!streamer) {
    return <div>Streamer not found</div>;
  }

  return <StreamPage streamer={streamer} />;
} 