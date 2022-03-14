import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function BaseLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
