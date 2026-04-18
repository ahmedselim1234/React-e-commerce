import { Row } from "react-bootstrap";
import AdminAllProductsCard from "./AdminAllProductsCard";
import { useGetAllProductsQuery } from "../../redux/features/product/productSlice";

const AdminAllProducts = () => {
  const { data, isLoading } = useGetAllProductsQuery();
  const prods = data?.data;
  if (isLoading) {
    return (
      <>
        <h2>Loading...</h2>
      </>
    );
  }

  return (
    <div>
      <div className="admin-content-text">ادارة جميع المنتجات</div>
      <Row className="justify-content-start">
        {prods?.map((prod) => (
          <AdminAllProductsCard
            id={prod._id}
            key={prod._id}
            Averagerating={prod.Averagerating}
            img={prod.imageCover}
            price={prod.price}
            title={prod.title}
          />
        ))}
      </Row>
    </div>
  );
};



export default AdminAllProducts;
