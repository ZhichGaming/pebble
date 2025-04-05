"use client";

import Link from 'next/link';
import React, { useEffect } from 'react';
import "@/components/globals.css";
import { getUser, logout } from '@/lib/account/actions';
import { ClientUser } from '@/lib/mongodb/schema';
import { deleteSession } from '@/lib/mongodb/session';


export default function NavigationBar() {
	const [user, setUser] = React.useState<ClientUser | null>(null);

	useEffect(() => {
		async function checkUser() {
			setUser(await getUser());
			console.log(await getUser());
		}

		checkUser();
	}, []);

	return (
		<nav className="fixed w-screen bg-background">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<img src="../favicon.ico" alt="" className='h-6 mr-4' />
						<div className="text-xl font-bold text-[#595F39]">Pebble</div>
					</div>
					{user?.identity ? <div>
						<p>Hey, {user.identity?.username}</p>
						<button className="border-2 border-[#595F39] rounded-lg bg-[#595F39] text-[#E4E4DE] py-1.5 px-3 mx-2" onClick={logout}>Logout</button>
					</div>:
					<div >
						<Link className="border-2 border-[#595F39] rounded-lg bg-[#595F39] text-[#E4E4DE] py-1.5 px-3 mx-2" href="./login">Login</Link>
						<Link className="border-2 border-[#595F39] rounded-lg py-1.5 px-3 mx-2" href="./signup">Sign up</Link>
					</div>
					}
					
				</div>
			</div>
		</nav>
	);
}