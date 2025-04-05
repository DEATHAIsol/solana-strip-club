'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Connection, Transaction, clusterApiUrl } from '@solana/web3.js';
import { DonationProgram } from '@/programs/donation_program';
import { toast } from 'react-hot-toast';

interface DonateButtonProps {
  streamerName: string;
  recipientAddress: string;
  presetAmount?: number | null;
  isOpen?: boolean;
  onClose?: () => void;
}

// Use mainnet connection with GenesysGo RPC
const connection = new Connection(
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://ssc-dao.genesysgo.net',
  {
    commitment: 'confirmed',
    wsEndpoint: process.env.NEXT_PUBLIC_SOLANA_RPC_URL?.replace('https://', 'wss://') || 'wss://ssc-dao.genesysgo.net',
    confirmTransactionInitialTimeout: 60000, // 60 seconds
  }
);
const donationProgram = new DonationProgram();

export default function DonateButton({ 
  streamerName, 
  recipientAddress,
  presetAmount = null,
  isOpen = false,
  onClose
}: DonateButtonProps) {
  const { publicKey, sendTransaction } = useWallet();
  const [amount, setAmount] = useState(presetAmount?.toString() || '');
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const [isLoading, setIsLoading] = useState(false);

  // Update amount when presetAmount changes
  useEffect(() => {
    if (presetAmount !== null) {
      setAmount(presetAmount.toString());
    }
  }, [presetAmount]);

  // Sync modal state with isOpen prop
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsModalOpen(false);
    onClose?.();
    setAmount('');
  };

  const handleDonate = async () => {
    if (!publicKey || !amount) return;

    try {
      setIsLoading(true);
      
      // Show processing toast early
      const toastId = toast.loading('Preparing transaction...');

      try {
        // Create the instruction
        const instruction = await donationProgram.createDonationInstruction(
          publicKey,
          parseFloat(amount)
        );

        // Get the latest blockhash
        const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized');

        // Create and sign transaction
        const transaction = new Transaction({
          feePayer: publicKey,
          blockhash: blockhash,
          lastValidBlockHeight: lastValidBlockHeight,
        }).add(instruction);

        // Send transaction
        toast.loading('Please approve the transaction in your wallet...', { id: toastId });
        const signature = await sendTransaction(transaction, connection);

        // Wait for confirmation
        toast.loading('Processing transaction...', { id: toastId });
        const confirmation = await connection.confirmTransaction({
          signature,
          blockhash,
          lastValidBlockHeight
        }, 'confirmed');

        if (confirmation.value.err) {
          console.error('Transaction error:', confirmation.value.err);
          toast.error(`Transaction failed: ${confirmation.value.err}`, { id: toastId });
        } else {
          toast.success(`Successfully donated ${amount} SOL!`, { id: toastId });
          handleClose();
        }
      } catch (err) {
        console.error('Transaction error:', err);
        if (err instanceof Error) {
          if (err.message.includes('User rejected')) {
            toast.error('Transaction cancelled by user', { id: toastId });
          } else {
            toast.error(`Error: ${err.message}`, { id: toastId });
          }
        } else {
          toast.error('Failed to send donation', { id: toastId });
        }
      } finally {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect to Solana network');
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 active:bg-pink-700 text-white px-6 py-3 rounded-lg font-bold transition-colors text-base sm:text-lg"
      >
        Custom Tip
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-0">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 sm:p-6 w-full max-w-md mx-auto">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4">
              Donate to {streamerName}
            </h3>

            {!publicKey ? (
              <div className="text-center">
                <p className="text-gray-400 mb-4 text-sm sm:text-base">Connect your wallet to donate</p>
                <WalletMultiButton className="!bg-pink-500 !text-white hover:!bg-pink-600 active:!bg-pink-700 !py-3 !text-base sm:!text-lg !rounded-lg" />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-400 mb-2">
                    Amount (SOL)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="0"
                    step="0.1"
                    inputMode="decimal"
                    className="w-full bg-black/40 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-base sm:text-lg"
                    placeholder="0.0"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-black/40 text-white px-4 py-3 rounded-lg hover:bg-opacity-80 active:bg-opacity-100 transition-colors text-base sm:text-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDonate}
                    disabled={!amount || isLoading || parseFloat(amount) <= 0}
                    className={`flex-1 bg-pink-500 text-white px-4 py-3 rounded-lg font-bold text-base sm:text-lg ${
                      !amount || isLoading || parseFloat(amount) <= 0
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-pink-600 active:bg-pink-700'
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