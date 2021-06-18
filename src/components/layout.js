import * as React from "react"
import { Link } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="h-screen flex flex-col items-center" data-is-root-path={isRootPath}>
      <header className="font-extrabold my-5 text-4xl w-3/5">{header}</header>
      <main className="p-4 sm:w-4/5 lg:w-4/5 w-full">{children}</main>
    </div>
  )
}

export default Layout
