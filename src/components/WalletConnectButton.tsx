'use client';

import { FC, useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import dynamic from 'next/dynamic';

// Dynamically import WalletMultiButton with no SSR
const WalletMultiButtonDynamic = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

const WalletConnectButton: FC = () => {
  const { publicKey } = useWallet();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;

  const displayAddress = publicKey 
    ? `${publicKey.toString().slice(0, 4)}...` 
    : 'Connect Wallet';

  return (
    <WalletMultiButtonDynamic 
      className="!bg-[#FF1493] hover:!bg-[#FF1493]/80 !text-white font-bold transition-all"
    >
      {displayAddress}
    </WalletMultiButtonDynamic>
  );
};

export default WalletConnectButton; 