'use client';

import React, { useState } from 'react';
import { useForm } from '@formspree/react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Send, 
  Twitter, 
  Github, 
  Discord, 
  YoutubeIcon, // 🔥 Ganti dari Youtube ke YoutubeIcon
  Rocket,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Footer() {
  const [state, handleSubmit] = useForm('YOUR_FORM_ID');
  const [email, setEmail] = useState('');

  const menuOne = [
    { label: 'Pusat Bantuan', href: '/support' },
    { label: 'Dukungan Pelanggan', href: '/support' },
    { label: 'Tentang Kami', href: '/about' },
    { label: 'Proyek', href: '/project' },
    { label: 'Kebijakan Pengembalian', href: '/return-policy' },
  ];

  const menuTwo = [
    { label: 'Pertanyaan Pers', href: '/press' },
    { label: 'Dukungan Media Sosial', href: '/social' },
    { label: 'Gambar & B-Roll', href: '/media' },
    { label: 'Peta Situs', href: '/sitemap' },
  ];

  const socials = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Discord, href: 'https://discord.com', label: 'Discord' },
    { icon: YoutubeIcon, href: 'https://youtube.com', label: 'YouTube' }, // 🔥 Ganti
  ];

  if (state.succeeded) {
    return (
      <footer className="bg-background/40 backdrop-blur-3xl border-t border-white/5">
        <div className="container mx-auto px-4 py-16">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="p-4 rounded-2xl bg-green-500/10 border border-green-500/20">
              <CheckCircle className="h-12 w-12 text-green-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mt-4 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Pesan Anda Telah Terkirim! 🎉
            </h1>
            <p className="text-muted-foreground mt-2">
              Kami akan segera menghubungi Anda
            </p>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-background/40 backdrop-blur-3xl border-t border-white/5">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="SolanaCreator" width={40} height={40} className="h-8 w-auto" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SolanaCreator
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Ciptakan dan luncurkan token SPL sendiri di blockchain Solana dalam hitungan menit.
              Tanpa perlu coding.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Menu 1 */}
          <div>
            <h3 className="font-semibold mb-4">Dukungan</h3>
            <ul className="space-y-2">
              {menuOne.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu 2 */}
          <div>
            <h3 className="font-semibold mb-4">Sumber Daya</h3>
            <ul className="space-y-2">
              {menuTwo.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Tetap Terupdate</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Berlangganan untuk mendapatkan pembaruan dan berita terbaru
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex gap-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Masukkan email Anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-10 rounded-lg bg-muted/50 border-white/10"
                  required
                />
                <Button
                  type="submit"
                  disabled={state.submitting}
                  className="h-10 rounded-lg bg-gradient-to-r from-purple-400 to-blue-500 hover:from-purple-500 hover:to-blue-600 text-white shadow-lg shadow-purple-500/25"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              {state.errors && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <XCircle className="h-3 w-3" />
                  Terjadi kesalahan. Silakan coba lagi.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SolanaCreator. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Kebijakan Privasi
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Syarat & Ketentuan
            </Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">
              Cookie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}