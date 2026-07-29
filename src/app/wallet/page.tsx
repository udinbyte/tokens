'use client';

import { useState, useEffect } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { useNetwork } from '@/app/providers/NetworkProvider';
import useBalanceStore from '@/stores/balanceStore';
import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { getAccount } from '@solana/spl-token';
import { 
  Wallet as WalletIcon, 
  Copy, 
  Check, 
  ExternalLink, 
  ArrowUpRight, 
  ArrowDownRight,
  Coins,
  History,
  Settings,
  QrCode,
  ArrowDown,
  ArrowUp,
  Clock,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getExplorerUrl } from '@/utils/explorer';
import { notifySuccess, notifyError } from '@/utils/notifications';
import Link from 'next/link';

interface TokenAccount {
  mint: string;
  balance: number;
  decimals: number;
  symbol?: string;
  name?: string;
}

interface Transaction {
  signature: string;
  type: 'send' | 'receive' | 'create' | 'airdrop' | 'burn';
  amount: number;
  token?: string;
  timestamp: number;
  status: 'confirmed' | 'pending' | 'failed';
  from?: string;
  to?: string;
}

export default function WalletPage() {
  const { publicKey, connected, disconnect } = useWallet();
  const { connection } = useConnection();
  const { network } = useNetwork();
  const { balance, loading, fetchBalance } = useBalanceStore();
  
  const [copied, setCopied] = useState(false);
  const [tokenAccounts, setTokenAccounts] = useState<TokenAccount[]>([]);
  const [tokensLoading, setTokensLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<'assets' | 'history'>('assets');

  // Fetch token accounts
  const fetchTokenAccounts = async () => {
    if (!publicKey) return;
    
    setTokensLoading(true);
    try {
      const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
        programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'),
      });
      
      const accounts: TokenAccount[] = [];
      
      for (const accountInfo of tokenAccounts.value) {
        try {
          const accountData = await getAccount(connection, accountInfo.pubkey);
          const mint = accountData.mint.toString();
          const balance = Number(accountData.amount) / Math.pow(10, accountData.decimals);
          
          accounts.push({
            mint,
            balance,
            decimals: accountData.decimals,
          });
        } catch (error) {
          console.error('Error parsing token account:', error);
        }
      }
      
      setTokenAccounts(accounts);
    } catch (error) {
      console.error('Error fetching token accounts:', error);
    } finally {
      setTokensLoading(false);
    }
  };

  // Fetch transactions (mock)
  const fetchTransactions = async () => {
    if (!publicKey) return;
    
    try {
      const mockTransactions: Transaction[] = [
        {
          signature: '5x3...',
          type: 'receive',
          amount: 2.5,
          timestamp: Date.now() - 3600000,
          status: 'confirmed',
          from: '8x2...',
          to: publicKey.toString(),
        },
        {
          signature: '9y7...',
          type: 'send',
          amount: 0.5,
          timestamp: Date.now() - 7200000,
          status: 'confirmed',
          from: publicKey.toString(),
          to: '3z9...',
        },
        {
          signature: '1a4...',
          type: 'create',
          amount: 1000000,
          token: 'MYTOKEN',
          timestamp: Date.now() - 86400000,
          status: 'confirmed',
        },
      ];
      
      setTransactions(mockTransactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    if (connected && publicKey) {
      fetchBalance(publicKey, connection.rpcEndpoint);
      fetchTokenAccounts();
      fetchTransactions();
    }
  }, [connected, publicKey]);

  const copyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const formatTime = (timestamp: number) => {
    const diff = Date.now() - timestamp;
    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    
    if (hours > 24) {
      return new Date(timestamp).toLocaleDateString();
    }
    if (hours > 0) {
      return `${hours}h ago`;
    }
    if (minutes > 0) {
      return `${minutes}m ago`;
    }
    return 'Just now';
  };

  const getTransactionIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'receive':
        return <ArrowDownRight className="h-4 w-4 text-green-500" />;
      case 'send':
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case 'create':
        return <Coins className="h-4 w-4 text-purple-500" />;
      case 'airdrop':
        return <ArrowDown className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTransactionColor = (type: Transaction['type']) => {
    switch (type) {
      case 'receive':
        return 'text-green-500';
      case 'send':
        return 'text-red-500';
      case 'create':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  if (!connected || !publicKey) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-background">
        <div className="text-center">
          <div className="mx-auto mb-4 rounded-full bg-purple-500/10 p-4 w-16 h-16 flex items-center justify-center">
            <WalletIcon className="h-8 w-8 text-purple-400" />
          </div>
          <h2 className="text-2xl font-semibold">Wallet Not Connected</h2>
          <p className="text-muted-foreground mt-2">
            Connect your wallet to view details
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-3">
            <WalletIcon className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Wallet</h1>
            <p className="text-sm text-muted-foreground">
              Manage your Solana assets
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="gap-1"
            onClick={disconnect}
          >
            Disconnect
          </Button>
        </div>
      </div>

      {/* Wallet Card */}
      <div className="rounded-xl border bg-gradient-to-br from-purple-500/10 to-blue-500/10 p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Total Balance</p>
            <p className="text-3xl font-bold">
              {loading ? (
                <span className="inline-block h-8 w-32 animate-pulse rounded bg-muted" />
              ) : (
                `${balance.toFixed(4)} SOL`
              )}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              ≈ $0.00 USD
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Link href="/wallet/send">
              <Button className="gap-2 bg-gradient-to-r from-purple-400 to-blue-500">
                <ArrowUp className="h-4 w-4" />
                Send
              </Button>
            </Link>
            <Link href="/wallet/receive">
              <Button variant="outline" className="gap-2">
                <ArrowDown className="h-4 w-4" />
                Receive
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Wallet Address */}
      <div className="flex items-center gap-2 mb-6 p-3 rounded-lg bg-muted/30 border">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground">Your Address</p>
          <p className="text-sm font-mono truncate">
            {publicKey.toString()}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={copyAddress}
            className="p-1.5 rounded hover:bg-muted transition-colors"
            title="Copy address"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground" />
            )}
          </button>
          <a
            href={getExplorerUrl(network, publicKey.toString(), 'address')}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded hover:bg-muted transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-4">
        <button
          onClick={() => setActiveTab('assets')}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'assets'
              ? 'border-purple-500 text-purple-400'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Assets
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
            activeTab === 'history'
              ? 'border-purple-500 text-purple-400'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          History
        </button>
      </div>

      {/* Assets Tab */}
      {activeTab === 'assets' && (
        <div className="space-y-3">
          {/* SOL Balance */}
          <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                <Coins className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="font-medium">Solana</p>
                <p className="text-xs text-muted-foreground">SOL</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">{balance.toFixed(4)}</p>
              <p className="text-xs text-muted-foreground">$0.00</p>
            </div>
          </div>

          {/* Token Accounts */}
          {tokensLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-purple-400" />
              <span className="ml-2 text-sm text-muted-foreground">Loading tokens...</span>
            </div>
          ) : tokenAccounts.length > 0 ? (
            tokenAccounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Coins className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium">{account.symbol || 'Unknown Token'}</p>
                    <p className="text-xs text-muted-foreground">
                      {account.mint.slice(0, 4)}...{account.mint.slice(-4)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{account.balance.toFixed(4)}</p>
                  <p className="text-xs text-muted-foreground">$0.00</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Coins className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No token assets found</p>
            </div>
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-3">
          {transactions.length > 0 ? (
            transactions.map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                    {getTransactionIcon(tx.type)}
                  </div>
                  <div>
                    <p className="font-medium">
                      {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
                      {tx.token && ` ${tx.token}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatTime(tx.timestamp)}
                      {tx.from && tx.to && (
                        <span className="ml-1">
                          · {formatAddress(tx.from)} → {formatAddress(tx.to)}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={getTransactionColor(tx.type)}>
                    {tx.type === 'receive' ? '+' : tx.type === 'send' ? '-' : ''}
                    {tx.amount.toFixed(4)} {tx.token || 'SOL'}
                  </p>
                  <a
                    href={getExplorerUrl(network, tx.signature, 'tx')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-purple-400 hover:underline"
                  >
                    View
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <History className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No transaction history</p>
            </div>
          )}
        </div>
      )}

      {/* Network Info */}
      <div className="mt-6 p-4 rounded-lg border bg-muted/20">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Network</span>
          <span className="font-medium">{network}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-muted-foreground">RPC</span>
          <span className="font-mono text-xs truncate max-w-[200px]">
            {connection.rpcEndpoint}
          </span>
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        Built with ❤️ on Solana {network}
      </p>
    </div>
  );
}