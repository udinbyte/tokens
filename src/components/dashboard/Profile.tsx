// components/dashboard/Profile.tsx
"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const { publicKey } = useWallet();
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!publicKey) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Please connect your wallet</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Profile</h1>
        <p className="text-muted-foreground text-sm">Your wallet information</p>
      </div>

      <Card className="bg-white/5 border-white/5">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <User className="h-5 w-5 text-purple-400" />
            Wallet Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
              <User className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-white font-medium">Wallet Address</p>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-sm text-muted-foreground font-mono">
                  {publicKey.toString().slice(0, 10)}...{publicKey.toString().slice(-10)}
                </code>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-purple-500/10"
                  onClick={copyAddress}
                >
                  {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3 text-muted-foreground" />}
                </Button>
                <a
                  href={`https://solscan.io/account/${publicKey.toString()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-3 w-3 text-muted-foreground hover:text-purple-400" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <p className="text-sm text-muted-foreground">Balance</p>
              <p className="text-xl font-bold text-white">0.00 SOL</p>
            </div>
            <div className="p-4 bg-white/5 rounded-xl">
              <p className="text-sm text-muted-foreground">Network</p>
              <p className="text-xl font-bold text-white">Devnet</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}