import Link from 'next/link';
import Logo from './logo';

export default function Footer() {
	return (
		<footer className="w-full border-t border-solid border-secondary">
			<div className="grid max-w-6xl grid-cols-1 px-6 py-12 mx-auto lg:grid-cols-12">
				<div className="col-span-1 lg:col-span-2">
					<Link href="/">
						<a className="flex w-12 h-12 my-2 ml-4 sm:ml-4 lg:ml-0">
							<Logo height={48} width={48} />
						</a>
					</Link>
				</div>
				<div className="col-span-1 lg:col-span-2">
					<ul className="flex flex-col">
						<li className="pb-4">
							<Link href="/">
								<a className="footer-link">Home</a>
							</Link>
						</li>
						<li className="pb-4">
							<Link href="/">
								<a className="footer-link">About</a>
							</Link>
						</li>
						<li className="pb-4">
							<Link href="/blog">
								<a className="footer-link">Blog</a>
							</Link>
						</li>
					</ul>
				</div>
				<div className="col-span-1 lg:col-span-2">
					<ul className="flex flex-col">
						<li className="pb-4">
							<Link href="/">
								<a className="footer-link">Privacy Policy</a>
							</Link>
						</li>
						<li className="pb-4">
							<Link href="/">
								<a className="footer-link">Terms of Use</a>
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<div className="flex flex-col items-center justify-center py-6 border-t border-solid border-secondary">
				<span>© 2022 GraspCrypto. All rights reserved.</span>
			</div>
		</footer>
	);
}
