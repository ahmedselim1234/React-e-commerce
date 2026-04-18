import { Row } from "react-bootstrap";
import ProductCard from "../Products/ProductCard";
import Pagination from "../utility/Pagination";
import { useGetUserWishListQuery } from "../../redux/features/user/userSlice";
import { useState } from "react";
const UserFavoriteProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data } = useGetUserWishListQuery({ page: currentPage, limit: 1 });
  const list = data?.list;
  console.log(list);
  const changePage = (page) => {
    setCurrentPage(page);
  };
  return (
    <div>
      <div className="admin-content-text pb-4">قائمة المفضلة</div>
      <Row className="justify-content-start">
        {list?.length > 0 ? (
          list.map((prod) => (
            <ProductCard key={prod._id} img={prod?.imageCover} />
          ))
        ) : (
          <h2>لا توجد منتجات مفضله</h2>
        )}
      </Row>
      <Pagination
        onPress={changePage}
        pageCount={data?.paginationResult?.numberOfPages}
      />
    </div>
  );
};

export default UserFavoriteProduct;
