'use client';

import { useNetwork } from '@/app/providers/NetworkProvider';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const networks = [
  { value: WalletAdapterNetwork.Devnet, label: 'Devnet', color: 'text-green-500' },
  { value: WalletAdapterNetwork.Mainnet, label: 'Mainnet', color: 'text-blue-500' },
];

export default function NetworkSwitcher({ className }: { className?: string }) {
  const { network, setNetwork } = useNetwork();

  return (
    <Select value={network} onValueChange={(v) => setNetwork(v as WalletAdapterNetwork)}>
      <SelectTrigger 
        className={cn(
          'rounded-lg text-sm bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600 text-white border-0 shadow-lg shadow-purple-500/25',
          className
        )}
		size="default"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {networks.map((n) => (
          <SelectItem key={n.value} value={n.value}>
            <span className={n.color}>●</span> {n.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};