import Link from 'next/link';

export default function Alert() {
	return (
		<div className="text-black px-6 py-1 border-0 relative bg-green-300 text-xs text-center">
			<span className="inline-block align-middle">
				Build:{' '}
				<b className="capitalize">
					beta 0.0.1 -{' '}
					<Link href="/pricing">
						<a className="underline hover:no-underline">
							(Free Full access while in beta!)
						</a>
					</Link>
				</b>
			</span>
		</div>
	);
}
