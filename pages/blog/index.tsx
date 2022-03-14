import { getAllFilesFrontMatter } from '@/utils/blog/mdx'
import { blogMetadata } from '@/blog-data/metadata'
import ListLayout from '@/layouts/list-layout'
import { PageSEO } from '@/components/seo'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from '@/types/post-front-matter'

export default function Blog({
  posts,
  initialDisplayPosts,
  pagination,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO
        title={blogMetadata.title}
        description={blogMetadata.description} />

      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}

export const POSTS_PER_PAGE = 5
export const getStaticProps: GetStaticProps<{
  posts: PostFrontMatter[]
  initialDisplayPosts: PostFrontMatter[],
  pagination: { currentPage: number, totalPages: number }
}> = async () => {
  const posts = await getAllFilesFrontMatter('posts')
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      initialDisplayPosts,
      posts,
      pagination,
    }
  };
}
