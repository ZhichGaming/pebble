import { signup } from '@/lib/login/login';
import React from 'react';

export default function SignupPage() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-[#E4E4DE]">
			<div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
				<h2 className="text-2xl font-bold text-center text-gray-800">Sign Up</h2>
				<form className="space-y-4">
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-gray-700">
							Name
						</label>
						<input
							type="text"
							id="name"
							className="w-full px-4 py-2 mt-1 border rounded-md"
							placeholder="Enter your name"
						/>
					</div>
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							id="email"
							className="w-full px-4 py-2 mt-1 border rounded-md"
							placeholder="Enter your email"
						/>
					</div>
					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							id="password"
							className="w-full px-4 py-2 mt-1 border rounded-md"
							placeholder="Enter your password"
						/>
					</div>
					<button
						type="submit"
						className="w-full px-4 py-2 text-white bg-[#595F39] rounded-md cursor-pointer"
						formAction={signup}
					>
						Sign Up
					</button>
				</form>
				<p className="text-sm text-center text-gray-600">
					Already have an account?{' '}
					<a href="/login" className="text-[#595F39] hover:underline">
						Log in
					</a>
				</p>
			</div>
		</div>
	);
};
