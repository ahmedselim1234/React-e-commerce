import BrandCard from "../brand/BrandCard";

import { Container, Row } from "react-bootstrap";
import SubTiltle from "../utility/subTitle";

import { useGetbrandQuery } from "../../redux/features/brand/brandSlice";

const BrandSection= () => {
  const { data, error, isLoading, isError } = useGetbrandQuery({});

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
    <Container>
      <SubTiltle
        title={"اشهر الماركات "}
        btntitle={"المزيد"}
        pathText={"/allbrand"}
      />
      <Row className="my-1 d-flex justify-content-between">
        {data?.data?.length > 0 ? (
          data.data
            .slice(0, 4)
            .map((brand) => (
              <BrandCard key={brand._id} title={brand.name} img={brand.image} />
            ))
        ) : (
          <div>لا يوجد بيانات</div>
        )}
      </Row>
    </Container>
  );
};

export default BrandSection;
