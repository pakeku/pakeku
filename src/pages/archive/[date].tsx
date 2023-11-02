import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'

import Container from '~/components/Container'
import { getClient } from '~/lib/sanity.client'
import { getPosts, Post } from '~/lib/sanity.queries'
import { formatDate, formatToArchiveDate, getCommonProps } from '~/utils' // Import the common utility function

import { getArchivalDates } from '..'

interface Props {
  posts: Post[]
  date: string
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const startDate = params?.date as string // Extract the date parameter

  // Calculate the end date as the last day of the month for the given start date
  const [year, month] = startDate.split('-')
  let endYear = parseInt(year)
  let endMonth = parseInt(month) + 1

  // Handle the case where the current month is December (12)
  if (endMonth > 12) {
    endYear = endYear + 1
    endMonth = 1 // Reset to January of the next year
  }

  // Calculate the last day of the month
  const endDate = `${endYear}-${endMonth < 10 ? '0' : ''}${endMonth}-01`

  // Fetch data using the common utility function
  const commonProps = await getCommonProps({ startDate, endDate })

  // Make sure to return props with the correct shape
  return {
    props: {
      posts: commonProps.posts, // Ensure it matches the Props interface
      date: `${year}/${month}/01`, // Pass the date as a string
    },
  }
}

const ArchivePage = ({ posts, date }: Props) => {
  return (
    <Container>
      <div>
        <p className="lead">Blogs from&nbsp;{formatToArchiveDate(date)}</p>
        <ul className="list-group list-group-flush">
          {posts.map((post) => (
            <Link
              className="custom-link"
              key={post._id}
              href={`/post/${post.slug.current}`}
            >
              <li className="list-group-item py-2 my-2">
                <h2>{post.title}</h2>
                <p className="text-muted">{formatDate(post._createdAt)}</p>
                <p>{post.excerpt}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </Container>
  )
}

export default ArchivePage

export const getStaticPaths: GetStaticPaths = async () => {
  const client = getClient()
  const posts = await getPosts(client)
  const dates = getArchivalDates(posts)

  const paths = dates.map((date) => ({ params: { date } }))

  return {
    paths,
    fallback: false, // Set to false if you want to return a 404 for undefined paths
  }
}
