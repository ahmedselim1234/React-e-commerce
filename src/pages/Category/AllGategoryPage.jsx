import CategoryContainer from "../../components/category/CategoryContainer";
import Pagination1 from "../../components/utility/Pagination";
const AllCategoryPage = () => {
  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryContainer />
      <Pagination1
        currentPage={1}
        totalPages={15}
        onPageChange={(page) => console.log("Go to page:", page)}
      />
    </div>
  );
};

export default AllCategoryPage;
