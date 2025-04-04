'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, PublicKey, LAMPORTS_PER_SOL, Transaction, SystemProgram } from '@solana/web3.js';

interface DonateButtonProps {
  recipientAddress: string;
  streamerName: string;
}

export default function DonateButton({ recipientAddress, streamerName }: DonateButtonProps) {
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async () => {
    if (!publicKey || !amount) return;

    try {
      setIsLoading(true);
      const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com');
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(recipientAddress),
          lamports: parseFloat(amount) * LAMPORTS_PER_SOL,
        })
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      setAmount('');
      setIsModalOpen(false);
      // You might want to add a success notification here
    } catch (error) {
      console.error('Error:', error);
      // You might want to add an error notification here
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-primary text-black px-6 py-3 rounded-lg font-bold hover:bg-[#00dd00] transition-colors"
      >
        Donate SOL
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background-card rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">
              Donate to {streamerName}
            </h3>

            {!publicKey ? (
              <div className="text-center">
                <p className="text-gray-400 mb-4">Connect your wallet to donate</p>
                <WalletMultiButton className="!bg-primary !text-black hover:!bg-[#00dd00]" />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-1">
                    Amount (SOL)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.1"
                    className="w-full bg-background-dark text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="0.0"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-background-dark text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDonate}
                    disabled={!amount || isLoading}
                    className={`flex-1 bg-primary text-black px-4 py-2 rounded-lg font-bold ${
                      !amount || isLoading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-[#00dd00]'
                    } transition-colors`}
                  >
                    {isLoading ? 'Processing...' : 'Send Donation'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
} 