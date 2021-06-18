const Paginate = (data, pageNumber, limit) => {
  return {
    data: data.length > limit ? data.slice(pageNumber * limit, limit - 1) : data,
    pageNumber,
    limit,
    totalSize: data.length
  }
}

export default Paginate
