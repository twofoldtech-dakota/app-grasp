import Link from 'next/link'
import kebabCase from '@/utils/blog/kebab-case'

interface TagProps {
  text: string
}

export default function Tag({ text }: TagProps) {
  return (
    <Link href={`/blog/tags/${kebabCase(text)}`}>
      <a className="mr-3 text-sm font-medium uppercase text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-400">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}
