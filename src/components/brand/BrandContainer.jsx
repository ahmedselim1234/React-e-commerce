import BrandCard from "./BrandCard";
import { Container, Row } from "react-bootstrap";
import SubTiltle from "../utility/subTitle";



const BrandContainer = ({ data }) => {
  return (
    <Container>
      <SubTiltle
        title={"اشهر البراندات "}
        btntitle={"المزيد"}
        pathText={"/allbrand"}
      />
      <Row className="my-1 d-flex justify-content-between">
        {data?.data?.length > 0 ? (
          data.data.map((category) => (
            <BrandCard
              key={category._id}
              title={category.name}
              img={category.image}
            />
          ))
        ) : (
          <div>لا يوجد براندات</div>
        )}
      </Row>
    </Container>
  );
};

export default BrandContainer;
