import Link from 'next/link'
import { useState } from 'react'
import Form from 'react-bootstrap/Form'

import { Post } from '~/lib/sanity.queries'

export default function Container({
  children,
  posts,
}: {
  children: React.ReactNode
  posts?: Post[]
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Post[] | null>(null)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query) {
      // Filter the posts based on the search query in title, excerpt, or body
      const filteredPosts = posts?.filter(
        (post) =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          (post.excerpt &&
            post.excerpt.toLowerCase().includes(query.toLowerCase())) ||
          (post.body && hasTextInBody(post.body, query)),
      )
      setSearchResults(filteredPosts)
    } else {
      setSearchResults(null)
    }
  }

  // Function to check if the body contains the search query
  const hasTextInBody = (body, query) => {
    if (Array.isArray(body)) {
      for (const block of body) {
        if (block._type === 'block' && block.children) {
          for (const child of block.children) {
            if (
              child._type === 'span' &&
              child.text &&
              child.text.toLowerCase().includes(query.toLowerCase())
            ) {
              return true
            }
          }
        }
      }
    }
    return false
  }

  const handleCancelSearch = () => {
    setSearchQuery('')
    setIsSearching(false)
  }

  // Function to highlight matching query in a title
  const highlightMatchingQuery = (title: string) => {
    if (searchQuery) {
      const regex = new RegExp(searchQuery, 'gi')
      return title.replace(regex, (match) => `<mark>${match}</mark>`)
    }
    return title
  }

  const resultsMsg =
    searchResults && searchResults.length === 1 ? 'result' : 'results'
  return (
    <>
      <header className="sticky-top bg-light mb-4">
        <div className="container">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-6 pt-1">
              <Link href="/">
                <h4>
                  IT
                  <strong>
                    <code>Blog</code>
                  </strong>
                </h4>
              </Link>
            </div>
            <div className="col-6 d-flex justify-content-end align-items-center">
              <Form.Control
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {(isSearching || searchQuery !== '') && (
                <button
                  className="btn btn-secondary ms-2"
                  onClick={handleCancelSearch}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container" id="searchDisplay">
        {searchQuery !== '' ? (
          // Display search results
          searchResults && searchResults.length > 0 ? (
            <div>
              <h3 className="text-start mt-4">
                <span className="text-muted">
                  {searchResults.length}&nbsp;{resultsMsg} for
                </span>
                <span className="ms-2">
                  <code className="text-secondary">{searchQuery}</code>
                </span>
              </h3>
              <ul className="list-group list-group-flush mb-5">
                {searchResults.map((result) => (
                  <li className="list-group-item" key={result.slug.current}>
                    <Link
                      className="link-offset-2 link-underline link-underline-opacity-0"
                      href={`/post/${result.slug.current}`}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightMatchingQuery(result.title),
                        }}
                      />
                    </Link>
                    <div className="card-text">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: highlightMatchingQuery(result.excerpt),
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-center mt-4">
              <p>
                No results found for <code>{searchQuery}</code>
              </p>
            </div>
          )
        ) : (
          // Display children when not searching
          <>{children}</>
        )}
      </div>

      <footer className="py-5 text-center text-body-secondary bg-body-tertiary border-top">
        <p>
          <span className="fs-bold">
            IT
            <strong>
              <code>Blog</code>
            </strong>
          </span>
          &nbsp;is maintained by Erick Pacheco&nbsp;
          <Link href="https://github.com/pakeku">(GitHub/@pakeku)</Link>, an IT
          student at{' '}
          <Link href="https://wgu.edu">Western Governors University</Link>.
        </p>
        <p>
          Connect with me on{' '}
          <a href="https://www.linkedin.com/in/pacheco-linares/">LinkedIn</a>{' '}
          and feel free to reach out as I&apos;m open to opportunities within
          IT.
        </p>
        <p className="mb-0">
          <a href="#">Back to top</a>
        </p>
      </footer>
    </>
  )
}
