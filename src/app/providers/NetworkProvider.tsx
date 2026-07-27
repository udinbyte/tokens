'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

type NetworkContextType = {
  network: WalletAdapterNetwork;
  endpoint: string;
  setNetwork: (n: WalletAdapterNetwork) => void;
};

const NetworkContext = createContext<NetworkContextType | undefined>(undefined);

export const useNetwork = () => {
  const ctx = useContext(NetworkContext);
  if (!ctx) throw new Error('useNetwork must be used within NetworkProvider');
  return ctx;
};

export const NetworkProvider = ({ children }: { children: ReactNode }) => {
  const [network, setNetwork] = useState<WalletAdapterNetwork>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('network') as WalletAdapterNetwork;
      if (saved === WalletAdapterNetwork.Testnet) return WalletAdapterNetwork.Devnet;
      if (saved) return saved;
    }
    return WalletAdapterNetwork.Devnet;
  });

  const getEndpoint = (n: WalletAdapterNetwork): string => {
    switch (n) {
      case WalletAdapterNetwork.Mainnet:
        return 'https://solana-mainnet.g.alchemy.com/v2/EGRd66pcOSpwu3HVIiBFu';
      case WalletAdapterNetwork.Testnet:
        return 'https://api.testnet.solana.com';
      case WalletAdapterNetwork.Devnet:
      default:
        return 'https://solana-devnet.g.alchemy.com/v2/EGRd66pcOSpwu3HVIiBFu';
    }
  };

  const endpoint = getEndpoint(network);

  useEffect(() => {
    localStorage.setItem('network', network);
  }, [network]);

  return (
    <NetworkContext.Provider value={{ network, endpoint, setNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};