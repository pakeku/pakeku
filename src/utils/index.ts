export function formatToArchiveDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

import { getClient } from '~/lib/sanity.client'
import { getPost, getPostsByDate, Post } from '~/lib/sanity.queries'

export async function getCommonProps(params: any) {
  const client = getClient()
  const { slug, startDate, endDate } = params

  if (slug) {
    const post = await getPost(client, slug)
    if (post) {
      return {
        post,
      }
    }
  } else if (startDate && endDate) {
    const posts = await getPostsByDate(client, startDate, endDate)
    return {
      posts,
    }
  }

  return {
    notFound: true,
  }
}
