"use client";

import Image from "next/image";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LuArrowRightFromLine } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ToolsView() {
  
  const items = [
    { 
      label: "Buat Token", 
      icon: "/icons/token.png",
      desc: "Ciptakan aset digital Anda sendiri di blockchain Solana. Proses cepat tanpa hambatan teknis.",
      gradient: "from-purple-600/30 via-purple-500/10 to-pink-600/20",
      borderColor: "border-purple-500/30"
    },
    { 
      label: "Metadata Token", 
      icon: "/icons/metadata.png",
      desc: "Kelola informasi lengkap token Anda—nama, simbol, deskripsi, dan gambar—dalam satu dashboard.",
      gradient: "from-blue-600/30 via-blue-500/10 to-cyan-600/20",
      borderColor: "border-blue-500/30"
    },
    { 
      label: "Airdrop", 
      icon: "/icons/airdrop.png",
      desc: "Distribusikan token ke ribuan wallet sekaligus. Bangun komunitas dengan cara yang efisien.",
      gradient: "from-green-600/30 via-green-500/10 to-emerald-600/20",
      borderColor: "border-green-500/30"
    },
    { 
      label: "Kirim Transaksi", 
      icon: "/icons/transaction.png",
      desc: "Transfer token antar wallet dalam hitungan detik. Biaya rendah, kecepatan tinggi, tanpa perantara.",
      gradient: "from-yellow-600/30 via-yellow-500/10 to-orange-600/20",
      borderColor: "border-yellow-500/30"
    },
    { 
      label: "Token Partner", 
      icon: "/icons/partner.png",
      desc: "Kelola token kolaborasi dengan mitra bisnis. Kontrol penuh atas distribusi dan akses.",
      gradient: "from-pink-600/30 via-pink-500/10 to-rose-600/20",
      borderColor: "border-pink-500/30"
    },
    { 
      label: "Top Token", 
      icon: "/icons/trending.png",
      desc: "Pantau token terpopuler di ekosistem Solana. Data real-time untuk keputusan investasi Anda.",
      gradient: "from-orange-600/30 via-orange-500/10 to-amber-600/20",
      borderColor: "border-orange-500/30"
    },
    { 
      label: "Solana Explorer", 
      icon: "/icons/explorer.png",
      desc: "Telusuri setiap transaksi, block, dan wallet di blockchain Solana. Transparansi penuh.",
      gradient: "from-cyan-600/30 via-cyan-500/10 to-teal-600/20",
      borderColor: "border-cyan-500/30"
    },
  ]
  
  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12 lg:mb-16 text-center">
          <Badge className="text-[10px] sm:text-xs font-bold tracking-wider text-purple-400 uppercase bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4">
            Ekosystem Lengkap
          </Badge>
          <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Bangun dan Kelola <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Asset Digital Anda
            </span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-4">
            Kami menyediakan infrastruktur yang Anda butuhkan untuk menciptakan, mengelola, dan mendistribusikan token di blockchain Solana. 
            Bebas dari kerumitan teknis, tanpa mengorbankan kontrol dan keamanan.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto mt-6 sm:mt-8">
            {[
              { value: '7+', label: 'Alat Terintegrasi', icon: '🔧' },
              { value: '< 2m', label: 'Deploy Token', icon: '⚡' },
              { value: '100%', label: 'Kontrol Penuh', icon: '🛡️' },
              { value: '24/7', label: 'Akses Tak Terbatas', icon: '🌐' },
            ].map((stat, i) => (
              <Card key={i} className="text-center bg-gradient-to-br from-white/5 to-white/0 border-white/5 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-sm hover:scale-105">
                <CardContent className="p-3 sm:p-4">
                  <p className="text-2xl sm:text-3xl mb-1">{stat.icon}</p>
                  <p className="text-xl sm:text-2xl font-bold text-white bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {items.map((item, index) => (
            <Card 
              key={index} 
              className={`
                relative overflow-hidden group transition-all duration-500 
                hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/20 
                border-0 bg-gradient-to-br ${item.gradient}
                backdrop-blur-sm
              `}
            >
              {/* Animated Border Glow */}
              <div className="absolute inset-0 rounded-xl p-[1.5px] bg-gradient-to-br from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/30 via-transparent to-blue-500/30 animate-pulse" />
              </div>
              
              {/* Glass Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Glow Effect on Hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-blue-500/0 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <CardContent className="relative p-5 sm:p-6 lg:p-7 z-10">
                <div className="mb-4 sm:mb-5 flex items-start gap-4">
                  {/* Icon Container with 3D PNG */}
                  <div className={`
                    inline-flex items-center justify-center rounded-2xl 
                    h-16 w-16 sm:h-20 sm:w-20 min-w-16 sm:min-w-20
                    bg-gradient-to-br from-white/10 to-white/5
                    border border-white/10
                    group-hover:scale-110 group-hover:rotate-[-8deg] 
                    transition-all duration-500 ease-out
                    shadow-xl shadow-purple-500/10
                    relative overflow-hidden
                  `}>
                    {/* Glow behind icon */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <Image 
                      src={item.icon}
                      alt={item.label}
                      width={48}
                      height={48}
                      className="relative z-10 object-contain w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg"
                    />
                  </div>
                  
                  <div className="min-w-0 flex-1 pt-1">
                    <h3 className="text-sm sm:text-base text-white font-semibold truncate group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                      {item.label}
                    </h3>
                    <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5 flex items-center gap-1">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-400/50" />
                      {index + 1}/7 Tools
                    </p>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed min-h-[48px] sm:min-h-[60px] group-hover:text-white/80 transition-colors duration-300">
                  {item.desc}
                </p>
                
                <Link href="#" className="group/link relative inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors mt-3 sm:mt-4">
                  <span>Gunakan Sekarang</span>
                  <LuArrowRightFromLine className="h-3 w-3 sm:h-4 sm:w-4 group-hover/link:translate-x-1 transition-transform" />
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-500 group-hover/link:w-full" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* CTA Buttons */}
        <div className="mt-12 sm:mt-14 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Button className="rounded-full px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 w-full sm:w-auto min-w-[180px] sm:min-w-[200px] h-auto transition-all duration-300 hover:scale-105">
            <Link href="#" className="flex items-center gap-2">
              Lihat Semua Alat
              <IoIosArrowRoundForward className="text-xl sm:text-2xl" />
            </Link>
          </Button>
          <Button variant="outline" className="rounded-full px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 w-full sm:w-auto min-w-[180px] sm:min-w-[200px] h-auto transition-all duration-300 hover:scale-105">
            <Link href="#" className="flex items-center gap-2">
              Mulai Sekarang
              <IoIosArrowRoundForward className="text-xl sm:text-2xl" />
            </Link>
          </Button>
        </div>
        
        {/* Trust Badge */}
        <div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-muted-foreground">
          {[
            { label: 'Audit Terverifikasi', color: 'bg-green-400' },
            { label: 'Open Source', color: 'bg-blue-400' },
            { label: 'Komunitas 10K+', color: 'bg-purple-400' },
            { label: 'Dukungan 24/7', color: 'bg-pink-400' },
          ].map((badge, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className={`h-1.5 w-1.5 rounded-full ${badge.color} flex-shrink-0 animate-pulse`} />
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}