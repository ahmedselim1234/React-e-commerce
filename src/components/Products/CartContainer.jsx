import { Container, Row } from "react-bootstrap";
import SubTiltle from "../utility/subTitle";
import ProductCard from "./ProductCard";
import { useLatestProductsQuery } from "../../redux/features/product/productSlice";

const CartContainer = ({ title, btntitle, pathText }) => {
  const { data,isLoading} = useLatestProductsQuery();
  const latestProducts = data?.data;
if(isLoading){
   return (
  <>
  <div>loading....</div>
  </>
 )
}
  return (
    <>
      <Container>
        <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
        <Row className="my-2 d-flex justify-content-between">
          {latestProducts?.map((prod) => (
            <ProductCard id={prod._id} key={prod._id} img={prod.imageCover} />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default CartContainer;
