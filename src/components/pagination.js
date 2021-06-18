import * as React from "react"
import { useEffect, useState } from "react"
import classNames from "classnames"
import PropTypes from "prop-types"

const PAGINATION = ({ pageNumber, limit, totalSize, pageClick }) => {
  const [currentPage, setCurrentPage] = useState(pageNumber)
  const totalNumberOfPages = Math.ceil((totalSize / limit))
  const handleClick = (pageNum) => {
    setCurrentPage(pageNum)
  }

  const previousClick = () => {
    const currPage = currentPage <= 1
      ? 1
      : currentPage - 1;
    setCurrentPage(currPage);
  }

  const nextClick = () => {
    setCurrentPage(currentPage <= totalNumberOfPages
      ? totalNumberOfPages
      : currentPage + 1)
  }

  useEffect(() => {
    pageClick(currentPage)
  }, [currentPage])

  const buttonClassName = (pageNum) => classNames({
    "text-xs text-white m-1 py-1 px-2  font-semibold rounded-md shadow-md  focus:outline-none focus:ring-2  focus:ring-opacity-75": true,
    "bg-blue-500 hover:bg-blue-700 focus:ring-blue-400": pageNum !== currentPage,
    "bg-gray-500 hover:bg-gray-700 focus:ring-gray-400": pageNum === currentPage
  })
// <span className={'mr-2'}>Showing { currentPage*limit < totalSize ? currentPage * limit : totalSize } of {totalSize}</span>
  return <>
    <button
      className={buttonClassName(1)}
      onClick={() => previousClick()}>
      <span>&larr;</span></button>
    {Array.from({
      length: totalNumberOfPages
    }, (v, i) => i + 1).map((num) => <button
      key={num}
      className={buttonClassName(num)}
      onClick={() => handleClick(num)}>
      <span>{num}</span></button>)}
    <button
      className={buttonClassName(totalNumberOfPages)}
      onClick={() => nextClick()}>
      <span>&rarr;</span></button>
  </>
}

PAGINATION.defaultProps = {
  pageNumber: 1,
  limit: 10,
  totalSize: 20
}

PAGINATION.propTypes = {
  pageNumber: PropTypes.number,
  limit: PropTypes.number,
  totalSize: PropTypes.number
}

export default PAGINATION
