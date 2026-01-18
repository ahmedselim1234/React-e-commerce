import { useState } from "react";
import CategoryContainer from "../../components/category/CategoryContainer";
import Pagination from "../../components/utility/Pagination";
import { useGetCategoryQuery } from "../../redux/features/category/categorySlice";

const AllCategoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isError, error, data, isLoading } = useGetCategoryQuery({
    limit: 5,
    page: currentPage,
  });

  const changePage = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div
        style={{ minHeight: "670px" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ minHeight: "670px" }}>
        <h4 className="text-center text-danger">حدث خطأ: {error?.message}</h4>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryContainer data={data} />

      {data?.paginatetionResult?.NumberOfPages > 1 && (
        <Pagination
          pageCount={data?.paginatetionResult?.NumberOfPages || 1}
          onPress={changePage}
        />
      )}
    </div>
  );
};

export default AllCategoryPage;
