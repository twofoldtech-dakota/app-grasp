import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { supabase } from '@/utils/supabase-client';
import { useSession, useUserDetails } from '@/utils/user-context';
import Logo from './logo';
import MobileNav from './mobile-navbar';
import ThemeSwitch from './theme-switch';

export default function Navbar() {
	const userDetails = useUserDetails();
	const session = useSession();
	const router = useRouter();
	return (
		<nav className="sticky top-0 z-10 bg-white border-b border-black border-solid dark:bg-gray-900 dark:border-white">
			<div className="container flex items-center justify-between px-6 py-2 mx-auto">
				<Link href="/">
					<a>
						<Logo height={48} width={150} />
					</a>
				</Link>
				<div className="hidden lg:block">
					<ul className="inline-flex">
						<li>
							<Link href="/pricing">
								<a className="header-link">Pricing</a>
							</Link>
						</li>
						<li>
							<Link href="/blog">
								<a className="header-link">Blog</a>
							</Link>
						</li>
					</ul>
				</div>

				<div className="justify-end flex-1 hidden lg:flex">
					{session ? (
						<div className="inline-flex">
							<div className="relative cursor-pointer group">
								{userDetails?.avatar_url ? (
									<img
										alt="Avatar"
										src={userDetails.avatar_url}
										className="w-10 h-10 rounded-full"
									/>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-10 h-10"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
								)}
								{
									<div className="absolute top-0 z-10 hidden p-2 mt-10 translate-x-1/2 bg-gray-200 rounded-lg shadow-lg right-1/2 group-hover:block">
										<ul>
											<li className="py-2 text-center hover:bg-gray-300">
												<Link href="/account">
													<a className="header-dropdown-link">Account</a>
												</Link>
											</li>
											<li className="py-2 text-center hover:bg-gray-300">
												<Link href="/profile">
													<a className="header-dropdown-link">Profile</a>
												</Link>
											</li>
											<li className="py-2 text-center hover:bg-gray-300">
												<a
													className="header-dropdown-link whitespace-nowrap"
													href="#"
													onClick={() => {
														supabase.auth.signOut();
														router.replace('/');
													}}
												>
													Sign out
												</a>
											</li>
										</ul>
									</div>
								}
							</div>
						</div>
					) : (
						<Link href="/signin">
							<a className="header-link">Sign in</a>
						</Link>
					)}
				</div>
				<div className="flex">
					<ThemeSwitch />
					<MobileNav session={session} />
				</div>
			</div>
		</nav>
	);
}
