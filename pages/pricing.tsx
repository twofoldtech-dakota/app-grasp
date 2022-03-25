import PricingComponent from '@/components/pricing';
import { PageSEO } from '@/components/seo';

export default function Pricing() {
	return (
		<>
			<PageSEO
				title="Pricing - Grasp"
				description="Grasp is the best online crypto journal your trades and find your edge"
			/>

			<section className="py-10">
				<PricingComponent />
			</section>
		</>
	);
}
