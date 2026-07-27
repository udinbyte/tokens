import { create } from 'zustand';
import { PublicKey, Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';

interface BalanceStore {
  balance: number;
  loading: boolean;
  error: string | null;
  getUserSOLBalance: (publicKey: PublicKey, connection: Connection) => Promise<void>;
  reset: () => void;
}

const useBalanceStore = create<BalanceStore>((set) => ({
  balance: 0,
  loading: false,
  error: null,

  getUserSOLBalance: async (publicKey: PublicKey, connection: Connection) => {
    // Jangan fetch kalo masih loading
    set({ loading: true, error: null });

    try {
      const balance = await connection.getBalance(publicKey, 'confirmed');
      const balanceInSOL = balance / LAMPORTS_PER_SOL;

      set({
        balance: balanceInSOL,
        loading: false,
        error: null,
      });

      console.log('Balance:', balanceInSOL, 'SOL');
    } catch (error) {
      console.error('Error fetching balance:', error);
      set({
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch balance',
      });
    }
  },

  reset: () => {
    set({ balance: 0, loading: false, error: null });
  },
}));

export default useBalanceStore;