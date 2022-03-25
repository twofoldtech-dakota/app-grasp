import Image from 'next/image';
import { useTheme } from 'next-themes';

interface LogoProps {
	className?: string;
	width?: number | string;
	height?: number | string;
	isIcon?: boolean;
}

export default function Logo({ className, width, height, isIcon }: LogoProps) {
	const { theme } = useTheme();

	let logoSrc = '/images/black-logo-full.png';
	if (theme == 'dark') {
		logoSrc = '/images/white-logo-full.png';
	}

	if (isIcon) {
		if (theme == 'dark') {
			logoSrc = '/images/grasp-g-icon-white.png';
		} else {
			logoSrc = '/images/grasp-g-icon-black.png';
		}
	}

	return (
		<Image
			alt="Logo"
			src={logoSrc}
			className={className}
			height={height ?? 64}
			width={width ?? 64}
		/>
	);
}
