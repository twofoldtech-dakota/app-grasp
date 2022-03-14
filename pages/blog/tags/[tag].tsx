import { TagSEO } from '@/components/seo'
import { blogMetadata } from '@/blog-data/metadata'
import ListLayout from '@/layouts/list-layout'
import { getAllFilesFrontMatter } from '@/utils/blog/mdx'
import { getAllTags } from '@/utils/blog/tags'
import kebabCase from '@/utils/blog/kebab-case'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PostFrontMatter } from '@/types/post-front-matter'

export default function Tag({ posts, tag }: InferGetStaticPropsType<typeof getStaticProps>) {
  // Capitalize first letter and convert space to dash
  const title = tag[0].toUpperCase() + tag.split(' ').join('-').slice(1)
  return (
    <>
      <TagSEO
        title={`${tag} - ${blogMetadata.title}`}
        description={`${tag} tags - ${blogMetadata.author.name}`}
      />

      <ListLayout posts={posts} title={title} />
    </>
  )
}

export async function getStaticPaths() {
  const tags = await getAllTags('posts')
  return {
    paths: Object.keys(tags).map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<{ posts: PostFrontMatter[]; tag: string }> = async (
  context
) => {
  const tag = context.params.tag as string
  const allPosts = await getAllFilesFrontMatter('posts')
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(tag)
  )

  return {
    props: {
      posts: filteredPosts,
      tag,
    }
  }
}
