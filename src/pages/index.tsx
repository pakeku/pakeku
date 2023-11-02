import { PortableText } from '@portabletext/react'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useLiveQuery } from 'next-sanity/preview'

import Card from '~/components/Card'
import Welcome from '~/components/Welcome'
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
  return (
    <>
      <div className="container">
        <header className="border-bottom lh-1 py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-4 pt-1">
              <a className="link-secondary" href="#">
                Subscribe
              </a>
            </div>
            <div className="col-4 text-center">
              <a
                className="blog-header-logo text-body-emphasis text-decoration-none"
                href="#"
              >
                Large
              </a>
            </div>
            <div className="col-4 d-flex justify-content-end align-items-center">
              <a className="link-secondary" href="#" aria-label="Search">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="mx-3"
                  role="img"
                  viewBox="0 0 24 24"
                >
                  <title>Search</title>
                  <circle cx="10.5" cy="10.5" r="7.5" />
                  <path d="M21 21l-5.2-5.2" />
                </svg>
              </a>
              <a className="btn btn-sm btn-outline-secondary" href="#">
                Sign up
              </a>
            </div>
          </div>
        </header>
        <div className="nav-scroller py-1 mb-3 border-bottom">
          <nav className="nav nav-underline justify-content-between">
            <a className="nav-item nav-link link-body-emphasis active" href="#">
              World
            </a>
            <a className="nav-item nav-link link-body-emphasis" href="#">
              U.S.
            </a>
            <a className="nav-item nav-link link-body-emphasis" href="#">
              Technology
            </a>
            <a className="nav-item nav-link link-body-emphasis" href="#">
              Design
            </a>
            <a className="nav-item nav-link link-body-emphasis" href="#">
              Culture
            </a>
            <a className="nav-item nav-link link-body-emphasis" href="#">
              Business
            </a>
            <a className="nav-item nav-link link-body-emphasis" href="#">
              Politics
            </a>
            <a className="nav-item nav-link link-body-emphasis" href="#">
              Opinion
            </a>
            <a className="nav-item nav-link link-body-emphasis" href="#">
              Science
            </a>
            <a className="nav-item nav-link link-body-emphasis" href="#">
              Health
            </a>
            <a className="nav-item nav-link link-body-emphasis" href="#">
              Style
            </a>
            <a className="nav-item nav-link link-body-emphasis" href="#">
              Travel
            </a>
          </nav>
        </div>
      </div>
      <main className="container">
        <div className="row g-5">
          <div className="col-md-8">
            <article className="blog-post">
              <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-light">
                <div className="px-0">
                  <h1 className="display-4 fst-italic fw-bold">
                    {posts[0].title}
                  </h1>
                  <p className="lead my-3 text-black">{posts[0].excerpt}</p>
                  <p className="lead mb-0">{formatDate(posts[0]._createdAt)}</p>
                </div>
              </div>
              <PortableText value={posts[0].body} />
            </article>
            <nav className="blog-pagination" aria-label="Pagination">
              <a className="btn btn-outline-primary rounded-pill" href="#">
                Older
              </a>
              <a
                className="btn btn-outline-secondary rounded-pill disabled"
                aria-disabled="true"
              >
                Newer
              </a>
            </nav>
          </div>
          <div className="col-md-4">
            <div className="position-sticky" style={{ top: '2rem' }}>
              <div className="p-4 mb-3 bg-body-tertiary rounded">
                <h4 className="fst-italic">About</h4>
                <p className="mb-0">
                  Customize this section to tell your visitors a little bit
                  about your publication, writers, content, or something else
                  entirely. Totally up to you.
                </p>
              </div>
              <div>
                <h4 className="fst-italic">Recent posts</h4>
                <ul className="list-unstyled">
                  {posts.map((post) => (
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
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-4">
                <h4 className="fst-italic">Archives</h4>
                <ol className="list-unstyled mb-0">
                  <li>
                    <a href="#">March 2021</a>
                  </li>
                  <li>
                    <a href="#">February 2021</a>
                  </li>
                  <li>
                    <a href="#">January 2021</a>
                  </li>
                  <li>
                    <a href="#">December 2020</a>
                  </li>
                  <li>
                    <a href="#">November 2020</a>
                  </li>
                  <li>
                    <a href="#">October 2020</a>
                  </li>
                  <li>
                    <a href="#">September 2020</a>
                  </li>
                  <li>
                    <a href="#">August 2020</a>
                  </li>
                  <li>
                    <a href="#">July 2020</a>
                  </li>
                  <li>
                    <a href="#">June 2020</a>
                  </li>
                  <li>
                    <a href="#">May 2020</a>
                  </li>
                  <li>
                    <a href="#">April 2020</a>
                  </li>
                </ol>
              </div>
              <div className="p-4">
                <h4 className="fst-italic">Elsewhere</h4>
                <ol className="list-unstyled">
                  <li>
                    <a href="#">GitHub</a>
                  </li>
                  <li>
                    <a href="#">Twitter</a>
                  </li>
                  <li>
                    <a href="#">Facebook</a>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {
          /** Bottom Navigation Previous and Next */
          <div className="row mb-2 mt-4">
            <div className="col-md-6">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-primary-emphasis">
                    World
                  </strong>
                  <h3 className="mb-0">Featured post</h3>
                  <div className="mb-1 text-body-secondary">Nov 12</div>
                  <p className="card-text mb-auto">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content.
                  </p>
                  <a
                    href="#"
                    className="icon-link gap-1 icon-link-hover stretched-link"
                  >
                    Continue reading
                    <svg className="bi">
                      <use xlinkHref="#chevron-right" />
                    </svg>
                  </a>
                </div>
                <div className="col-auto d-none d-lg-block">
                  <svg
                    className="bd-placeholder-img"
                    width={200}
                    height={250}
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      Thumbnail
                    </text>
                  </svg>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                  <strong className="d-inline-block mb-2 text-success-emphasis">
                    Design
                  </strong>
                  <h3 className="mb-0">Post title</h3>
                  <div className="mb-1 text-body-secondary">Nov 11</div>
                  <p className="mb-auto">
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content.
                  </p>
                  <a
                    href="#"
                    className="icon-link gap-1 icon-link-hover stretched-link"
                  >
                    Continue reading
                    <svg className="bi">
                      <use xlinkHref="#chevron-right" />
                    </svg>
                  </a>
                </div>
                <div className="col-auto d-none d-lg-block">
                  <svg
                    className="bd-placeholder-img"
                    width={200}
                    height={250}
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c" />
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      Thumbnail
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        }
      </main>
      <footer className="py-5 text-center text-body-secondary bg-body-tertiary">
        <p>
          Blog template built for{' '}
          <a href="https://getbootstrap.com/">Bootstrap</a> by{' '}
          <a href="https://twitter.com/mdo">@mdo</a>.
        </p>
        <p className="mb-0">
          <a href="#">Back to top</a>
        </p>
      </footer>
    </>
  )
}
