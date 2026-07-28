// components/dashboard/History.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function HistoryView() {
  const transactions = [
    // Data dummy
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">History</h1>
        <p className="text-muted-foreground text-sm">Your transaction history</p>
      </div>

      <Card className="bg-white/5 border-white/5">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <History className="h-5 w-5 text-purple-400" />
            Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Transaction items */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}