import { streamers } from '@/data/streamers';
import StreamPage from '@/components/StreamPage';

export default function StreamPageRoute({ params }: { params: { username: string } }) {
  const streamer = streamers.find(s => s.username === params.username);

  if (!streamer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-solana-light mb-4">Streamer not found</h1>
          <p className="text-solana-gray-300">The streamer you're looking for doesn't exist or is offline.</p>
        </div>
      </div>
    );
  }

  return <StreamPage streamer={streamer} />;
} 