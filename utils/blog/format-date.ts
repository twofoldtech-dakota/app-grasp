import { blogMetadata } from '@/blog-data/metadata'

const formatDate = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  const now = new Date(date).toLocaleDateString(blogMetadata.locale, options)
  return now
}

export default formatDate
