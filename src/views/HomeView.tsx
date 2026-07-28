'use client';

import Link from "next/link";
import Image from "next/image";

import WalletConnector from "@/components/WalletConnector";

export default function HomeView() {
	
	const imageOne = [
		"/images/ai/ai1.png",
		"/images/ai/ai2.png",
		"/images/ai/ai3.png",
		"/images/ai/ai4.png",
		"/images/ai/ai5.png",
		//"/images/ai/ai6.png"
	];
	
	const imageTwo = [
		"/images/ai/ai7.png",
		"/images/ai/ai8.png",
		"/images/ai/ai9.png",
		"/images/ai/ai10.png",
		"/images/ai/ai11.png",
		//"/images/ai/ai12.png"
	]
	
	
	return (
		<section className="relative overflow-hidden pb-20 pt-[72px]">
		    <div className="px-6 py-4">
			    <div className="bg-background/80 rounded-2xl">
				    <div className="container">
					    <div className="p-6">
						    <div className="relative grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
							    <div className="bg-primary/10 -z-1 start-0 absolute top-0 w-12 h-12 animate-[spin_10s_linear_infinite] rounded-2xl rounded-br-none rounded-tl-none"/>
								<div className="bg-primary/20 -z-1 end-0 bottom-0 absolute h-14 w-14 animate-pink rounded-full "/>
								
								<div>
								    <span className="bg-gradient-to-r from-purple-500 to-blue-600 text-white font-bold text-sm rounded-md px-3 py-1 uppercase tracking-wider ">CREATE SOLANA TOKEN VErsion Pro</span>
									<h1 className="md:text-5xl/tight my-4 text-4xl max-w-lg text-white font-medium">Now Create solana token to without code</h1>
									<p className="md:text-lg text-muted-foreground">
									    Lounch your solana token, All in one solana token development and deployment
									</p>
									
									<div className="flex items-center gap-[2rem]">
									    <Link href="/dashboard/create-token" className="group-first:mt-10 pe-4 inline-flex items-center justify-center gap-2 rounded-full border-white/10 px-1 text-white bg-purple-500 hover:bg-purple-600 transition-all duration-500">
										    <span className="bg-primary/20 text-primary me-2 flex justify-center items-center rounded-md h-11 w-11 group-hover:bg-white/10"><Iconss/> Create </span>
											
										</Link>
										<WalletConnector/>
									</div>
								</div>
								
								<div className="mx-auto h-[595px] overflow-hidden">
								    <div className="marquee grid grid-cols-2 gap-6">
									    <div className="relative m-auto flex flex-col gap-6 overflow-hidden">
										    <div className="marquee-hero flex flex-shrink-0 flex-col min-h-full items-center justify-around gap-6">
											    {imageOne.map((img, index) => (
													<Image src={img} alt="" key={index} className="aspect-1 rounded-xl h-full w-60 object-cover"/>
												))}
											</div>
											
											<div aria-hidden="true" className="marquee-hero flex flex-shrink-0 flex-col min-h-full items-center justify-around gap-6">
											    {imageTwo.map((img, index) => (
													<Image src={img} alt="" key={index} className="aspect-1 rounded-xl h-full w-60 object-cover"/>
												))}
											</div>
										</div>
										
										<div className="marquee-reverse flex flex-col m-auto gap-6 overflow-hidden">
										    <div className="marquee-hero flex flex-shrink-0 flex-col min-h-full items-center justify-around gap-6">
											    {imageTwo.map((img, index) => (
													<Image src={img} alt="" key={index} className="aspect-1 rounded-xl h-full w-60 object-cover"/>
												))}
											</div>
										    <div aria-hidden="true" className="marquee-hero flex flex-shrink-0 flex-col min-h-full items-center justify-around gap-6">
													{imageOne.map((img, index) => (
													    <Image src={img} alt="" key={index} className="aspect-1 rounded-xl h-full w-60 object-cover"/>
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