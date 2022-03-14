import { PostFrontMatter } from '@/types/post-front-matter'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { getFiles } from './mdx'
import kebabCase from '@/utils/blog/kebab-case'

const root = process.cwd()

export async function getAllTags(type: 'posts') {
  const files = getFiles(type)
  const tagCount: Record<string, number> = {}
  files.forEach((file) => {
    const source = fs.readFileSync(path.join(root, 'blog-data', type, file), 'utf8')
    const matterFile = matter(source)
    const data = matterFile.data as PostFrontMatter
    if (data.tags && data.draft !== true) {
      data.tags.forEach((tag) => {
        const formattedTag = kebabCase(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })

  return tagCount
}
