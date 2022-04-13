import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';
import { supabase } from '@/utils/supabase-client';
import { Session } from '@supabase/gotrue-js';

interface MobileNavbarProps {
	session: Session | null;
}

export default function MobileNav({ session }: MobileNavbarProps) {
	const router = useRouter();
	const [navShow, setNavShow] = useState(false);
	const onToggleNav = () => {
		setNavShow((status) => {
			if (status) {
				document.body.style.overflow = 'auto';
			} else {
				// Prevent scrolling
				document.body.style.overflow = 'hidden';
			}
			return !status;
		});
	};

	return (
		<div className="lg:hidden flex justify-center items-center">
			<button
				type="button"
				className="w-8 h-8 ml-1 mr-1 rounded"
				onClick={onToggleNav}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					{navShow ? (
						<path
							fillRule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clipRule="evenodd"
						/>
					) : (
						<path
							fillRule="evenodd"
							d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
							clipRule="evenodd"
						/>
					)}
				</svg>
			</button>
			<div
				className={`fixed w-full h-full top-97 right-0 bg-gray-100 dark:bg-gray-900 z-10 ease-in-out duration-300 ${
					navShow ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<nav className="fixed flex flex-col h-full w-full mt-6 px-2">
					<Link href="/">
						<a
							className="px-3 py-2 rounded-lg text-base font-bold mb-2 text-center"
							onClick={onToggleNav}
						>
							Home
						</a>
					</Link>
					<Link href="/pricing">
						<a
							className="px-3 py-2 rounded-lg text-base font-bold mb-2 text-center"
							onClick={onToggleNav}
						>
							Pricing
						</a>
					</Link>
					{session && (
						<>
							<Link href="/trades">
								<a
									className="px-3 py-2 rounded-lg text-base font-bold mb-2 text-center"
									onClick={onToggleNav}
								>
									Trades
								</a>
							</Link>
							<Link href="/account">
								<a
									className="px-3 py-2 rounded-lg text-base font-bold mb-2 text-center"
									onClick={onToggleNav}
								>
									Account
								</a>
							</Link>
							<Link href="/profile">
								<a
									className="px-3 py-2 rounded-lg text-base font-bold mb-2 text-center"
									onClick={onToggleNav}
								>
									Profile
								</a>
							</Link>
						</>
					)}
					<Link href="/blog">
						<a
							className="px-3 py-2 rounded-lg text-base font-bold mb-2 text-center"
							onClick={onToggleNav}
						>
							Blog
						</a>
					</Link>
					{session ? (
						<>
							<button
								className="px-3 py-2 rounded-lg text-base font-bold mb-2 text-center"
								onClick={() => {
									supabase.auth.signOut();
									onToggleNav();
									router.replace('/');
								}}
							>
								Sign out
							</button>
						</>
					) : (
						<Link href="/signin">
							<a
								className="px-3 py-2 rounded-lg text-base font-bold mb-2 text-center"
								onClick={onToggleNav}
							>
								Sign in
							</a>
						</Link>
					)}
				</nav>
			</div>
		</div>
	);
}
