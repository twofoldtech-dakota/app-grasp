import { PageSEO } from '@/components/seo';

export default function About() {
	return (
		<>
			<PageSEO
				title="About - Grasp"
				description="Grasp is the best online crypto journal your trades and find your edge"
			/>

			<section className="py-10">
				<div className="flex flex-col items-center mb-6">
					<h2 className="mb-6 text-4xl font-bold text-center">About</h2>
				</div>
			</section>
		</>
	);
}
