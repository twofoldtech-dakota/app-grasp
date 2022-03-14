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
    <nav className='sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-black dark:border-white border-solid'>
      <div className="container mx-auto px-6 py-2 flex justify-between items-center">
        <Link href="/">
          <a>
            <Logo height={48} width={48} />
          </a>
        </Link>
        <div className="hidden lg:block">
          <ul className='inline-flex'>
            <li>
              <Link href="/pricing">
                <a className='header-link'>Pricing</a>
              </Link>
            </li>
            <li>
              <Link href='/blog'>
                <a className='header-link'>Blog</a>
              </Link>
            </li>
          </ul>
        </div>

        <div className="hidden lg:flex flex-1 justify-end">
          {
            session ?
              <div className='inline-flex'>
                <div className='relative group cursor-pointer'>
                  {
                    userDetails?.avatar_url ?
                      <img
                        alt='Avatar'
                        src={userDetails.avatar_url}
                        className='h-10 w-10 rounded-full'
                      />
                      :
                      <svg xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                  }
                  {
                    <div className='absolute right-1/2 translate-x-1/2 top-0 mt-10 p-2 rounded-lg shadow-lg bg-gray-200 z-10 hidden group-hover:block'>
                      <ul>
                        <li className='py-2 text-center hover:bg-gray-300'>
                          <Link href="/account">
                            <a className='header-dropdown-link'>Account</a>
                          </Link>
                        </li>
                        <li className='py-2 text-center hover:bg-gray-300'>
                          <Link href='/profile'>
                            <a className='header-dropdown-link'>Profile</a>
                          </Link>
                        </li>
                        <li className='py-2 text-center hover:bg-gray-300'>
                          <a
                            className='header-dropdown-link whitespace-nowrap'
                            href='#'
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
              :
              <Link href="/signin">
                <a className='header-link'>Sign in</a>
              </Link>
          }
        </div>
        <div className='flex'>
          <ThemeSwitch />
          <MobileNav session={session} />
        </div>
      </div>
    </nav>
  );
}
