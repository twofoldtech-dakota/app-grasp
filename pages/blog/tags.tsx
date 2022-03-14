import Link from 'next/link'
import { PageSEO } from '@/components/seo'
import Tag from '@/components/blog/tag'
import { blogMetadata } from '@/blog-data/metadata'
import { getAllTags } from '@/utils/blog/tags'
import kebabCase from '@/utils/blog/kebab-case'
import { GetStaticProps, InferGetStaticPropsType } from 'next'

export default function Tags({ tags }: InferGetStaticPropsType<typeof getStaticProps>) {
  const sortedTags = Object.keys(tags).sort((a, b) => tags[b] - tags[a])
  return (
    <>
      <PageSEO
        title={`Tags - ${blogMetadata.title}`}
        description={blogMetadata.description}
      />

      <div className='mb-16'>
        <div className='container mx-auto px-4 lg:px-16'>
          <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 md:mt-24">
            <div className="pt-6 pb-8 space-x-2 md:space-y-5">
              <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-r-2 md:px-6">
                Tags
              </h1>
            </div>
            <div className="flex flex-wrap max-w-lg">
              {Object.keys(tags).length === 0 && 'No tags found.'}
              {sortedTags.map((t) => {
                return (
                  <div key={t} className="mt-2 mb-2 mr-5">
                    <Tag text={t} />
                    <Link href={`/blog/tags/${kebabCase(t)}`}>
                      <a className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300">
                        {` (${tags[t]})`}
                      </a>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps: GetStaticProps<{ tags: Record<string, number> }> = async () => {
  const tags = await getAllTags('posts')
  return {
    props: {
      tags,
    }
  }
}
