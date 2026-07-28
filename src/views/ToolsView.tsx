"use client";

import {
	MdGeneratingTokens,
	MdToken,
	MdOutlineSendToMobile,
	MdRocketLaunch,
	MdGroup,
	MdTrendingUp,
	MdExplore,
	MdAnalytics,
	MdSecurity,
	MdSpeed
} from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { LuArrowRightFromLine } from "react-icons/lu";
import Link from "next/link";

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
		<section className="py-24 relative overflow-hidden">
		    {/* Background Decoration */}
		    <div className="absolute inset-0 -z-10">
		        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
		        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
		    </div>
		    
		    <div className="container">
			    <div className="mb-16 text-center">
			        <span className="inline-block text-xs font-bold tracking-wider text-purple-400 uppercase bg-purple-500/10 px-4 py-1.5 rounded-full mb-4 border border-purple-500/20">
			            Ekosistem Lengkap
			        </span>
			        <h2 className="mb-4 text-4xl md:text-5xl font-bold text-white">
			            Bangun dan Kelola <br />
			            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
			                Aset Digital Anda
			            </span>
			        </h2>
					<p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
					    Kami menyediakan infrastruktur yang Anda butuhkan untuk menciptakan, mengelola, dan mendistribusikan token di blockchain Solana. 
					    Bebas dari kerumitan teknis, tanpa mengorbankan kontrol dan keamanan.
					</p>
					
					{/* Stats */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mt-8">
					    <div className="text-center">
					        <p className="text-2xl font-bold text-white">7+</p>
					        <p className="text-xs text-muted-foreground">Alat Terintegrasi</p>
					    </div>
					    <div className="text-center">
					        <p className="text-2xl font-bold text-white">&lt; 2m</p>
					        <p className="text-xs text-muted-foreground">Deploy Token</p>
					    </div>
					    <div className="text-center">
					        <p className="text-2xl font-bold text-white">100%</p>
					        <p className="text-xs text-muted-foreground">Kontrol Penuh</p>
					    </div>
					    <div className="text-center">
					        <p className="text-2xl font-bold text-white">24/7</p>
					        <p className="text-xs text-muted-foreground">Akses Tak Terbatas</p>
					    </div>
					</div>
				</div>
				
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
				    {items.map((item, index) => (
						<div key={index} className="bg-background/40 backdrop-blur-xl border border-white/5 rounded-xl hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5 group">
						    <div className="p-6">
							    <div className="mb-4 flex items-start gap-4">
								    <div className="inline-flex items-center justify-center rounded-xl h-12 w-12 min-w-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-white/5 group-hover:scale-110 group-hover:border-purple-500/30 transition-all duration-300">
									    <span className="text-xl">{item.icon}</span>
									</div>
									<div>
									    <h3 className="text-base text-white font-semibold">{item.label}</h3>
									    <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
									        {index + 1}/7 Tools
									    </p>
									</div>
								</div>
								
								<p className="text-muted-foreground text-sm leading-relaxed min-h-[60px]">
								    {item.desc}
								</p>
								
								<Link href="#" className="text-primary group/link relative inline-flex items-center gap-2 text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors mt-4">
								    <span>Gunakan Sekarang</span>
									<LuArrowRightFromLine className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
									<span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-500 group-hover/link:w-full"></span>
								</Link>
							</div>
						</div>
					))}
				</div>
				
				<div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
				    <Link href="#" className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-white font-medium bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 min-w-[180px]">
					    Lihat Semua Alat
						<IoIosArrowRoundForward className="text-xl group-hover:translate-x-1 transition-transform" />
					</Link>
				    <Link href="#" className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-white font-medium border border-white/10 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all duration-300 min-w-[180px]">
					    Mulai Sekarang
						<IoIosArrowRoundForward className="text-xl group-hover:translate-x-1 transition-transform" />
					</Link>
				</div>
				
				{/* Trust Badge */}
				<div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
				    <span className="flex items-center gap-2">
				        <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
				        Audit Terverifikasi
				    </span>
				    <span className="flex items-center gap-2">
				        <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
				        Open Source
				    </span>
				    <span className="flex items-center gap-2">
				        <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
				        Komunitas 10K+
				    </span>
				    <span className="flex items-center gap-2">
				        <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
				        Dukungan 24/7
				    </span>
				</div>
			</div>
		</section>
	);
};