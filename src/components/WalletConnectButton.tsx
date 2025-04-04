'use client';

import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const WalletConnectButton: FC = () => {
  const { publicKey } = useWallet();
  
  const displayAddress = publicKey 
    ? `${publicKey.toString().slice(0, 4)}...` 
    : 'Connect Wallet';

  return (
    <WalletMultiButton 
      className="!bg-[#FF1493] hover:!bg-[#FF1493]/80 !text-white font-bold transition-all"
    >
      {displayAddress}
    </WalletMultiButton>
  );
};

export default WalletConnectButton; 