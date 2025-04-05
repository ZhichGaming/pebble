import React from 'react';

export default function NavigationBar() {
	return (
		<nav className="w-screen">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<img src="../favicon.ico" alt="" className='h-6 mr-4' />
						<div className="text-xl font-bold text-[#595F39]">Pebble</div>
					</div>
					
				</div>
			</div>
		</nav>
	);
}