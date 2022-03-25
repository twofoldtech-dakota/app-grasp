import { useState } from 'react';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '@/components/button';
import Logo from '@/components/logo';
import { supabase } from '@/utils/supabase-client';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [signUpUsingPassword, setSignUpUsingPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState({ type: '', content: '' });
	const router = useRouter();

	const handleSignin = async (evt) => {
		evt.preventDefault();
		setLoading(true);
		setMessage({ type: '', content: '' });
		const { error } = await supabase.auth.signIn(
			{ email, password },
			{
				redirectTo: window.location.origin,
			}
		);
		if (error) {
			setMessage({ type: 'error', content: error.message });
			setLoading(false);
			return;
		}

		if (!password) {
			setMessage({
				type: 'note',
				content: 'Check your email for the magic link.',
			});
			setLoading(false);
			return;
		}

		router.replace('/');
	};

	return (
		<div className="flex justify-center fill-screen">
			<div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80">
				<div className="flex justify-center mb-8">
					<Logo width={200} />
				</div>
				<div className="flex flex-col space-y-4">
					{!signUpUsingPassword && (
						<form onSubmit={handleSignin} className="flex flex-col space-y-6">
							<label>
								<input
									className="default-input"
									type="email"
									autoComplete="email"
									required
									placeholder="Email"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
							</label>
							<Button
								type="submit"
								loading={loading}
								className="px-12 py-2 mt-12 text-sm font-bold text-center text-white uppercase rounded-md bg-gradient-to-r from-primary-500 to-primary-700 disabled:opacity-50"
								disabled={loading || email.length === 0}
							>
								Send magic link
							</Button>
						</form>
					)}

					{signUpUsingPassword && (
						<form onSubmit={handleSignin} className="flex flex-col space-y-4">
							<label>
								<input
									className="default-input"
									type="email"
									autoComplete="email"
									required
									placeholder="Email"
									onChange={(e) => setEmail(e.target.value)}
									value={email}
								/>
							</label>
							<label>
								<input
									className="default-input"
									type="password"
									autoComplete="password"
									required
									placeholder="Password"
									onChange={(e) => setPassword(e.target.value)}
									value={password}
								/>
							</label>
							<Button
								type="submit"
								loading={loading}
								className="px-12 py-2 mt-12 text-sm font-bold text-center text-white uppercase rounded-md bg-gradient-to-r from-primary-500 to-primary-700 disabled:opacity-50"
								disabled={loading || !password.length || !email.length}
							>
								Sign in
							</Button>
						</form>
					)}

					{message.content && (
						<div
							className={`${
								message.type === 'error' ? 'text-red-300' : 'text-gray-400'
							} text-center border 'border-gray-400' border-solid p-3`}
						>
							{message.content}
						</div>
					)}

					<div className="flex items-center my-6">
						<div className="mr-3 border-t border-gray-300 grow"></div>
						<div>Or</div>
						<div className="ml-3 border-t border-gray-300 grow"></div>
					</div>

					<span className="pt-1 text-sm text-center">
						<a
							href="#"
							className="hover:underline"
							onClick={() => {
								if (signUpUsingPassword) {
									setPassword('');
								}

								setSignUpUsingPassword(!signUpUsingPassword);
								setMessage({ type: '', content: '' });
							}}
						>
							{`Sign in with a ${
								signUpUsingPassword ? 'magic link' : 'password'
							}`}
						</a>
					</span>

					<span className="pt-1 text-sm text-center">
						<span>Don't have an account?</span>
						{` `}
						<Link href="/signup">
							<a className="font-bold hover:underline">Sign up</a>
						</Link>
					</span>

					{signUpUsingPassword && (
						<span className="pt-1 text-sm text-center">
							<Link href="/forgot-password">
								<a className="font-bold hover:underline">Forgot password</a>
							</Link>
						</span>
					)}
				</div>

				<div className="flex items-center my-6">
					<div className="mr-3 border-t border-gray-300 grow"></div>
					<div>Or</div>
					<div className="ml-3 border-t border-gray-300 grow"></div>
				</div>

				<div className="flex flex-col items-center justify-center">
					<Button
						type="button"
						loading={false}
						className="flex items-center justify-center px-12 py-2 my-4 text-sm font-bold text-center text-black uppercase bg-gray-300 rounded-md bg-gradient-to-r disabled:opacity-50"
						disabled={false}
						onClick={async () => {
							const { user, session, error } = await supabase.auth.signIn(
								{ provider: 'google' },
								{
									redirectTo: window.location.origin,
								}
							);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
							className="mr-2"
						>
							<path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
						</svg>
						<span>Sign in with Google</span>
					</Button>

					<Button
						type="button"
						loading={false}
						className="flex items-center justify-center px-12 py-2 my-4 text-sm font-bold text-center text-black uppercase bg-gray-300 rounded-md bg-gradient-to-r disabled:opacity-50"
						disabled={false}
						onClick={async () => {
							const { user, session, error } = await supabase.auth.signIn(
								{ provider: 'github' },
								{
									redirectTo: window.location.origin,
								}
							);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							fill="currentColor"
							viewBox="0 0 16 16"
							className="mr-2"
						>
							<path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
						</svg>
						<span>Sign in with GitHub</span>
					</Button>
				</div>
			</div>
		</div>
	);
}

export const getServerSideProps = async (
	context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{}>> => {
	const { user } = await supabase.auth.api.getUserByCookie(context.req);
	if (user) {
		return {
			redirect: {
				destination: '/account',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};
