"use client";

import {
	MdGeneratingTokens 
} from "react-icons/md";
import {IoIosArrowRoundForward} from "react-icons/io";
import { LuArrowRightFromLine } from "react-icons/lu";
import Link from "next/link";

export default function ToolsView() {
	
	const items = [
		{label: "Create Token", icon: <MdGeneratingTokens/>},
		{label: "Token Metadata", icon: <MdGeneratingTokens/>},
		{label: "Airdrop", icon: <MdGeneratingTokens/>},
		{label: "Send Transaction", icon: <MdGeneratingTokens/>},
		{label: "Buddy Token", icon: <MdGeneratingTokens/>},
		{label: "Top Tokens", icon: <MdGeneratingTokens/>},
		{label: "Solana Explorer", icon: <MdGeneratingTokens/>},
	]
	
	return (
		<section className="py-20">
		    <div className="container">
			    <div className="mb-10 flex items-end justify-between">
				    <div className="mx-auto max-w-2xl text-center">
					    <h2 className="mb-4 text-3xl font-medium capitalize text-white">Solana Powerfull Tools</h2>
						<p className="text-muted-foreground text-sm font-medium">description</p>
					</div>
				</div>
				
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
				    {items.map((item, index) => (
						<div className="bg-background/40 backdrop-blur-3xl rounded-xl" >
						    <div className="p-6">
							    <div className="mb-4 flex items-center gap-4">
								    <div className="inline-flex items-center justify-center rounded-lg h-10 w-10 bg-red-500/20 ">
									    {item.icon}
									</div>
									<h3 className="text-xl text-muted-foreground font-bold">{item.label}</h3>
								</div>
								
								<Link href="text-primary group relative inline-flex items-center gap-2 ">
								    <span className="bg-primary/80 absolute -bottom-0 h-px w-7/12 rounded transition-all duration-500 group-hover:w-full">
									    Pilih dan coba
										<LuArrowRightFromLine className="h-4 w-4" />
									</span>
								</Link>
							</div>
						</div>
					))}
				</div>
				
				<div className="mt-10 flex justify-center">
				    <Link href="#" className="hover:bg-primary bg-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-2 text-white transition-all duration-500 ">
					    More Tools
						<IoIosArrowRoundForward/>
					</Link>
				</div>
			</div>
		</div>
	);
};