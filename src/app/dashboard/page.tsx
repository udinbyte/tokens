// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { 
  LayoutDashboard, 
  User, 
  Coins, 
  Send, 
  ArrowLeftRight, 
  History,
  Settings,
  LogOut,
  Menu,
  X,
  PlusCircle,
  Wallet,
  TrendingUp,
  Gift
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Import komponen menu
import CreateToken from "@/components/dashboard/CreateToken";
import Profile from "@/components/dashboard/Profile";
import Transfer from "@/components/dashboard/Transfer";
import Swap from "@/components/dashboard/Swap";
import HistoryView from "@/components/dashboard/History";

export default function DashboardPage() {
  const { connected, publicKey, disconnect } = useWallet();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "profile", label: "Profile", icon: User },
    { id: "create-token", label: "Buat Token", icon: PlusCircle },
    { id: "transfer", label: "Transfer", icon: Send },
    { id: "swap", label: "Swap", icon: ArrowLeftRight },
    { id: "history", label: "History", icon: History },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case "dashboard":
        return <DashboardOverview />;
      case "profile":
        return <Profile />;
      case "create-token":
        return <CreateToken />;
      case "transfer":
        return <Transfer />;
      case "swap":
        return <Swap />;
      case "history":
        return <HistoryView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardOverview />;
    }
  };

  if (!connected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900">
        <Card className="max-w-md w-full mx-4 bg-white/5 border-white/10 backdrop-blur-xl">
          <CardContent className="p-8 text-center">
            <Wallet className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Wallet Not Connected</h2>
            <p className="text-muted-foreground mb-6">
              Please connect your wallet to access the dashboard
            </p>
            <Button 
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
              onClick={() => window.location.reload()}
            >
              Connect Wallet
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              SolanaCreator
            </span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={cn(
          "fixed lg:sticky top-0 z-40 h-screen w-[280px] bg-slate-900/90 backdrop-blur-xl border-r border-white/5 transition-transform duration-300 flex-shrink-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}>
          <div className="flex flex-col h-full">
            {/* Logo Desktop */}
            <div className="hidden lg:flex items-center gap-3 p-6 border-b border-white/5">
              <Image src="/logo.png" alt="Logo" width={40} height={40} />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SolanaCreator
              </span>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-white/5">
              <div className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {publicKey?.toString().slice(0, 6)}...{publicKey?.toString().slice(-4)}
                  </p>
                  <p className="text-xs text-muted-foreground">Connected</p>
                </div>
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            </div>

            {/* Menu Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveMenu(item.id);
                      setSidebarOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-400 font-medium shadow-lg shadow-purple-500/10"
                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className={cn(
                      "h-4 w-4",
                      isActive ? "text-purple-400" : "text-muted-foreground"
                    )} />
                    {item.label}
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-purple-400" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/5">
              <button
                onClick={disconnect}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Disconnect
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-screen overflow-x-hidden">
          <div className="p-4 sm:p-6 lg:p-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

// ============ DASHBOARD OVERVIEW ============
function DashboardOverview() {
  const { publicKey } = useWallet();

  const stats = [
    { label: "Total Balance", value: "0.00 SOL", icon: Wallet, color: "from-purple-500 to-blue-500" },
    { label: "Tokens Created", value: "0", icon: Coins, color: "from-pink-500 to-rose-500" },
    { label: "Transactions", value: "0", icon: Send, color: "from-green-500 to-emerald-500" },
    { label: "Airdrops", value: "0", icon: Gift, color: "from-orange-500 to-amber-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome back! Here's your overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="bg-white/5 border-white/5 hover:border-purple-500/30 transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Buat Token", icon: PlusCircle, color: "from-purple-500 to-blue-500" },
            { label: "Transfer", icon: Send, color: "from-green-500 to-emerald-500" },
            { label: "Swap", icon: ArrowLeftRight, color: "from-orange-500 to-amber-500" },
            { label: "Airdrop", icon: Gift, color: "from-pink-500 to-rose-500" },
          ].map((action, i) => {
            const Icon = action.icon;
            return (
              <Button
                key={i}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10"
              >
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-xs text-muted-foreground">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Activity */}
      <Card className="bg-white/5 border-white/5">
        <CardHeader>
          <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">No recent activity</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ============ SETTINGS VIEW ============
function SettingsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account settings</p>
      </div>

      <Card className="bg-white/5 border-white/5">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <p className="text-white font-medium">Network</p>
              <p className="text-sm text-muted-foreground">Current network: Devnet</p>
            </div>
            <Badge className="bg-purple-500/20 text-purple-400">Devnet</Badge>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-white/5">
            <div>
              <p className="text-white font-medium">Wallet Address</p>
              <p className="text-sm text-muted-foreground font-mono">... </p>
            </div>
            <Button variant="outline" size="sm" className="border-white/10 hover:border-purple-500/50">
              Copy
            </Button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-white font-medium">Notifications</p>
              <p className="text-sm text-muted-foreground">Email notifications</p>
            </div>
            <Button variant="outline" size="sm" className="border-white/10 hover:border-purple-500/50">
              Configure
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}