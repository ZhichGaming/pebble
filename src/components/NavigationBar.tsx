import Link from 'next/link';
import React from 'react';
import "@/components/globals.css";


export default function NavigationBar() {
	return (
		<nav className="fixed w-screen bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<img src="../favicon.ico" alt="" className='h-6 mr-4' />
						<div className="text-xl font-bold text-[#595F39]">Pebble</div>
					</div>
				<div>
					<Link className="border-2 border-[#595F39] rounded-lg bg-[#595F39] text-[#E4E4DE] py-1.5 px-3 mx-2" href="./login">Login</Link>
					<Link className="border-2 border-[#595F39] rounded-lg py-1.5 px-3 mx-2" href="./signup">Sign up</Link>
				</div>
				</div>
			</div>
		</nav>
	);
}