import { useState } from 'react';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next';
import Link from 'next/link';
import Button from '@/components/button';
import Logo from '@/components/logo';
import { supabase } from '@/utils/supabase-client';
import { useRouter } from 'next/router';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const router = useRouter();

  const handleSignup = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });
    const { error, user } = await supabase.auth.signUp({ email, password },
      {
        redirectTo: router.query.returnUrl ? router.query.returnUrl as string : ''
      });

    // check for existing user with confirmed email
    if (user && user.email_confirmed_at) {
      setMessage({ type: 'error', content: 'You already have an account. Please sign in or reset your password.' });
      setLoading(false);
      return;
    }

    if (error) {
      setMessage({ type: 'error', content: error.message });
      setLoading(false);
      return;
    }

    setMessage({
      type: 'note',
      content: 'Check your email for the confirmation link.'
    });
    setLoading(false);
  };

  return (
    <div className="flex justify-center fill-screen">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <form onSubmit={handleSignup} className="flex flex-col space-y-4">
          <label>
            <input
              className='default-input'
              type='email'
              autoComplete='email'
              required
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
          <label>
            <input
              className='default-input'
              type='password'
              autoComplete='password'
              required
              minLength={8}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
          <Button
            type="submit"
            loading={loading}
            className='uppercase text-center text-sm mt-12 px-12 py-2 font-bold text-white rounded-md bg-gradient-to-r from-primary-500 to-primary-700 disabled:opacity-50'
            disabled={loading || !email.length || !password.length}>
            Sign up
          </Button>
        </form>

        {
          message.content &&
          <div className={`${message.type === 'error' ? 'text-red-300' : 'text-gray-400'} text-center border p-3 my-4`}>
            {message.content}
          </div>
        }

        <span className="my-4 text-center text-sm">
          <span>Do you have an account?</span>
          {` `}
          <Link href="/signin">
            <a className="font-bold hover:underline">
              Sign in
            </a>
          </Link>
        </span>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<{}>> => {
  const { user } = await supabase.auth.api.getUserByCookie(context.req)
  if (user) {
    return {
      redirect: {
        destination: '/account',
        permanent: false,
      }
    }
  }

  return {
    props: {},
  }
}
