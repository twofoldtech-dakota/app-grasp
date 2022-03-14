import Head from 'next/head'
import { useRouter } from 'next/router'
import { blogMetadata } from '@/blog-data/metadata'
import { PostFrontMatter } from '@/types/post-front-matter'

interface CommonSEOProps {
  title: string
  description: string
  ogType: string
  ogImage:
  | string
  | {
    '@type': string
    url: string
  }[]
  twImage: string
}

const CommonSEO = ({ title, description, ogType, ogImage, twImage }: CommonSEOProps) => {
  const router = useRouter()
  return (
    <Head>
      <title>{title}</title>
      <meta name="robots" content="follow, index" />
      <meta name="description" content={description} />
      <meta property="og:url" content={`${blogMetadata.siteUrl}${router.asPath}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={blogMetadata.title} />
      <meta property="og:description" content={description} />
      <meta property="og:title" content={title} />
      {Array.isArray(ogImage) ? (
        ogImage.map(({ url }) => <meta property="og:image" content={url} key={url} />)
      ) : (
        <meta property="og:image" content={ogImage} key={ogImage} />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={blogMetadata.twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={twImage} />
    </Head>
  )
}

interface PageSEOProps {
  title: string
  description: string
}

export const PageSEO = ({ title, description }: PageSEOProps) => {
  const ogImageUrl = blogMetadata.siteUrl + blogMetadata.socialBanner
  const twImageUrl = blogMetadata.siteUrl + blogMetadata.socialBanner
  return (
    <CommonSEO
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImageUrl}
      twImage={twImageUrl}
    />
  )
}

export const TagSEO = ({ title, description }: PageSEOProps) => {
  const ogImageUrl = blogMetadata.siteUrl + blogMetadata.socialBanner
  const twImageUrl = blogMetadata.siteUrl + blogMetadata.socialBanner
  const router = useRouter()
  return (
    <CommonSEO
      title={title}
      description={description}
      ogType="website"
      ogImage={ogImageUrl}
      twImage={twImageUrl}
    />
  )
}

interface BlogSeoProps extends PostFrontMatter {
  url: string
}

export const BlogSEO = ({
  title,
  summary,
  date,
  lastmod,
  url,
  images = [],
}: BlogSeoProps) => {
  const router = useRouter()
  const publishedAt = new Date(date).toISOString()
  const modifiedAt = new Date(lastmod || date).toISOString()
  const imagesArr =
    images.length === 0
      ? [blogMetadata.socialBanner]
      : typeof images === 'string'
        ? [images]
        : images

  const featuredImages = imagesArr.map((img) => {
    return {
      '@type': 'ImageObject',
      url: `${blogMetadata.siteUrl}${img}`,
    }
  })

  const authorList = {
    '@type': 'Person',
    name: blogMetadata.author.name,
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    headline: title,
    image: featuredImages,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: authorList,
    publisher: {
      '@type': 'Organization',
      name: blogMetadata.author.name,
      logo: {
        '@type': 'ImageObject',
        url: `${blogMetadata.siteUrl}${blogMetadata.siteLogo}`,
      },
    },
    description: summary,
  }

  const twImageUrl = featuredImages[0].url

  return (
    <>
      <CommonSEO
        title={title}
        description={summary}
        ogType="article"
        ogImage={featuredImages}
        twImage={twImageUrl}
      />
      <Head>
        {date && <meta property="article:published_time" content={publishedAt} />}
        {lastmod && <meta property="article:modified_time" content={modifiedAt} />}
        <link rel="canonical" href={`${blogMetadata.siteUrl}${router.asPath}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData, null, 2),
          }}
        />
      </Head>
    </>
  )
}
