import Link from 'next/link'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="container">
        <header className="lh-1 py-3">
          <div className="row flex-nowrap justify-content-start align-items-start">
            <div className="col-4">
              <Link className="nav-link" href="/">
                <h3 className="fst-italic">
                  IT&nbsp;
                  <code>.log</code>
                </h3>
              </Link>
            </div>
          </div>
        </header>
      </div>

      <div className="container">{children}</div>

      <footer className="py-5 text-center text-body-secondary bg-body-tertiary border-top">
        <p>
          IT .log is maintained by Erick Pacheco&nbsp;
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
