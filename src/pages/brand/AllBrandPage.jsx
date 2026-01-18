import { useState } from "react";
import BrandContainer from "../../components/brand/BrandContainer";
import Pagination from "../../components/utility/Pagination";
import { useGetbrandQuery } from "../../redux/features/brand/brandSlice";

const AllBrand = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, error, isLoading, isError } = useGetbrandQuery({
    limit: 5,
    page: currentPage,
  });
  const changePage = (page) => {
    setCurrentPage(page);
  };

  console.log(data);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  if (isError) {
    console.log(error);
    return <h4 className="text-center text-danger">حدث خطأ</h4>;
  }

  return (
    <div style={{ minHeight: "670px" }}>
      <BrandContainer data={data} />
      {data?.paginatetionResult?.NumberOfPages > 1 && (
        <Pagination
          pageCount={data?.paginatetionResult?.NumberOfPages || 1}
          onPress={changePage}
        />
      )}
    </div>
  );
};

export default AllBrand;
