import Image from 'next/image';

interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

export default function Logo({ className, width, height }: LogoProps) {
  return (
    <Image
      alt='Logo'
      src='/images/unicorn.svg'
      className={className}
      height={height ?? 64}
      width={width ?? 64}
    />
  )
}
