'use client';

import { ReactNode } from 'react';
import { NetworkProvider } from './NetworkProvider';
import { SolanaProvider } from './SolanaProvider';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NetworkProvider>
      <SolanaProvider>{children}</SolanaProvider>
    </NetworkProvider>
  );
};