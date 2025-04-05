'use client';

import { streamers } from '@/data/streamers';
import StreamPage from '@/components/StreamPage';
import { notFound } from 'next/navigation';

export default function Page({ params }: { params: { username: string } }) {
  const streamer = streamers.find(s => s.username.toLowerCase() === params.username.toLowerCase());

  if (!streamer) {
    return notFound();
  }

  return <StreamPage streamer={streamer} />;
} 