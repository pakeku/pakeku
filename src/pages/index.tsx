import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useLiveQuery } from 'next-sanity/preview'

import Container from '~/components/Container'
import { readToken } from '~/lib/sanity.api'
import { getClient } from '~/lib/sanity.client'
import { urlForImage } from '~/lib/sanity.image'
import { getPosts, type Post, postsQuery } from '~/lib/sanity.queries'
import type { SharedPageProps } from '~/pages/_app'
import { formatDate } from '~/utils'

export const getStaticProps: GetStaticProps<
  SharedPageProps & {
    posts: Post[]
  }
> = async ({ draftMode = false }) => {
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getPosts(client)

  return {
    props: {
      draftMode,
      token: draftMode ? readToken : '',
      posts,
    },
  }
}

export default function IndexPage(
  props: InferGetStaticPropsType<typeof getStaticProps>,
) {
  const [posts] = useLiveQuery<Post[]>(props.posts, postsQuery)
  const recentposts = posts.slice(0, 10)

  return (
    <Container posts={posts}>
      <main>
        <div className="row g-5">
          <div className="col-md-8">
            <BlogPost post={posts[0]} />
          </div>
          <div className="col-md-4">
            <div className="position-sticky" style={{ top: '2rem' }}>
              <div className="p-4 mb-3 bg-body-tertiary rounded">
                <h4>
                  Welcome to{' '}
                  <span className="fs-bold">
                    IT<code>Blog</code>
                  </span>
                  !
                </h4>
                <p className="mb-0">
                  This is your go-to spot for awesome IT tips, tricks, and
                  insights. Whether you&apos;re a tech pro or just tech-curious,
                  you&apos;re in the right place. Let&apos;s dive into the world
                  of all things IT!
                </p>
              </div>
              <div>
                <h4 className="fst-italic">Recent Posts</h4>
                <ul className="list-unstyled">
                  {recentposts.map((post) => (
                    <li key={post.slug.current}>
                      <a
                        className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top"
                        href={`/post/${post.slug.current}`}
                      >
                        <div className="col-lg-8">
                          <h6 className="mb-0">{post.title}</h6>
                          <small className="text-body-secondary">
                            {formatDate(post._createdAt)}
                          </small>
                          <div id="tags">
                            <NewTag date={post._createdAt} />
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4">
                <h4 className="fst-italic">Archives</h4>
                <Archives posts={posts} />
              </div>
              <div className="p-4">
                <h4 className="fst-italic">Connect</h4>
                <ol className="list-unstyled">
                  <li>
                    <a href="https://www.linkedin.com/in/pacheco-linares/">
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a href="https://github.com/pakeku">GitHub</a>
                  </li>
                  <li>
                    <a href="mailto:elina13@wgu.edu">Email</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Container>
  )
}
export const CategoryTag = ({ category }: { category: string }) => {
  if (category === undefined) return null
  return (
    <span className="badge border rounded-pill bg-light text-black m-1">
      {category}
    </span>
  )
}

export const Tag = ({ tags }: { tags: string[] }) => {
  if (!tags || tags.length === 0) return null

  return (
    <div className="mt-5">
      <p className="text-muted">Tags</p>
      {tags.map((tag, index) => (
        <span
          key={index}
          className="badge border rounded-pill bg-light text-black m-1"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export const NewTag = ({ date }: { date: string }) => {
  const postDate = new Date(date).getTime()
  const oneWeekAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000

  if (postDate > oneWeekAgo) {
    const badgeStyle = {
      backgroundColor: 'rgba(40, 167, 69, 0.1)', // 10% color of bg-success
      borderColor: 'rgba(40, 167, 69, 1)', // Full color of bg-success
      borderWidth: '1px', // Border width
      borderStyle: 'solid', // Border style
      color: 'rgba(40, 167, 69, 1)', // Full color of bg-success
      fontWeight: 'bold', // Bold text
    }

    return (
      <span className="badge rounded-pill" style={badgeStyle}>
        New
      </span>
    )
  }

  return null // Don't render anything if it's not new
}
export const BlogPost = ({ post }: { post: Post }) => {
  return (
    <article className="blog-post mb-5">
      <div className="p-4 p-md-0 mb-4 rounded text-body-emphasis bg-body-light">
        <div>
          <h1 className="display-4 fst-italic fw-bold">{post.title}</h1>
          <p className="lead mb-0">{formatDate(post._createdAt)}</p>
          <NewTag date={post._createdAt} />
          <CategoryTag category={post.category} />
          <p className="lead my-3 text-black">{post.excerpt}</p>
          {post.mainImage ? (
            <Image
              src={urlForImage(post.mainImage).url()}
              height={231}
              width={367}
              alt=""
              className="img-fluid"
            />
          ) : null}
        </div>
      </div>

      <div className="container">
        <PortableText value={post.body} />
      </div>

      <Tag tags={post.tags} />
    </article>
  )
}
export const getArchivalDates = (posts: Post[]) => {
  const uniqueDates = new Set<string>()

  posts.forEach((post) => {
    const postDate = new Date(post._createdAt)
    const year = postDate.getFullYear()
    const month = postDate.getMonth() + 1 // Month is zero-based
    const formattedDate = `${year}-${month}`

    uniqueDates.add(formattedDate)
  })

  // Convert the set to an array and sort it in descending order
  return Array.from(uniqueDates).sort((a, b) => b.localeCompare(a))
}

export const Archives = ({ posts }: { posts: Post[] }) => {
  const archiveDateRange = getArchivalDates(posts)

  return (
    <ol className="list-unstyled mb-0">
      {archiveDateRange.map((date) => (
        <li key={date}>
          <Link href={`/archive/${date}`}>
            {' '}
            {/* Assuming you have an archive page */}
            {date}
          </Link>
        </li>
      ))}
    </ol>
  )
}
