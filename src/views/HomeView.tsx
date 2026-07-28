'use client';

import Link from "next/link";
import Image from "next/image";
import { Rocket, Zap, Shield, Coins, Award, Users, Globe, Clock } from "lucide-react";
import WalletConnector from "@/components/WalletConnector";

export default function HomeView() {
	
	const imageFiles = [
		"ai1.png",
		"ai2.png",
		"ai3.png",
		"ai4.png",
		"ai5.png",
		"ai6.png",
		"ai7.png",
		"ai8.png",
		"ai9.png",
		"ai10.png",
		"ai11.png",
		"ai12.png",
	];
	
	const midPoint = Math.ceil(imageFiles.length / 2);
	const imageOne = imageFiles.slice(0, midPoint);
	const imageTwo = imageFiles.slice(midPoint);
	
	return (
		<section className="relative overflow-hidden pb-20 pt-[72px] min-h-screen">
		    {/* Background Effects */}
		    <div className="absolute inset-0 -z-10">
		        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
		        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl" />
		        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
		    </div>
		    
		    <div className="px-6 py-4">
			    <div className="bg-background/40 backdrop-blur-xl border border-white/5 rounded-2xl shadow-2xl">
				    <div className="container">
					    <div className="p-6 lg:p-10">
						    <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
							    {/* Decorative Elements */}
							    <div className="bg-purple-500/10 -z-1 start-0 absolute top-0 w-12 h-12 animate-[spin_10s_linear_infinite] rounded-2xl rounded-br-none rounded-tl-none border border-purple-500/20"/>
								<div className="bg-blue-500/20 -z-1 end-0 bottom-0 absolute h-14 w-14 animate-pulse rounded-full blur-sm"/>
								
								{/* Left Content */}
								<div className="space-y-6">
								    <span className="inline-block bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold text-xs rounded-md px-4 py-1.5 uppercase tracking-wider border border-white/10">
								        Platform Token Solana #1
								    </span>
								    
								    <h1 className="md:text-5xl/tight text-4xl text-white font-bold leading-tight">
								        Ciptakan dan Kelola <br />
								        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
								            Token Solana
								        </span> <br />
								        Tanpa Perlu Coding
								    </h1>
								    
								    <p className="md:text-lg text-muted-foreground max-w-md leading-relaxed">
								        Kebebasan finansial dimulai dari sini. Luncurkan token Anda di blockchain Solana—cepat, aman, dan tanpa hambatan teknis. 
								        Kami memberi Anda kendali penuh atas aset digital Anda, tanpa perantara, tanpa batasan.
								    </p>
								    
								    {/* Feature Highlights */}
								    <div className="grid grid-cols-2 gap-3 pt-2">
								        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 rounded-lg px-3 py-2 border border-white/5">
								            <Zap className="h-4 w-4 text-purple-400" />
								            <span>Deploy <span className="text-white font-medium">&lt; 2 menit</span></span>
								        </div>
								        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 rounded-lg px-3 py-2 border border-white/5">
								            <Shield className="h-4 w-4 text-blue-400" />
								            <span>Audit <span className="text-white font-medium">Terverifikasi</span></span>
								        </div>
								        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 rounded-lg px-3 py-2 border border-white/5">
								            <Coins className="h-4 w-4 text-purple-400" />
								            <span>Biaya <span className="text-white font-medium">Transparan</span></span>
								        </div>
								        <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/5 rounded-lg px-3 py-2 border border-white/5">
								            <Rocket className="h-4 w-4 text-blue-400" />
								            <span>Skalabel <span className="text-white font-medium">Tanpa Batas</span></span>
								        </div>
								    </div>
								    
								    {/* Additional Trust Indicators */}
								    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground pt-1">
								        <span className="flex items-center gap-1.5">
								            <Award className="h-3.5 w-3.5 text-green-400" />
								            <span>10.000+ Token Tercipta</span>
								        </span>
								        <span className="flex items-center gap-1.5">
								            <Users className="h-3.5 w-3.5 text-green-400" />
								            <span>Komunitas 50K+</span>
								        </span>
								        <span className="flex items-center gap-1.5">
								            <Globe className="h-3.5 w-3.5 text-green-400" />
								            <span>Global Access</span>
								        </span>
								        <span className="flex items-center gap-1.5">
								            <Clock className="h-3.5 w-3.5 text-green-400" />
								            <span>Support 24/7</span>
								        </span>
								    </div>
								    
								    {/* Action Buttons */}
								    <div className="flex flex-wrap items-center gap-4 pt-2">
									    <Link 
									        href="/dashboard/create-token" 
									        className="group inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-white font-medium bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
									    >
									        <Rocket className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
									        Buat Token Sekarang
									    </Link>
									    <WalletConnector />
									</div>
									
									{/* Bottom text */}
									<p className="text-[11px] text-muted-foreground/60">
									    Gratis memulai. Tanpa kartu kredit. Kelola sendiri aset Anda.
									</p>
								</div>
								
								{/* Right Content - Image Marquee */}
								<div className="mx-auto h-[595px] overflow-hidden w-full max-w-[500px]">
								    <div className="grid grid-cols-2 gap-4 h-full">
									    {/* Column 1 - Bergerak ke Atas */}
									    <div className="relative flex flex-col gap-4 overflow-hidden">
									        <div className="flex flex-col gap-4 marquee-up">
										        {[...imageOne, ...imageOne, ...imageOne].map((filename, index) => (
											        <div key={`col1-${index}`} className="flex-shrink-0">
												        <Image 
													        src={`/images/ai/${filename}`}
													        alt={`Token preview ${index + 1}`} 
													        className="rounded-xl w-full aspect-square object-cover border border-white/5 hover:scale-105 hover:border-purple-500/30 transition-all duration-500"
													        width={200} 
													        height={200}
												        />
											        </div>
										        ))}
									        </div>
								        </div>
								        
									    {/* Column 2 - Bergerak ke Bawah */}
									    <div className="relative flex flex-col gap-4 overflow-hidden">
									        <div className="flex flex-col gap-4 marquee-down">
										        {[...imageTwo, ...imageTwo, ...imageTwo].map((filename, index) => (
											        <div key={`col2-${index}`} className="flex-shrink-0">
												        <Image 
													        src={`/images/ai/${filename}`}
													        alt={`Token preview ${index + 1}`} 
													        className="rounded-xl w-full aspect-square object-cover border border-white/5 hover:scale-105 hover:border-purple-500/30 transition-all duration-500"
													        width={200} 
													        height={200}
												        />
											        </div>
										        ))}
									        </div>
								        </div>
								    </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}