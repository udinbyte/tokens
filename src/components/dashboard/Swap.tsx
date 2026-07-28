// components/dashboard/Swap.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftRight, Loader2, RefreshCw } from "lucide-react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function Swap() {
  const { connected } = useWallet();
  const [loading, setLoading] = useState(false);
  const [swapData, setSwapData] = useState({
    from: "SOL",
    to: "USDC",
    amount: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  if (!connected) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Please connect your wallet to swap</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Swap</h1>
        <p className="text-muted-foreground text-sm">Swap tokens instantly on Solana</p>
      </div>

      <Card className="bg-white/5 border-white/5">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-purple-400" />
            Swap Tokens
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* From */}
            <div className="space-y-2">
              <Label className="text-white">From</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={swapData.amount}
                  onChange={(e) => setSwapData({ ...swapData, amount: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground flex-1"
                  required
                />
                <select
                  value={swapData.from}
                  onChange={(e) => setSwapData({ ...swapData, from: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="SOL">SOL</option>
                  <option value="USDC">USDC</option>
                  <option value="USDT">USDT</option>
                </select>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-white/5 hover:bg-white/10"
                onClick={() => setSwapData({ ...swapData, from: swapData.to, to: swapData.from })}
              >
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>

            {/* To */}
            <div className="space-y-2">
              <Label className="text-white">To</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={swapData.amount ? (parseFloat(swapData.amount) * 150).toString() : ""}
                  className="bg-white/5 border-white/10 text-white placeholder:text-muted-foreground flex-1"
                  disabled
                />
                <select
                  value={swapData.to}
                  onChange={(e) => setSwapData({ ...swapData, to: e.target.value })}
                  className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="USDC">USDC</option>
                  <option value="SOL">SOL</option>
                  <option value="USDT">USDT</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex justify-between">
              <span className="text-xs text-muted-foreground">Rate</span>
              <span className="text-xs text-white">1 SOL ≈ 150 USDC</span>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Swapping...
                </>
              ) : (
                "Swap Now"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}