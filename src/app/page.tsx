'use client';

import Link from 'next/link';
import Image from 'next/image';
import { streamers } from '@/data/streamers';
import WalletConnectButton from '@/components/WalletConnectButton';

export default function Home() {
  // Show all streamers instead of just first 3
  const featuredStreamers = streamers;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl sm:text-6xl font-bold text-pink-500 mb-4">
        Welcome to Solana Strip Club
      </h1>
      <p className="text-xl sm:text-2xl text-white mb-6">
        The first virtual strip club on Solana
      </p>
      <p className="text-lg text-pink-500">
        Powered by Solana Blockchain ⚡
      </p>
      <div className="text-pink-500 mt-4">
        💗 💗 💝
      </div>
    </div>
  );
}
