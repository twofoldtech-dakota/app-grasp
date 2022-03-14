import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PostFrontMatter } from '@/types/post-front-matter'
import { bundleMDX } from 'mdx-bundler'
import readingTime from 'reading-time'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkFootnotes from 'remark-footnotes'
import remarkMath from 'remark-math'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'
import remarkCodeTitles from './remark-code-title'
import remarkImgToJsx from './remark-img-to-jsx'

function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

function pipe(...fns) {
  return (x) => fns.reduce((v, f) => f(v), x)
}

function flattenArray(input) {
  return input.reduce((acc, item) => [...acc, ...(Array.isArray(item) ? item : [item])], [])
}

function map(fn) {
  return (input) => input.map(fn)
}

function walkDir(fullPath: string) {
  return fs.statSync(fullPath).isFile() ? fullPath : getAllFilesRecursively(fullPath)
}

function pathJoinPrefix(prefix: string) {
  return (extraPath: string) => path.join(prefix, extraPath)
}

function getAllFilesRecursively(folder: string): string[] {
  return pipe(fs.readdirSync, map(pipe(pathJoinPrefix(folder), walkDir)), flattenArray)(folder)
}

export async function getAllFilesFrontMatter(folder: 'posts') {
  const prefixPaths = path.join(process.cwd(), 'blog-data', folder)
  const files = getAllFilesRecursively(prefixPaths)
  const allFrontMatter: PostFrontMatter[] = []

  files.forEach((file: string) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    // Remove Unexpected File
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return
    }

    const source = fs.readFileSync(file, 'utf8')
    const matterFile = matter(source)
    const frontMatter = matterFile.data as PostFrontMatter
    if ('draft' in frontMatter && frontMatter.draft !== true) {
      allFrontMatter.push({
        ...frontMatter,
        slug: formatSlug(fileName),
        date: frontMatter.date ? new Date(frontMatter.date).toISOString() : null,
      })
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))
}

export function getFiles(type: 'posts') {
  const prefixPaths = path.join(process.cwd(), 'blog-data', type)
  const files = getAllFilesRecursively(prefixPaths)
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) => file.slice(prefixPaths.length + 1).replace(/\\/g, '/'))
}

export function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md)/, '')
}

export async function getFileBySlug<T>(type: 'posts', slug: string | string[]) {
  const mdxPath = path.join(process.cwd(), 'blog-data', type, `${slug}.mdx`)
  const mdPath = path.join(process.cwd(), 'blog-data', type, `${slug}.md`)
  const source = fs.existsSync(mdxPath)
    ? fs.readFileSync(mdxPath, 'utf8')
    : fs.readFileSync(mdPath, 'utf8')

  // https://github.com/kentcdodds/mdx-bundler#nextjs-esbuild-enoent
  if (process.platform === 'win32') {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'esbuild.exe'
    )
  } else {
    process.env.ESBUILD_BINARY_PATH = path.join(
      process.cwd(),
      'node_modules',
      'esbuild',
      'bin',
      'esbuild'
    )
  }

  const { frontmatter, code } = await bundleMDX({
    source: source,
    cwd: path.join(process.cwd(), 'components'),
    xdmOptions(options) {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkMath,
        remarkImgToJsx,
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        rehypeSlug,
        rehypeKatex,
        [rehypePrismPlus, { ignoreMissing: true }],
      ]
      return options
    },
    esbuildOptions: (options) => {
      options.loader = {
        ...options.loader,
        '.js': 'jsx',
      }
      return options
    },
  })

  return {
    mdxSource: code,
    frontMatter: {
      readingTime: readingTime(code),
      slug: slug || null,
      fileName: fs.existsSync(mdxPath) ? `${slug}.mdx` : `${slug}.md`,
      ...frontmatter,
      date: frontmatter.date ? new Date(frontmatter.date).toISOString() : null,
    },
  }
}
