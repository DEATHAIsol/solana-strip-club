import {
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';

const PLATFORM_ADDRESS = new PublicKey('FLB41zNLBGDZTgaDnWCuernQLsdMZw2qoC1Z3LmKNHqr');

export class DonationProgram {
  async createDonationInstruction(
    fromPubkey: PublicKey,
    amount: number
  ): Promise<TransactionInstruction> {
    return SystemProgram.transfer({
      fromPubkey,
      toPubkey: PLATFORM_ADDRESS,
      lamports: amount * LAMPORTS_PER_SOL
    });
  }

  calculateRewardTier(amount: number): number {
    if (amount >= 100) return 5; // VIP Status
    if (amount >= 50) return 4;  // 1-on-1 Call
    if (amount >= 10) return 3;  // Private Message
    if (amount >= 5) return 2;   // Special Dance
    if (amount >= 1) return 1;   // Shoutout
    return 0;
  }
} 