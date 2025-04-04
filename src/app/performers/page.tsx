import Image from 'next/image';
import Link from 'next/link';
import { performers } from '@/data/performers';

export default function PerformersPage() {
  const performers = [
    {
      name: 'Amanda',
      image: '/images/performers/amanda.jpg',
      bio: "Hey there! I'm Amanda, your girl next door with a wild side. I love dancing, gaming, and making your day better! 💋",
      schedule: "Mon-Fri: 8PM-12AM EST",
      specialties: ["Pole Dancing", "Private Shows", "Gaming Streams"],
    },
    {
      name: 'Caitlin',
      image: '/images/performers/caitlin.jpg',
      bio: "Sweet, spicy, and everything nice! Let me be your virtual girlfriend and show you a good time 💕",
      schedule: "Tue-Sat: 9PM-2AM EST",
      specialties: ["Lap Dances", "Cosplay", "Interactive Shows"],
    },
    {
      name: 'Georgia',
      image: '/images/performers/georgia.jpg',
      bio: "Georgia here! Ready to make your fantasies come true. Join me for some unforgettable moments! ✨",
      schedule: "Wed-Sun: 7PM-1AM EST",
      specialties: ["Burlesque", "Theme Shows", "VIP Experiences"],
    }
  ]

  return (
    <div className="min-h-screen">
      <div className="relative h-[300px] mb-12">
        <Image
          src="/images/performers/banner.jpg"
          alt="Performers Banner"
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center gap-3 mb-4">
              <span className="animate-bounce delay-100">💝</span>
              <span className="animate-bounce delay-200">💖</span>
              <span className="animate-bounce delay-300">💓</span>
            </div>
            <h1 className="text-5xl font-bold text-[#FF1493] mb-4">Our Performers</h1>
            <p className="text-xl text-[#FF1493]/80">Connect with your favorite creators 💕</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-[#FF1493] text-4xl font-bold text-center mb-4">
          Meet Our Performers
        </h1>
        <p className="text-[#FF1493]/80 text-center mb-12">Find your perfect match 💘</p>

        <div className="grid grid-cols-1 gap-12">
          {performers.map((performer, index) => (
            <div 
              key={performer.name}
              className={`flex flex-col md:flex-row gap-8 items-center ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="w-full md:w-1/2 relative h-[400px] group">
                <Image
                  src={performer.image}
                  alt={performer.name}
                  fill
                  className="object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg" />
              </div>
              
              <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-[#FF1493] text-3xl font-bold flex items-center gap-2">
                  {performer.name}
                  <span className="text-xl">💝</span>
                </h2>
                
                <p className="text-white text-lg">
                  {performer.bio}
                </p>

                <div className="bg-gray-900/80 backdrop-blur-sm p-6 rounded-lg space-y-4 border-2 border-[#FF1493]/20">
                  <div>
                    <h3 className="text-[#FF1493] font-bold mb-2 flex items-center gap-2">
                      Schedule <span>⏰</span>
                    </h3>
                    <p className="text-white">{performer.schedule}</p>
                  </div>

                  <div>
                    <h3 className="text-[#FF1493] font-bold mb-2 flex items-center gap-2">
                      Specialties <span>✨</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {performer.specialties.map((specialty) => (
                        <span 
                          key={specialty}
                          className="bg-[#FF1493] text-white px-3 py-1 rounded-full text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="w-full bg-[#FF1493] text-white font-bold py-3 rounded-lg hover:bg-[#FF1493]/80 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
                    Join Stream 💕
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 