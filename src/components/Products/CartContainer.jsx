import { Container, Row } from "react-bootstrap";
import SubTiltle from "../utility/subTitle";
import ProductCard from "./ProductCard";
import prod1 from "../../images/prod1.png";
import prod2 from "../../images/mobile.png";
import prod3 from "../../images/mobile1.png";
import prod4 from "../../images/mobile2.png";

const CartContainer = ({ title, btntitle, pathText }) => {
  return (
 <>
    <Container>
      <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
      <Row className="my-2 d-flex justify-content-between">
        <ProductCard img={prod1} />
        <ProductCard img={prod2} />
        <ProductCard img={prod3} />
        <ProductCard img={prod4} />
      </Row>
    </Container>
 </>
  );
};

export default CartContainer;
