import * as React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHashtag } from "@fortawesome/free-solid-svg-icons"

const TAGS = ({ tags }) => {
  return (<ul className={"mb-0"}>
    {tags.map((tag) => (<li key={tag}
                            className={"text-gray-500 text-xs inline"}>
      <FontAwesomeIcon
        icon={faHashtag}
        size={"sm"}
        className="text-gray-400"
      /><span className={"mr-2"}>{tag}</span></li>))
    }
  </ul>)

}

TAGS.defaultProps = {
  tags: []
}

TAGS.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string)
}

export default TAGS
