/* eslint-disable react/prop-types */

const Pagination = ({ blogsPerPage, totalBlogs, paginate, currentPage }) => {
 
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <div
          className={`pagination__number ${
            number === currentPage ? "active" : ""
          }`}
          key={number}
          onClick={() => paginate(number)}
        >
          <p>{number}</p>
        </div>
      ))}
    </div>
  );
};

export default Pagination;
