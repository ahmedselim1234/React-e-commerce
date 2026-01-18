import { Col, Container, Row } from "react-bootstrap";
import CategoryHeader from "../../components/category/CategoryHeader";

import OrderBy from "../../components/utility/OrderBy";

import SideFilter from "../../components/utility/SideFilter";

import CartContainer from "../../components/Products/CartContainer";

import Pagination from "../../components/utility/Pagination";

const ShopProductPage = () => {
  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryHeader />

      <Container>
        <OrderBy title={"100 منتج...."} />

        <Row className="d-flex flex-row">
          <Col sm="2" xs="2" md="1" className="d-flex">
            <SideFilter />
          </Col>
          <Col sm="10" xs="10" md="11">
            <CartContainer />
          </Col>
          <Pagination />
        </Row>
      </Container>
    </div>
  );
};

export default ShopProductPage;
