import { MDXLayoutRenderer } from '@/components/blog/mdx-components'
import {
  formatSlug,
  getAllFilesFrontMatter,
  getFileBySlug,
  getFiles,
} from '@/utils/blog/mdx'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from '@/types/post-front-matter'

export default function Blog({
  post,
  prev,
  next,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { mdxSource, frontMatter } = post

  return (
    <>
      {'draft' in frontMatter && frontMatter.draft !== true ? (
        <MDXLayoutRenderer
          layout={'PostLayout'}
          mdxSource={mdxSource}
          frontMatter={frontMatter}
          prev={prev}
          next={next}
        />
      ) : (
        <div className="mt-24 text-center">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
            Under Construction{' '}
            <span role="img" aria-label="roadwork sign">
              🚧
            </span>
          </h1>
        </div>
      )}
    </>
  )
}

export async function getStaticPaths() {
  const posts = getFiles('posts')
  return {
    paths: posts.map((p) => ({
      params: {
        slug: formatSlug(p).split('/'),
      },
    })),
    fallback: false,
  }
}

// @ts-ignore
export const getStaticProps: GetStaticProps<{
  post: {
    mdxSource: string;
    frontMatter: PostFrontMatter;
  }
  prev?: {
    slug: string;
    title: string;
  }
  next?: {
    slug: string;
    title: string;
  }
}> = async ({ params }) => {
  const slug = (params.slug as string[]).join('/')
  const allPosts = await getAllFilesFrontMatter('posts')
  const postIndex = allPosts.findIndex((post) => formatSlug(post.slug) === slug)
  const prev: { slug: string; title: string } = allPosts[postIndex + 1] || null
  const next: { slug: string; title: string } = allPosts[postIndex - 1] || null
  const post = await getFileBySlug<PostFrontMatter>('posts', slug)
  return {
    props: {
      post,
      prev,
      next,
    },
  }
}
