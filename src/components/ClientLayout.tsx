'use client';

import WalletContextProvider from './WalletContextProvider';
import WalletConnectButton from './WalletConnectButton';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <WalletContextProvider>
      <nav className="bg-[#0F1115] border-b border-[#FF1493]/20 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            <a href="/" className="text-[#FF1493] text-2xl font-bold">
              SSC
            </a>
            <div className="flex gap-6">
              <a href="/performers" className="text-white hover:text-[#FF1493] transition-colors">
                Performers
              </a>
              <a href="/explore" className="text-white hover:text-[#FF1493] transition-colors">
                Explore
              </a>
              <a href="/schedule" className="text-white hover:text-[#FF1493] transition-colors">
                Schedule
              </a>
            </div>
          </div>
          <WalletConnectButton />
        </div>
      </nav>
      <main className="min-h-screen bg-[#0F1115]">
        {children}
      </main>
    </WalletContextProvider>
  );
} 