"use client";

import {
	MdGeneratingTokens,
	MdToken,
	MdOutlineSendToMobile,
	MdRocketLaunch,
	MdGroup,
	MdTrendingUp,
	MdExplore,
} from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LuArrowRightFromLine } from "react-icons/lu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ToolsView() {
	
	const items = [
		{label: "Buat Token", icon: <MdGeneratingTokens className="text-purple-400" />, desc: "Ciptakan aset digital Anda sendiri di blockchain Solana. Proses cepat tanpa hambatan teknis."},
		{label: "Metadata Token", icon: <MdToken className="text-blue-400" />, desc: "Kelola informasi lengkap token Anda—nama, simbol, deskripsi, dan gambar—dalam satu dashboard."},
		{label: "Airdrop", icon: <MdRocketLaunch className="text-green-400" />, desc: "Distribusikan token ke ribuan wallet sekaligus. Bangun komunitas dengan cara yang efisien."},
		{label: "Kirim Transaksi", icon: <MdOutlineSendToMobile className="text-yellow-400" />, desc: "Transfer token antar wallet dalam hitungan detik. Biaya rendah, kecepatan tinggi, tanpa perantara."},
		{label: "Token Partner", icon: <MdGroup className="text-pink-400" />, desc: "Kelola token kolaborasi dengan mitra bisnis. Kontrol penuh atas distribusi dan akses."},
		{label: "Top Token", icon: <MdTrendingUp className="text-orange-400" />, desc: "Pantau token terpopuler di ekosistem Solana. Data real-time untuk keputusan investasi Anda."},
		{label: "Solana Explorer", icon: <MdExplore className="text-cyan-400" />, desc: "Telusuri setiap transaksi, block, dan wallet di blockchain Solana. Transparansi penuh."},
	]
	
	return (
		<section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
		    {/* Background Decoration */}
		    <div className="absolute inset-0 -z-10">
		        <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 lg:w-96 h-64 sm:h-80 lg:h-96 bg-purple-600/10 rounded-full blur-3xl" />
		        <div className="absolute bottom-1/4 right-1/4 w-56 sm:w-72 lg:w-80 h-56 sm:h-72 lg:h-80 bg-blue-600/10 rounded-full blur-3xl" />
		    </div>
		    
		    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
			    <div className="mb-10 sm:mb-12 lg:mb-16 text-center">
			        <Badge className="text-[10px] sm:text-xs font-bold tracking-wider text-purple-400 uppercase bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4">
			            Ekosystem Lengkap
			        </Badge>
			        <h2 className="mb-3 sm:mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
			            Bangun dan Kelola <br className="hidden sm:block" />
			            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
			                Assets Digital Anda
			            </span>
			        </h2>
					<p className="text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-4">
					    Kami menyediakan infrastruktur yang Anda butuhkan untuk menciptakan, mengelola, dan mendistribusikan token di blockchain Solana. 
					    Bebas dari kerumitan teknis, tanpa mengorbankan kontrol dan keamanan.
					</p>
					
					{/* Stats - Responsive Grid */}
					<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto mt-6 sm:mt-8">
					    <Card className="text-center bg-white/5 border-white/5 hover:border-purple-500/30 transition-all duration-300">
					        <CardContent className="p-3 sm:p-4">
						        <p className="text-xl sm:text-2xl font-bold text-white">7+</p>
						        <p className="text-[10px] sm:text-xs text-muted-foreground">Alat Terintegrasi</p>
					        </CardContent>
					    </Card>
					    <Card className="text-center bg-white/5 border-white/5 hover:border-purple-500/30 transition-all duration-300">
					        <CardContent className="p-3 sm:p-4">
						        <p className="text-xl sm:text-2xl font-bold text-white">&lt; 2m</p>
						        <p className="text-[10px] sm:text-xs text-muted-foreground">Deploy Token</p>
					        </CardContent>
					    </Card>
					    <Card className="text-center bg-white/5 border-white/5 hover:border-purple-500/30 transition-all duration-300">
					        <CardContent className="p-3 sm:p-4">
						        <p className="text-xl sm:text-2xl font-bold text-white">100%</p>
						        <p className="text-[10px] sm:text-xs text-muted-foreground">Kontrol Penuh</p>
					        </CardContent>
					    </Card>
					    <Card className="text-center bg-white/5 border-white/5 hover:border-purple-500/30 transition-all duration-300">
					        <CardContent className="p-3 sm:p-4">
						        <p className="text-xl sm:text-2xl font-bold text-white">24/7</p>
						        <p className="text-[10px] sm:text-xs text-muted-foreground">Akses Tak Terbatas</p>
					        </CardContent>
					    </Card>
					</div>
				</div>
				
				{/* Grid - Responsive */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
				    {items.map((item, index) => (
						<Card key={index} className="bg-background/40 backdrop-blur-xl border-white/5 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 group overflow-hidden">
						    <CardContent className="p-4 sm:p-5 lg:p-6">
							    <div className="mb-3 sm:mb-4 flex items-start gap-3 sm:gap-4">
								    <div className="inline-flex items-center justify-center rounded-xl h-10 w-10 sm:h-12 sm:w-12 min-w-10 sm:min-w-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/5 group-hover:scale-110 group-hover:border-purple-500/30 transition-all duration-300">
									    <span className="text-lg sm:text-xl">{item.icon}</span>
									</div>
									<div className="min-w-0 flex-1">
									    <h3 className="text-sm sm:text-base text-white font-semibold truncate">{item.label}</h3>
									    <p className="text-[9px] sm:text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
									        {index + 1}/7 Tools
									    </p>
									</div>
								</div>
								
								<p className="text-muted-foreground text-xs sm:text-sm leading-relaxed min-h-[48px] sm:min-h-[60px]">
								    {item.desc}
								</p>
								
								<Link href="#" className="text-primary group/link relative inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors mt-3 sm:mt-4">
								    <span>Gunakan Sekarang</span>
									<LuArrowRightFromLine className="h-3 w-3 sm:h-4 sm:w-4 group-hover/link:translate-x-1 transition-transform" />
									<span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-500 group-hover/link:w-full"></span>
								</Link>
							</CardContent>
						</Card>
					))}
				</div>
				
				{/* CTA Buttons - Responsive */}
				<div className="mt-10 sm:mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
				    <Button className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3.5 text-sm sm:text-base bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 w-full sm:w-auto min-w-[160px] sm:min-w-[180px] h-auto">
					    <Link href="#" className="flex items-center gap-2">
					        Lihat Semua Alat
						    <IoIosArrowRoundForward className="text-lg sm:text-xl" />
					    </Link>
				    </Button>
				    <Button  variant="outline" className="rounded-full px-6 sm:px-8 py-2.5 sm:py-3.5 text-sm sm:text-base border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 w-full sm:w-auto min-w-[160px] sm:min-w-[180px] h-auto">
					    <Link href="#" className="flex items-center gap-2">
					        Mulai Sekarang
						    <IoIosArrowRoundForward className="text-lg sm:text-xl" />
					    </Link>
				    </Button>
				</div>
				
				{/* Trust Badge - Responsive */}
				<div className="mt-10 sm:mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] sm:text-xs text-muted-foreground">
				    <span className="flex items-center gap-2">
				        <span className="h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0"></span>
				        Audit Terverifikasi
				    </span>
				    <span className="flex items-center gap-2">
				        <span className="h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0"></span>
				        Open Source
				    </span>
				    <span className="flex items-center gap-2">
				        <span className="h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0"></span>
				        Komunitas 10K+
				    </span>
				    <span className="flex items-center gap-2">
				        <span className="h-1.5 w-1.5 rounded-full bg-green-400 flex-shrink-0"></span>
				        Dukungan 24/7
				    </span>
				</div>
			</div>
		</section>
	);
};