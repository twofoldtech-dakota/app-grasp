import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '@/components/button';
import Logo from '@/components/logo';
import { supabase } from '@/utils/supabase-client';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });
  const router = useRouter();

  const handleResetPassword = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    setMessage({ type: '', content: '' });

    if (password && passwordConfirmation && password === passwordConfirmation) {
      const session = supabase.auth.session();
      await supabase.auth.api.updateUser(session.access_token, {
        password: password,
      });
      await supabase.auth.signOut();
      router.replace('/signin');
    }
  }

  return (
    <div className="flex justify-center fill-screen">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="flex flex-col space-y-4">
          <form onSubmit={handleResetPassword} className="flex flex-col space-y-6">
            <label>
              <input
                className='default-input'
                type='password'
                autoComplete='password'
                required
                placeholder="New password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </label>

            <label>
              <input
                className='default-input'
                type='password'
                required
                placeholder="Confirm new password"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                value={passwordConfirmation}
              />
            </label>

            <Button
              type="submit"
              loading={loading}
              className='uppercase text-center text-sm mt-12 px-12 py-2 font-bold text-white rounded-md bg-gradient-to-r from-primary-500 to-primary-700 disabled:opacity-50'
              disabled={loading || password.length === 0 || passwordConfirmation.length === 0}>
              Update password
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
