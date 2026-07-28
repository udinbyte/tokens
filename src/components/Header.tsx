'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, Home, Layers, Mail, HelpCircle, LayoutDashboard } from 'lucide-react';
import { useWallet } from '@solana/wallet-adapter-react';
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

export default function Header() {
  const { connected } = useWallet();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/features', label: 'Features', icon: Layers },
    { href: '/contact', label: 'Contact', icon: Mail },
    { href: '/faq', label: 'FAQ', icon: HelpCircle },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-2">
          
          {/* KIRI: Logo */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity flex-shrink-0">
            <Image 
              src="/logo.png" 
              alt="SolanaCreator" 
              className="h-8 sm:h-10 md:h-12 w-auto" 
              width={40}
              height={40}
              priority
            />
            <span className="text-sm sm:text-lg md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent truncate max-w-[100px] sm:max-w-[150px] md:max-w-none">
              SolanaCreator
            </span>
          </Link>

          {/* TENGAH: Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'px-3 py-2 rounded-md text-sm transition-colors',
                  isActive(href)
                    ? 'bg-purple-500/10 text-purple-400 font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
              >
                {label}
              </Link>
            ))}
            {connected && (
              <Link
                href="/dashboard"
                className={cn(
                  'px-3 py-2 rounded-md text-sm transition-colors',
                  isActive('/dashboard')
                    ? 'bg-purple-500/10 text-purple-400 font-medium'
                    : 'text-purple-400 hover:text-purple-300 hover:bg-purple-500/10'
                )}
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* KANAN: Network + Wallet - Desktop */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
            <NetworkSwitcher />
            <WalletConnector />
          </div>

          {/* MOBILE & TABLET */}
          <div className="flex lg:hidden items-center gap-1 sm:gap-2">
            {/* Network + Wallet compact untuk tablet - tetap pakai komponen asli */}
            <div className="hidden sm:flex items-center gap-1">
              <NetworkSwitcher />
              <WalletConnector />
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger>
                <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 hover:bg-purple-500/10">
                  <Menu className="h-5 w-5 sm:h-5 sm:w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0">
                <SheetHeader className="p-4 border-b">
                  <SheetTitle className="text-left flex items-center gap-2">
                    <Image 
                      src="/logo.png" 
                      alt="SolanaCreator" 
                      className="h-8 w-auto" 
                      width={32}
                      height={32}
                    />
                    <span className="text-base sm:text-lg font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      SolanaCreator
                    </span>
                  </SheetTitle>
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

                  {connected && (
                    <Link
                      href="/dashboard"
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                        isActive('/dashboard')
                          ? 'bg-purple-500/10 text-purple-400 font-medium'
                          : 'text-purple-400 hover:bg-purple-500/10'
                      )}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  )}

                  <div className="border-t my-3" />
                  
                  {/* Network + Wallet di sheet - full width */}
                  <div className="space-y-3">
                    <NetworkSwitcher />
                    <WalletConnector />
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