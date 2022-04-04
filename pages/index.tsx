import Link from 'next/link';
import Image from 'next/image';
import Pricing from '@/components/pricing';
import { PageSEO } from '@/components/seo';

export default function Home() {
	return (
		<>
			<PageSEO
				title="Home - Grasp"
				description="Grasp is the best online crypto journal your trades and find your edge"
			/>

			{/* Hero section */}
			<section className="py-10 lg:py-24 bg-gradient-to-r from-primary-500 to-primary-700">
				<div className="container flex flex-col-reverse items-center justify-between px-6 mx-auto lg:flex-row">
					<div className="flex-1 text-center lg:text-left">
						<h2 className="mb-4 text-6xl font-bold text-center text-white lg:text-left">
							Online trading journal with analytics for crypto traders
						</h2>
						<h3 className="mb-8 text-2xl text-center text-gray-200 lg:text-left">
							By auto importing all your trades and providing analytics in a
							visually appealing way, we make it easy for you to improve your
							skills as a trader.
						</h3>
						<Link href="/pricing">
							<a className="px-8 py-4 font-bold tracking-wider text-black uppercase bg-white rounded-full shadow-lg">
								Get started
							</a>
						</Link>
					</div>
					<div className="flex items-center justify-center flex-1">
						<Image
							alt="hero image"
							width="521"
							height="450"
							src="/images/hero.png"
							className="p-8 lg:p-0"
						/>
					</div>
				</div>
			</section>

			{/* Solve a problem section */}
			<section className="container px-6 py-10 mx-auto">
				<h2 className="max-w-xl mx-auto text-5xl font-bold text-center">
					Benefits
				</h2>
				<h4 className="mx-auto mb-12 text-center">
					Quickly find what is making you profitable or what is not
				</h4>

				<div className="flex flex-col-reverse items-center mb-16 lg:flex-row">
					<div className="flex-1 text-center lg:text-left">
						<h4 className="mb-3 text-3xl font-bold">Auto Journaling</h4>
						<p className="mb-8 text-gray-600 dark:text-gray-200">
							This is a must if you plan to improve your trading. How are you
							going to keep track of what works and what doesnt? By journaling
							your trades, you are able to study your results and find strengths
							and weaknesses. You might be more successful trading certain
							setups, timeframes, durations, patterns, etc... With the data
							collected from your trades, we help you spot those things so you
							dont have to crunch the numbers yourself.
						</p>
					</div>
					<div className="flex items-center justify-center flex-1">
						<Image
							alt="alt tag for image"
							src="/images/sync.svg"
							height="224"
							width="224"
						/>
					</div>
				</div>

				<div className="flex flex-col items-center mb-16 lg:flex-row">
					<div className="flex items-center justify-center flex-1">
						<Image
							alt="alt tag for image"
							src="/images/laptop.svg"
							height="224"
							width="224"
						/>
					</div>
					<div className="flex-1 text-center lg:text-left">
						<h4 className="mb-3 text-3xl font-bold">Data Visualization</h4>
						<p className="mb-8 text-gray-600 dark:text-gray-200">
							Visually appealing and easy to understand industry leading trade
							analytics created from your own trading results to help you
							quickly analyze your performance and strategies.
						</p>
					</div>
				</div>

				<div className="flex flex-col-reverse items-center mb-16 lg:flex-row">
					<div className="flex-1 text-center lg:text-left">
						<h4 className="mb-3 text-3xl font-bold">Public Profile</h4>
						<p className="mb-8 text-gray-600 dark:text-gray-200">
							Do people question your trades or do they doubt you? Your public
							profile page can be shared to show your performance while hiding
							all of your sensative information.
						</p>
					</div>
					<div className="flex items-center justify-center flex-1">
						<Image
							alt="alt tag for image"
							src="/images/internet.svg"
							height="224"
							width="224"
						/>
					</div>
				</div>

				<div className="flex flex-col items-center mb-16 lg:flex-row">
					<div className="flex items-center justify-center flex-1">
						<Image
							alt="alt tag for image"
							src="/images/laptop.svg"
							height="224"
							width="224"
						/>
					</div>
					<div className="flex-1 text-center lg:text-left">
						<h4 className="mb-3 text-3xl font-bold">
							Multiple Exchange Connection
						</h4>
						<p className="mb-8 text-gray-600 dark:text-gray-200">
							Track your trades from multiple exchanges to give you a birds eye
							view of all your trading accounts
						</p>
					</div>
				</div>
			</section>

			{/* Social proof section */}
			<section className="bg-gray-100">
				<div className="container px-6 py-20 mx-auto">
					<h2 className="mb-8 text-4xl font-bold text-center text-black">
						Testimonials
					</h2>

					<div className="flex flex-wrap">
						<div className="w-full px-2 mb-4 md:w-1/3">
							<div className="py-2 bg-white rounded shadow">
								<div className="flex items-center justify-center mb-4">
									<Image
										alt="reviewer 1"
										src="/images/face-1.jpg"
										className="rounded-full"
										height="64"
										width="64"
									/>
								</div>
								<div>
									<p className="px-6 mb-5 text-base text-gray-800">
										Sed ut perspiciatis unde omnis iste natus error sit
										voluptatem accusantium doloremque laudantium, totam rem
										aperiam, eaque ipsa quae ab illo inventore veritatis et
										quasi architecto beatae vitae dicta sunt explicabo.
									</p>
									<p className="px-6 text-xs text-gray-500 md:text-sm">
										Hannah Fleming
									</p>
								</div>
							</div>
						</div>
						<div className="w-full px-2 mb-4 md:w-1/3">
							<div className="py-2 bg-white rounded shadow">
								<div className="flex items-center justify-center mb-4">
									<Image
										alt="reviewer 2"
										src="/images/face-2.jpg"
										className="rounded-full"
										height="64"
										width="64"
									/>
								</div>
								<div>
									<p className="px-6 mb-5 text-base text-gray-800">
										Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
										odit aut fugit, sed quia consequuntur magni dolores eos qui
										ratione voluptatem sequi nesciunt. Neque porro quisquam est,
										qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
										velit, sed quia non numquam eius modi tempora incidunt ut
										labore et dolore magnam aliquam quaerat voluptatem.
									</p>
									<p className="px-6 text-xs text-gray-500 md:text-sm">
										Jane Doe
									</p>
								</div>
							</div>
						</div>
						<div className="w-full px-2 mb-4 md:w-1/3">
							<div className="py-2 bg-white rounded shadow">
								<div className="flex items-center justify-center mb-4">
									<Image
										alt="reviewer 3"
										src="/images/face-3.jpg"
										className="rounded-full"
										height="64"
										width="64"
									/>
								</div>
								<div>
									<p className="px-6 mb-5 text-base text-gray-800">
										Ut enim ad minima veniam, quis nostrum exercitationem ullam
										corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
										consequatur.
									</p>
									<p className="px-6 text-xs text-gray-500 md:text-sm">
										Dean Dunning
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Pricing / feature comparison section */}
			<section className="py-10">
				<Pricing />
			</section>

			{/* Big call to action */}
			<section className="bg-gradient-to-r from-primary-500 to-primary-700">
				<div className="container px-6 py-20 mx-auto text-center">
					<h2 className="mb-6 text-4xl font-bold text-center text-white">
						Start improving today
					</h2>
					<h3 className="my-4 text-2xl text-white">
						You don't want to miss this opportunity!
					</h3>
					<div className="mt-6">
						<Link href="/pricing">
							<a className="px-8 py-4 font-bold tracking-wider text-black uppercase bg-white rounded-full shadow-lg">
								Get started for free
							</a>
						</Link>
					</div>
				</div>
			</section>

			{/* FAQ section */}
			<section className="py-10 bg-gray-100 dark:bg-gray-900">
				<div className="container px-6 py-20 mx-auto">
					<h2 className="mb-6 text-4xl font-bold text-center">
						Frequently asked questions
					</h2>

					<details className="flex flex-row-reverse px-2 py-3 mt-2 mb-4 text-lg font-medium bg-white rounded-lg cursor-pointer dark:bg-gray-600">
						<summary className="flex-auto px-4">How much does it cost?</summary>
						<div className="px-6 mt-4">
							<p className="pt-4 pb-2 border-t border-gray-300 border-solid">
								For a limited time while our we are in beta, we are offering
								full access to all our tools for free.
							</p>
						</div>
					</details>

					<details className="flex flex-row-reverse px-2 py-3 mt-2 mb-4 text-lg font-medium bg-white rounded-lg cursor-pointer dark:bg-gray-600">
						<summary className="flex-auto px-4">
							Can I use this product without signing up?
						</summary>
						<div className="px-6 mt-4">
							<p className="pt-4 pb-2 border-t border-gray-300 border-solid">
								No. You need to create an account. It's free though!
							</p>
						</div>
					</details>

					<details className="flex flex-row-reverse px-2 py-3 mt-2 mb-4 text-lg font-medium bg-white rounded-lg cursor-pointer dark:bg-gray-600">
						<summary className="flex-auto px-4">Can I a get a refund?</summary>
						<div className="px-6 mt-4">
							<p className="pt-4 pb-2 border-t border-gray-300 border-solid">
								No. Since this is a digital product, the trasaction is final
								since this is a digital product and no refunds will be given.
							</p>
						</div>
					</details>
				</div>
			</section>
		</>
	);
}
