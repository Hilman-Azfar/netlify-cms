import React from "react"
import { Link, useStaticQuery } from "gatsby"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header;

  const data = useStaticQuery(graphql`
    query links {
      site {
          siteMetadata {
            github
            linkedIn
          }
      } 
    }
  `)

  const links = data.site.siteMetadata;

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
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
        {` • `}
        {
          links?.github 
          ? (<a href={`https://github.com/${links.github}`}>Github</a>)
          : null
        }
        {` • `}
        {
          links?.linkedIn 
          ? (<a href={`https://linkedin.com/in/${links.linkedIn}`}>LinkedIn</a>)
          : null
        }
        
      </footer>
    </div>
  )
}

export default Layout
