import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { graphql, Link } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TAGS from "../components/tags"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBookReader } from "@fortawesome/free-solid-svg-icons"
import FILTER_BUTTONS from "../components/filter-buttons"
import PAGINATION from "../components/pagination"

const BlogIndex = ({ data, location }) => {
  const pageLimit = 6
  let pageNumber = 1
  const allPosts = data.allMarkdownRemark.nodes.slice()
  const [posts, setFilteredPost] = useState(allPosts || [])
  const [paginatedPosts, setPaginatedPost] = useState(allPosts.slice(0, pageLimit) || [])
  const selectedTags = useRef([])
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const allTags = allPosts.flatMap((post) => post.frontmatter.tags)
  const uniqueTags = [...new Set(allTags)]

  const handleTagsClick = (value, isSelected) => {
    if (isSelected) {
      selectedTags.current = [...selectedTags.current, value]
    } else {
      selectedTags.current = selectedTags.current.filter((tag) => tag !== value)
    }
    const filteredPosts = allPosts.filter(
      (post) => selectedTags.current
        .some(tag => post.frontmatter.tags.includes((tag))
        ))
    setFilteredPost(filteredPosts)
  }
  const resetList = () => {
    selectedTags.current = []
    setFilteredPost(allPosts)
  }

  useEffect(() => {
    setPaginatedPosts(pageNumber = 1, pageLimit)
  }, [posts])

  const setPaginatedPosts = (pageNum, pageLim) => {
    const start = (pageNum <= 1 ? 0 : pageNum - 1) * pageLim
    setPaginatedPost(posts.slice(start, start + pageLim))
  }

  const paginate = (pageNum) => {
    pageNumber = pageNum
    setPaginatedPosts(pageNum, pageLimit)
  }

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <SEO title="All posts" />
        <Bio />
        <div className={"m-2"}>
          {uniqueTags.map((tagName) => <FILTER_BUTTONS
            key={tagName}
            tag={tagName}
            selectedTag={handleTagsClick} />)
          }
          <FILTER_BUTTONS
            key={"showAll"}
            tag={"Show All"}
            selectedTag={resetList} />
        </div>
        <p className={"flex justify-center"}>
          No blog posts found.
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <div className={"m-2"}>
        {uniqueTags.map((tagName) => <FILTER_BUTTONS
          key={tagName}
          tag={tagName}
          selectedTag={handleTagsClick} />)
        }
        <FILTER_BUTTONS
          key={"showAll"}
          tag={"Show All"}
          selectedTag={resetList} />
      </div>
      <ol className={"list-none mt-10"}>
        {paginatedPosts.map(post => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li className="bg-white p-4 mb-8 shadow-md rounded-lg" key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header className={"flex justify-between"}>
                  <h2 className="text-2xl font-bold md:w-9/12">
                    <Link to={post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{post.frontmatter.date}
                    <small className={"text-gray-500 text-xs inline"}>
                      <FontAwesomeIcon
                        icon={faBookReader}
                        size={"sm"}
                        className="text-gray-400 mx-2"
                      />{Math.ceil(post.wordCount.words / 130)} min read</small>
                  </small>
                </header>
                <div className={"ml-2"}>
                  <TAGS tags={post.frontmatter.tags} />
                </div>
                <section className={"my-1.5"}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
      <div className={"flex justify-center"}>
        <PAGINATION totalSize={posts.length} limit={pageLimit} pageNumber={pageNumber}
                    pageClick={(pageNum) => paginate(pageNum)} />
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            nodes {
                excerpt
                fields {
                    slug
                }
                frontmatter {
                    date(formatString: "MMMM DD, YYYY")
                    title
                    description
                    tags
                }
                wordCount {
                    words
                }
            }
        }
    }
`
