/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Bio = () => {
  const data = useStaticQuery(graphql`
      query BioQuery {
          site {
              siteMetadata {
                  author {
                      name
                      summary
                  }
                  social {
                      twitter
                  }
              }
          }
      }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <>
      {author?.name && (
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <StaticImage
              className="h-10 w-10 rounded-full"
              layout="fixed"
              formats={["AUTO", "WEBP", "AVIF"]}
              src="../images/profile.jpg"
              width={50}
              height={50}
              quality={95}
              alt="Profile picture"
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              Written by <strong>{author.name}
            </strong>
            </div>
            <div className="text-sm text-gray-500">
              {author?.summary || null}
            </div>
            <div className="text-sm">
             <a href={`https://twitter.com/${social?.twitter || ``}`}>
                <FontAwesomeIcon
                  icon={faTwitter}
                  size={'sm'}
                  className='text-gray-500'
                />
              </a>
              <a className={'pl-2'} href={`https://www.linkedin.com/in/sidhugagandeep/`}>
                <FontAwesomeIcon
                  icon={faLinkedinIn}
                  size={'sm'}
                  className='text-gray-500'
                />
              </a>
            </div>
          </div>
        </div>)
      }
    </>
  )
}

export default Bio
