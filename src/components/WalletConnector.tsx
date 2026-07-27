'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal } from '@solana/wallet-adapter-react-ui';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut, ChevronDown, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function WalletConnector({ className }: { className?: string }) {
  const { connected, publicKey, disconnect, wallet } = useWallet();
  const { setVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // BELUM CONNECT
  if (!connected) {
    return (
      <Button
        onClick={() => setVisible(true)}
        className={cn(
          'h-10 rounded-lg bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40',
          'md:w-auto w-full',
          className
        )}
      >
        <Wallet className="h-4 w-4" />
        Connect Wallet
      </Button>
    );
  }

  // SUDAH CONNECT
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="purple"
          className={cn(
            'h-10 rounded-lg gap-2 text-white',
            'md:w-auto w-full',
            className
          )}
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-sm">
            {publicKey?.toString().slice(0, 4)}...{publicKey?.toString().slice(-4)}
          </span>
          <ChevronDown className="h-3 w-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-xs text-muted-foreground border-b">
          {wallet?.adapter.name || 'Wallet'}
        </div>

        <DropdownMenuItem onClick={copyAddress} className="gap-2 cursor-pointer">
          {copied ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Copy Address</span>
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={disconnect}
          className="gap-2 text-red-500 hover:text-red-600 hover:bg-red-500/10 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span>Disconnect</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}