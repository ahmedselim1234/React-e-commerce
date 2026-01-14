import Pagination from "react-bootstrap/Pagination";

const Pagination1 = ({ currentPage = 1, totalPages = 20, onPageChange }) => {
  return (
    <Pagination className="justify-content-center">

      {/* First */}
      <Pagination.First 
        onClick={() => onPageChange(1)} 
        disabled={currentPage === 1}
      />

      {/* Prev */}
      <Pagination.Prev 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      />

      {/* First Page Number */}
      <Pagination.Item active={currentPage === 1} onClick={() => onPageChange(1)}>
        1
      </Pagination.Item>

      {/* Last Page Number */}
      <Pagination.Item 
        active={currentPage === totalPages} 
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </Pagination.Item>

      {/* Next */}
      <Pagination.Next 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      />

      {/* Last */}
      <Pagination.Last 
        onClick={() => onPageChange(totalPages)} 
        disabled={currentPage === totalPages}
      />

    </Pagination>
  );
};

export default Pagination1;
