'use client';

import { WalletContextProvider } from '@/components/WalletContextProvider';

export default function StreamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WalletContextProvider>
      <main className="min-h-screen bg-gray-950">
        {children}
      </main>
    </WalletContextProvider>
  );
} 