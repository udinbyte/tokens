'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useNetwork } from './providers/NetworkProvider';
import { useEffect, useState } from 'react';
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { CheckCircle2, XCircle, Copy, Rocket, Coins, Zap, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const { connected, publicKey } = useWallet();
  const { endpoint } = useNetwork();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!connected || !publicKey) {
      setBalance(null);
      return;
    }

    const getBalance = async () => {
      setLoading(true);
      try {
        const connection = new Connection(endpoint);
        const bal = await connection.getBalance(publicKey);
        setBalance(bal / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    getBalance();
  }, [connected, publicKey, endpoint]);

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-2xl">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 backdrop-blur-sm border border-purple-500/20">
              <Rocket className="h-14 w-14 text-purple-500" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Create Your Token
          </h1>
          <p className="text-muted-foreground mt-3 text-lg">
            Launch your SPL token on Solana blockchain in minutes
          </p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">⚡ No coding</span>
            <span className="flex items-center gap-1">🪙 Low fees</span>
            <span className="flex items-center gap-1">🌐 Decentralized</span>
          </div>
        </div>

        {/* Wallet Card */}
        <div className="bg-card rounded-xl border shadow-lg p-6 space-y-6">
          {/* Status */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Wallet Status</span>
            <div className="flex items-center gap-2">
              {connected ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  <span className="text-green-500 font-medium">Connected</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Disconnected</span>
                </>
              )}
            </div>
          </div>

          {connected && publicKey && (
            <>
              <div className="border-t" />
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-muted-foreground">Wallet Address</span>
                  <button
                    onClick={copyAddress}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                  >
                    <Copy className="h-3 w-3" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <div className="bg-muted rounded-lg p-3 font-mono text-xs break-all">
                  {publicKey.toString()}
                </div>
              </div>
            </>
          )}

          {connected && (
            <>
              <div className="border-t" />
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Balance</span>
                <div>
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      <span className="text-muted-foreground text-sm">Loading...</span>
                    </div>
                  ) : (
                    <p className="text-2xl font-bold">
                      {balance?.toFixed(4) || '0.0000'}{' '}
                      <span className="text-base font-normal text-muted-foreground">SOL</span>
                    </p>
                  )}
                </div>
              </div>
            </>
          )}

          <div className="border-t" />

          {/* Actions */}
          {connected ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href="/create" className="w-full">
                <Button className="w-full bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 text-white shadow-lg shadow-purple-500/25">
                  <Coins className="h-4 w-4" />
                  Create Token
                </Button>
              </Link>
              <Link href="/airdrop" className="w-full">
                <Button variant="outline" className="w-full">
                  <Zap className="h-4 w-4" />
                  Get Airdrop
                </Button>
              </Link>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground text-sm mb-4">
                Connect your wallet to start creating tokens
              </p>
              <Button className="bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-600 hover:to-fuchsia-700 text-white shadow-lg shadow-purple-500/25">
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            </div>
          )}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-card rounded-lg border p-4 text-center hover:border-purple-500/50 transition-colors">
            <div className="text-2xl mb-2">🚀</div>
            <h3 className="font-semibold text-sm">Instant Creation</h3>
            <p className="text-xs text-muted-foreground mt-1">Create tokens in seconds</p>
          </div>
          <div className="bg-card rounded-lg border p-4 text-center hover:border-purple-500/50 transition-colors">
            <div className="text-2xl mb-2">🔒</div>
            <h3 className="font-semibold text-sm">Secure & Safe</h3>
            <p className="text-xs text-muted-foreground mt-1">Built on Solana blockchain</p>
          </div>
          <div className="bg-card rounded-lg border p-4 text-center hover:border-purple-500/50 transition-colors">
            <div className="text-2xl mb-2">🪙</div>
            <h3 className="font-semibold text-sm">Full Control</h3>
            <p className="text-xs text-muted-foreground mt-1">Customize token metadata</p>
          </div>
        </div>

        {/* Supported Wallets */}
        <div className="flex flex-wrap justify-center gap-4 mt-8 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border">
            <span className="text-purple-500">🟣</span> Phantom
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border">
            <span className="text-orange-500">🟠</span> Brave
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border">
            <span className="text-blue-500">🔵</span> Solflare
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border">
            <span className="text-green-500">🟢</span> Backpack
          </span>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 mt-8 text-center">
          <div>
            <p className="text-2xl font-bold text-purple-400">10K+</p>
            <p className="text-xs text-muted-foreground">Tokens Created</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-400">99.9%</p>
            <p className="text-xs text-muted-foreground">Uptime</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">$0.001</p>
            <p className="text-xs text-muted-foreground">Avg Fee</p>
          </div>
        </div>
      </div>
    </main>
  );
}