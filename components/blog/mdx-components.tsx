import React, {
  useMemo,
  AnchorHTMLAttributes,
  DetailedHTMLProps,
} from 'react'
import { ComponentMap, getMDXComponent } from 'mdx-bundler/client'
import NextImage, { ImageProps } from 'next/image'
import Link from 'next/link'
import Pre from './pre'

const Wrapper: React.ComponentType<{ layout: string }> = ({ layout, ...rest }) => {
  const Layout = require(`../../layouts/post-layout`).default
  return <Layout {...rest} />
}

const Image = ({ ...rest }: ImageProps) => <NextImage {...rest} />
const CustomLink = ({
  href,
  ...rest
}: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => {
  return (
    <Link href={href}>
      <a {...rest} />
    </Link>
  )
}

export const MDXComponents: ComponentMap = {
  Image,
  a: CustomLink,
  pre: Pre,
  wrapper: Wrapper,
}

interface MdxProps {
  layout: string
  mdxSource: string
  [key: string]: unknown
}

export const MDXLayoutRenderer = ({ layout, mdxSource, ...rest }: MdxProps) => {
  const MDXLayout = useMemo(() => getMDXComponent(mdxSource), [mdxSource])
  return <MDXLayout layout={layout} components={MDXComponents} {...rest} />
}
