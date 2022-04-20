import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import ProtectedRoute from '@/utils/protected-route';
import { useState } from 'react';
import Button from '@/components/button';
import { supabase } from '@/utils/supabase-client';
import { supabaseAdmin } from '@/utils/supabase-admin-client';
import { UserDetails } from '@/types/user-details';
import ExchangeList from '@/components/exchange/exchange-list';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
import { FilePondFile } from 'filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Import FilePond plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

// Register the plugins
registerPlugin(
	FilePondPluginFileValidateType,
	FilePondPluginImageExifOrientation,
	FilePondPluginImagePreview
);

const supportedImageTypes = [
	{ mimeType: 'image/gif', extension: '.gif' },
	{ mimeType: 'image/jpeg', extension: '.jpg' },
	{ mimeType: 'image/png', extension: '.png' },
	{ mimeType: 'image/svg+xml', extension: '.svg' },
	{ mimeType: 'image/webp', extension: '.webp' },
];

interface ProfileProps {
	userDetails: UserDetails;
}

export default function Profile({ userDetails }: ProfileProps) {
	const initialAvatarUrl = userDetails?.avatar_url;
	const [fullName, setFullName] = useState(userDetails?.full_name ?? '');
	const [files, setFiles] = useState<unknown[]>([
		userDetails?.avatar_url ?? '',
	]);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState({ type: '', content: '' });

	const handleUserDetailsSave = async (evt) => {
		evt.preventDefault();
		setLoading(true);
		let publicUrl = initialAvatarUrl;
		if (files.length > 0) {
			const file = (files[0] as FilePondFile).file;
			const fileName = Buffer.from(
				userDetails.id.replaceAll('-', ''),
				'base64'
			).toString('base64');
			const filePath = `public/${fileName}${
				supportedImageTypes.find((t) => t.mimeType === file.type)?.extension
			}`;
			const { data, error: uploadError } = await supabase.storage
				.from('avatars')
				.upload(filePath, file, { upsert: true });

			if (!uploadError) {
				publicUrl = supabase.storage
					.from('avatars')
					.getPublicUrl(filePath).publicURL;
			}
		}

		const { error: saveError } = await supabase
			.from('user_details')
			.update({
				full_name: fullName,
				avatar_url: publicUrl,
			})
			.eq('id', userDetails.id);

		setLoading(false);
		if (saveError) {
			setMessage({
				type: 'error',
				content: 'An error occurred while saving your details.',
			});
		} else {
			setMessage({ type: 'note', content: 'Details saved successfully.' });
		}
	};

	return (
		<section className="mb-32">
			<div className="max-w-6xl px-4 pt-8 pb-8 mx-auto sm:pt-24 sm:px-6 lg:px-8">
				<div className="sm:flex sm:flex-col sm:align-center">
					<h2 className="text-4xl font-extrabold text-center">Profile</h2>
					<p className="max-w-2xl m-auto mt-4 text-xl text-center sm:text-2xl">
						Update your details
					</p>
				</div>
			</div>

			<div className="p-4">
				<div className="w-full max-w-3xl m-auto my-4 border rounded-md border-secondary">
					<div className="px-5 py-4">
						<form
							onSubmit={handleUserDetailsSave}
							className="flex flex-col items-center space-y-4"
						>
							<div className="mx-auto">
								<FilePond
									className="w-32 h-32"
									allowImagePreview
									files={files}
									acceptedFileTypes={supportedImageTypes.map((t) => t.mimeType)}
									imagePreviewMaxFileSize="2MB"
									onupdatefiles={(files) => setFiles(files)}
									name="avatarUrl"
									labelIdle='Drag & drop your image or <span class="filepond--label-action">browse</span>'
									imagePreviewHeight={100}
									stylePanelLayout="compact circle"
									styleLoadIndicatorPosition="center bottom"
									styleButtonRemoveItemPosition="center bottom"
								/>
							</div>

							<label>
								<input
									className="default-input"
									type="text"
									autoComplete="Name"
									required
									placeholder="Full name"
									onChange={(e) => setFullName(e.target.value)}
									value={fullName}
								/>
							</label>
							<Button
								type="submit"
								loading={loading}
								className="px-12 py-2 mt-12 text-sm font-bold text-center text-white uppercase rounded-md bg-gradient-to-r from-primary-500 to-primary-700 disabled:opacity-50"
								disabled={loading}
							>
								Save
							</Button>
						</form>

						{message.content && (
							<div
								className={`${
									message.type === 'error' ? 'text-red-300' : 'text-gray-400'
								} text-center border 'border-gray-400' border-solid mt-4 p-3`}
							>
								{message.content}
							</div>
						)}

						<ExchangeList />
					</div>
				</div>
			</div>
		</section>
	);
}

export const getServerSideProps: GetServerSideProps = (
	context: GetServerSidePropsContext
) =>
	ProtectedRoute(context, null, async () => {
		const { user } = await supabase.auth.api.getUserByCookie(context.req);
		const { data: userDetails, error } = await supabaseAdmin
			.from('user_details')
			.select('id, full_name, avatar_url')
			.eq('id', user.id)
			.single();

		if (error) {
			return {};
		}

		return {
			userDetails,
		};
	});
