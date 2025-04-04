import Image from 'next/image';

interface UserProfileProps {
  username: string;
  displayName: string;
  avatar: string;
  isLive: boolean;
  viewers: number;
  youtubeUrl: string;
  bio: string;
  socialLinks?: {
    twitter?: string;
    instagram?: string;
    tiktok?: string;
  };
}

export default function UserProfile({
  username,
  displayName,
  avatar,
  isLive,
  viewers,
  youtubeUrl,
  bio,
  socialLinks = {},
}: UserProfileProps) {
  return (
    <div className="bg-solana-gray-100 rounded-lg p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-solana-blue">
            <Image
              src={avatar}
              alt={displayName}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          {isLive && (
            <div className="absolute -top-2 -right-2 bg-solana-green text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              LIVE
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-2xl font-bold text-solana-light">{displayName}</h1>
            <span className="text-solana-gray-300">@{username}</span>
          </div>
          
          <p className="text-solana-gray-300 mb-4">{bio}</p>
          
          <div className="flex items-center gap-4 mb-4">
            {isLive && (
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-solana-green rounded-full animate-pulse" />
                <span className="text-solana-light">{viewers.toLocaleString()} watching</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-4">
            {socialLinks.twitter && (
              <a
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-solana-light hover:text-solana-blue transition-colors"
              >
                Twitter
              </a>
            )}
            {socialLinks.instagram && (
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-solana-light hover:text-solana-blue transition-colors"
              >
                Instagram
              </a>
            )}
            {socialLinks.tiktok && (
              <a
                href={socialLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="text-solana-light hover:text-solana-blue transition-colors"
              >
                TikTok
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 