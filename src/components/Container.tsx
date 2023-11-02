import Link from 'next/link'
import Form from 'react-bootstrap/Form'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container">
        <header className="lh-1 py-3">
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="col-6 pt-1">
              <Link className="nav-link" href="/">
                <h4>
                  {' '}
                  IT
                  <strong>
                    <code>Blog</code>
                  </strong>
                </h4>
              </Link>
            </div>
            <div className="col-6 d-flex justify-content-end align-items-center">
              <Form.Control type="text" placeholder="Search" />
            </div>
          </div>
        </header>
      </div>

      <div className="container">{children}</div>

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
