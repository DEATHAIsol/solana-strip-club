import Image from 'next/image';

interface StreamCardProps {
  id: number;
  title: string;
  streamer: string;
  viewers: number;
  thumbnail: string;
  tags?: string[];
}

export default function StreamCard({ id, title, streamer, viewers, thumbnail, tags = [] }: StreamCardProps) {
  return (
    <div className="group bg-solana-gray-100 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-solana-blue/20">
      <div className="relative">
        <div className="aspect-video w-full overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            width={320}
            height={180}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <div className="absolute top-2 right-2 bg-solana-gray-200/90 backdrop-blur-sm text-solana-light px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
          <span className="w-2 h-2 bg-solana-green rounded-full animate-pulse" />
          {viewers.toLocaleString()} viewers
        </div>
        {tags.length > 0 && (
          <div className="absolute bottom-2 left-2 flex gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-solana-blue/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-solana-light mb-1 group-hover:text-solana-blue transition-colors duration-200">
          {title}
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-solana-gray-200 flex items-center justify-center">
            <span className="text-xs font-bold text-solana-light">
              {streamer.charAt(0)}
            </span>
          </div>
          <p className="text-solana-gray-300 text-sm">{streamer}</p>
        </div>
      </div>
    </div>
  );
} 