import { useState } from 'react';
import Button from '@/components/button';
import Logo from '@/components/logo';
import { supabase } from '@/utils/supabase-client';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleForgotPassword = async (evt) => {
    evt.preventDefault();
    setLoading(true)
    setMessage({ type: '', content: '' })
    const { error } = await supabase.auth.api.resetPasswordForEmail(email, {
      redirectTo: 'reset-password',
    });

    if (error) {
      setMessage({ type: 'error', content: error.message });
      setLoading(false);
      return;
    }

    setMessage({
      type: 'note',
      content: 'Check your email for the password reset link.'
    });
    setLoading(false);
    return;
  }

  return (
    <div className="flex justify-center fill-screen">
      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        <div className="flex flex-col space-y-4">
          <form onSubmit={handleForgotPassword} className="flex flex-col space-y-6">
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
            <Button
              type="submit"
              loading={loading}
              className='uppercase text-center text-sm mt-12 px-12 py-2 font-bold text-white rounded-md bg-gradient-to-r from-primary-500 to-primary-700 disabled:opacity-50'
              disabled={loading || email.length === 0}>
              Send password reset link
            </Button>
          </form>

          {
            message.content &&
            <div className={`${message.type === 'error' ? 'text-red-300' : 'text-gray-400'} text-center border 'border-gray-400' border-solid p-3`}>
              {message.content}
            </div>
          }

        </div>
      </div>
    </div>
  );
}
