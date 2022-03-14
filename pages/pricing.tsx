import PricingComponent from '@/components/pricing';
import { PageSEO } from '@/components/seo';

export default function Pricing() {
  return (
    <>
      <PageSEO
        title='Pricing | Ship SaaS Demo'
        description='Pricing page to build your SaaS.'
      />

      <section className="py-10">
        <PricingComponent />
      </section>
    </>
  );
}
