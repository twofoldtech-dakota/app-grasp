import Alert from '@/components/alert';
import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function BaseLayout({ children }) {
	return (
		<>
			<Alert />
			<Navbar />
			<main>{children}</main>
			<Footer />
		</>
	);
}
