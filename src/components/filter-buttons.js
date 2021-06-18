import * as React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHashtag } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"
import classNames from 'classnames';

const FILTER_BUTTONS = ({ tag, selectedTag }) => {
  const [state, setState] = useState({
    isSelected: false,
  });

  const handleClick = (tag) => {
    setState({
      isSelected: !state.isSelected
    });

    selectedTag(tag, !state.isSelected);
  }
  const buttonClassName = classNames({
    "text-xs text-white m-1 py-1 px-2  font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2  focus:ring-opacity-75": true,
    "bg-blue-500 hover:bg-blue-700 focus:ring-blue-400": !state.isSelected,
    "bg-gray-500 hover:bg-gray-700 focus:ring-gray-400": state.isSelected,
  });

  return <button
      key={tag}
      className= {buttonClassName}
      onClick={() => handleClick(tag)}>
      <FontAwesomeIcon
        icon={faHashtag}
        size={"sm"}
      /><span className={"mr-2"}>{tag}</span></button>;

}

FILTER_BUTTONS.defaultProps = {
  tag: ""
}

FILTER_BUTTONS.propTypes = {
  tag: PropTypes.string
}

export default FILTER_BUTTONS
