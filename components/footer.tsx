import Link from 'next/link';
import Logo from './logo';

export default function Footer() {
  return (
    <footer className="w-full border-t border-solid border-secondary">
      <div className="mx-auto max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-12 py-12">
        <div className="col-span-1 lg:col-span-2">
          <Link href="/">
            <a className="flex h-12 w-12 my-2 ml-4 sm:ml-4 lg:ml-0">
              <Logo height={48} width={48} />
            </a>
          </Link>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col">
            <li className="pb-4">
              <Link href="/">
                <a className="footer-link">
                  Home
                </a>
              </Link>
            </li>
            <li className="pb-4">
              <Link href="/">
                <a className="footer-link">
                  About
                </a>
              </Link>
            </li>
            <li className="pb-4">
              <Link href="/blog">
                <a className="footer-link">
                  Blog
                </a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <ul className="flex flex-col">
            <li className="pb-4">
              <Link href="/">
                <a className="footer-link">
                  Privacy Policy
                </a>
              </Link>
            </li>
            <li className="pb-4">
              <Link href="/">
                <a className="footer-link">
                  Terms of Use
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="py-6 flex flex-col justify-center items-center border-t border-solid border-secondary">
        <span>Built with <a href='https://shipsaas.com' rel='noopener noreferrer' className='underline font-extrabold'>Ship SaaS starter kit</a></span>
      </div>
    </footer>
  );
}
