'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, Home, Coins, FileText, Send, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import NetworkSwitcher from './NetworkSwitcher';
import WalletConnector from './WalletConnector';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems: NavItem[] = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/create', label: 'Create Token', icon: Coins },
    { href: '/metadata', label: 'Metadata', icon: FileText },
    { href: '/transfer', label: 'Transfer', icon: Send },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          {/* KIRI: Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
            <Image 
              src="/logo.png" 
              alt="SolanaCreator" 
              width={40}
              height={40}
              className="h-8 w-auto"
              priority
            />
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent hidden sm:inline">
              SolanaCreator
            </span>
          </Link>

          {/* KANAN: Network + Wallet + Hamburger */}
          <div className="flex items-center gap-3">
            <NetworkSwitcher />
            <WalletConnector />

            {/* Hamburger Button */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-purple-500/10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
                <SheetHeader className="p-4 border-b flex flex-row items-center justify-between">
                  <SheetTitle className="flex items-center gap-2">
                    <Image 
                      src="/logo.png" 
                      alt="SolanaCreator" 
                      width={32}
                      height={32}
                      className="h-6 w-auto"
                    />
                    <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      SolanaCreator
                    </span>
                  </SheetTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setOpen(false)}
                    className="h-8 w-8 hover:bg-muted"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </SheetHeader>

                <div className="flex flex-col p-4 gap-1">
                  {navItems.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                        isActive(href)
                          ? 'bg-purple-500/10 text-purple-400 font-medium'
                          : 'text-foreground hover:bg-muted/50'
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  ))}

                  <div className="border-t my-3" />
                  
                  {/* Network + Wallet di sheet */}
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1.5">Network</p>
                      <NetworkSwitcher />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1.5">Wallet</p>
                      <WalletConnector />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}