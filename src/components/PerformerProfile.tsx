import Image from 'next/image';
import Link from 'next/link';

interface PerformerProfileProps {
  name: string;
  slug: string;
  age: number;
  location: string;
  height: string;
  heightCm: number;
  weight: string;
  weightKg: number;
  hair: string;
  eyes: string;
  vibe: string;
  bio: string;
  turnOns: string;
  languages: string[];
  imagePath: string;
}

export default function PerformerProfile({
  name,
  slug,
  age,
  location,
  height,
  heightCm,
  weight,
  weightKg,
  hair,
  eyes,
  vibe,
  bio,
  turnOns,
  languages,
  imagePath,
}: PerformerProfileProps) {
  return (
    <div className="card">
      <div className="relative h-[500px] group">
        <Image
          src={imagePath}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-4xl font-bold text-white mb-2">{name}</h1>
          <p className="text-primary text-xl font-medium">{vibe}</p>
        </div>
      </div>
      
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-start">
          <div className="space-y-4">
            <div className="flex gap-3">
              {languages.map((language) => (
                <span key={language} className="badge">
                  {language}
                </span>
              ))}
            </div>
          </div>
          <Link href={`/stream/${slug}`} className="btn-primary">
            Watch Stream
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="card p-4 hover:bg-background-dark transition-colors">
            <p className="text-gray-400 text-sm font-medium mb-1">Age</p>
            <p className="text-white text-lg font-semibold">{age}</p>
          </div>
          <div className="card p-4 hover:bg-background-dark transition-colors">
            <p className="text-gray-400 text-sm font-medium mb-1">Location</p>
            <p className="text-white text-lg font-semibold">{location}</p>
          </div>
          <div className="card p-4 hover:bg-background-dark transition-colors">
            <p className="text-gray-400 text-sm font-medium mb-1">Height</p>
            <p className="text-white text-lg font-semibold">{height}</p>
            <p className="text-gray-400 text-sm">{heightCm} cm</p>
          </div>
          <div className="card p-4 hover:bg-background-dark transition-colors">
            <p className="text-gray-400 text-sm font-medium mb-1">Weight</p>
            <p className="text-white text-lg font-semibold">{weight}</p>
            <p className="text-gray-400 text-sm">{weightKg} kg</p>
          </div>
          <div className="card p-4 hover:bg-background-dark transition-colors">
            <p className="text-gray-400 text-sm font-medium mb-1">Hair</p>
            <p className="text-white text-lg font-semibold">{hair}</p>
          </div>
          <div className="card p-4 hover:bg-background-dark transition-colors">
            <p className="text-gray-400 text-sm font-medium mb-1">Eyes</p>
            <p className="text-white text-lg font-semibold">{eyes}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6 hover:bg-background-dark transition-colors">
            <h2 className="text-2xl font-bold text-white mb-3">About Me</h2>
            <p className="text-gray-300 leading-relaxed">{bio}</p>
          </div>

          <div className="card p-6 hover:bg-background-dark transition-colors">
            <h2 className="text-2xl font-bold text-white mb-3">Turn-Ons</h2>
            <p className="text-gray-300 leading-relaxed">{turnOns}</p>
          </div>
        </div>
      </div>
    </div>
  );
} 