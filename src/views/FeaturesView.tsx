
import Link from "next/link";
import Image from "next/image";
import { 
  Zap, 
  Shield, 
  Coins, 
  Rocket, 
  Users, 
  TrendingUp, 
  Globe, 
  Clock,
  CheckCircle,
  Sparkles,
  Wand2,
  Gauge,
  Lock,
  Infinity,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Features() {
  
  const features = [
    {
      label: "Token Generator",
      icon: <Wand2 className="h-6 w-6 text-purple-400" />,
      desc: "Ciptakan token SPL sendiri dalam hitungan menit. Tanpa coding, tanpa kerumitan.",
      gradient: "from-purple-600/20 via-purple-500/10 to-pink-600/10",
      iconBg: "bg-purple-500/20"
    },
    {
      label: "Smart Metadata",
      icon: <Coins className="h-6 w-6 text-blue-400" />,
      desc: "Kelola metadata token dengan mudah. Nama, simbol, deskripsi, dan gambar dalam satu dashboard.",
      gradient: "from-blue-600/20 via-blue-500/10 to-cyan-600/10",
      iconBg: "bg-blue-500/20"
    },
    {
      label: "Bulk Airdrop",
      icon: <Rocket className="h-6 w-6 text-green-400" />,
      desc: "Distribusikan token ke ribuan wallet sekaligus. Efisien, cepat, dan hemat biaya.",
      gradient: "from-green-600/20 via-green-500/10 to-emerald-600/10",
      iconBg: "bg-green-500/20"
    },
    {
      label: "Instant Transfer",
      icon: <Zap className="h-6 w-6 text-yellow-400" />,
      desc: "Kirim token antar wallet dalam hitungan detik. Biaya rendah, kecepatan tinggi.",
      gradient: "from-yellow-600/20 via-yellow-500/10 to-orange-600/10",
      iconBg: "bg-yellow-500/20"
    },
    {
      label: "Token Partner",
      icon: <Users className="h-6 w-6 text-pink-400" />,
      desc: "Kelola token kolaborasi dengan mitra bisnis. Kontrol penuh atas distribusi dan akses.",
      gradient: "from-pink-600/20 via-pink-500/10 to-rose-600/10",
      iconBg: "bg-pink-500/20"
    },
    {
      label: "Market Analytics",
      icon: <TrendingUp className="h-6 w-6 text-orange-400" />,
      desc: "Pantau performa token Anda secara real-time. Data akurat untuk keputusan bisnis.",
      gradient: "from-orange-600/20 via-orange-500/10 to-amber-600/10",
      iconBg: "bg-orange-500/20"
    },
    {
      label: "Solana Explorer",
      icon: <Globe className="h-6 w-6 text-cyan-400" />,
      desc: "Telusuri setiap transaksi dan block di blockchain Solana. Transparansi penuh.",
      gradient: "from-cyan-600/20 via-cyan-500/10 to-teal-600/10",
      iconBg: "bg-cyan-500/20"
    },
    {
      label: "24/7 Support",
      icon: <Clock className="h-6 w-6 text-indigo-400" />,
      desc: "Tim support kami siap membantu kapan saja. Dedicated support untuk semua pengguna.",
      gradient: "from-indigo-600/20 via-indigo-500/10 to-purple-600/10",
      iconBg: "bg-indigo-500/20"
    },
  ];

  const highlights = [
    { icon: <Gauge className="h-5 w-5 text-purple-400" />, label: "Lightning Fast", desc: "Proses deploy < 2 menit" },
    { icon: <Shield className="h-5 w-5 text-blue-400" />, label: "Secure", desc: "Audit keamanan terverifikasi" },
    { icon: <Lock className="h-5 w-5 text-green-400" />, label: "Self-Custody", desc: "Kontrol penuh atas aset" },
    { icon: <Infinity className="h-5 w-5 text-pink-400" />, label: "Scalable", desc: "Tanpa batasan jumlah token" },
  ];

  return (
    <section className="min-h-screen py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <Badge className="text-xs font-bold tracking-wider text-purple-400 uppercase bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full mb-4">
            ✨ Fitur Lengkap
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Semua Yang Anda Butuhkan
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Dalam Satu Platform
            </span>
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Dari pembuatan token hingga analitik pasar—kami menyediakan infrastruktur lengkap
            untuk mengelola aset digital Anda di blockchain Solana.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto mb-12 sm:mb-16">
          {highlights.map((item, i) => (
            <Card key={i} className="bg-white/5 border-white/5 hover:border-purple-500/30 transition-all duration-300 text-center">
              <CardContent className="p-3 sm:p-4">
                <div className="flex justify-center mb-1">{item.icon}</div>
                <p className="text-xs sm:text-sm font-semibold text-white">{item.label}</p>
                <p className="text-[10px] sm:text-xs text-muted-foreground">{item.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`
                relative overflow-hidden group transition-all duration-500 
                hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20 
                border-0 bg-gradient-to-br ${feature.gradient}
                backdrop-blur-sm
              `}
            >
              {/* Glass Effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <CardContent className="relative p-5 sm:p-6 z-10">
                <div className="flex items-start gap-4 mb-3">
                  <div className={`
                    inline-flex items-center justify-center rounded-xl h-12 w-12 min-w-12
                    bg-gradient-to-br ${feature.iconBg} to-transparent
                    border border-white/10
                    group-hover:scale-110 group-hover:rotate-[-5deg] 
                    transition-all duration-500
                  `}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all duration-300">
                      {feature.label}
                    </h3>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                  {feature.desc}
                </p>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <Link 
                    href="#" 
                    className="inline-flex items-center gap-1 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors group/link"
                  >
                    Learn More
                    <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 sm:mt-16 text-center">
          <Card className="max-w-3xl mx-auto bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20 border-white/5 backdrop-blur-sm">
            <CardContent className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    Siap Memulai?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Bergabunglah dengan ribuan kreator yang sudah menggunakan platform kami
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button className="rounded-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-lg shadow-purple-500/25">
                    <Link href="/dashboard" className="flex items-center gap-2">
                      Mulai Sekarang
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="rounded-full border-white/10 hover:border-purple-500/50">
                    <Link href="/contact">Hubungi Kami</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}