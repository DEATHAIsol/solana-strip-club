'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FaBars, FaTimes } from 'react-icons/fa';
import { FaXTwitter, FaChartLine } from "react-icons/fa6";

// Dynamically import WalletMultiButton with no SSR
const WalletMultiButtonDynamic = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <nav className="bg-black/40 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo - always visible */}
            <Link href="/" className="text-2xl font-bold text-pink-500">
              SSC
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center space-x-8">
              <Link href="/performers" className="text-white hover:text-pink-500 transition-colors">
                Performers
              </Link>
              <Link href="/explore" className="text-white hover:text-pink-500 transition-colors">
                Explore
              </Link>
              <Link href="/schedule" className="text-white hover:text-pink-500 transition-colors">
                Schedule
              </Link>
              <WalletMultiButtonDynamic className="!bg-purple-600 !text-white hover:!bg-purple-700" />
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-pink-500 transition-colors"
              >
                <FaXTwitter size={24} />
              </a>
              <a 
                href="https://dexscreener.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-pink-500 transition-colors"
              >
                <FaChartLine size={24} />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center">
              <WalletMultiButtonDynamic className="!bg-purple-600 !text-white hover:!bg-purple-700 !py-2 !px-4 !text-sm mr-2" />
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white p-2"
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Dropdown */}
          <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/performers"
                className="block px-3 py-2 text-white hover:bg-pink-500/20 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Performers
              </Link>
              <Link
                href="/explore"
                className="block px-3 py-2 text-white hover:bg-pink-500/20 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                href="/schedule"
                className="block px-3 py-2 text-white hover:bg-pink-500/20 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Schedule
              </Link>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-white hover:bg-pink-500/20 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Twitter
              </a>
              <a
                href="https://dexscreener.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 text-white hover:bg-pink-500/20 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                DEXScreener
              </a>
            </div>
          </div>
        </div>
      </nav>
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
} 