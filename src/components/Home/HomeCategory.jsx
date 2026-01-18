import { Container, Row } from "react-bootstrap";
import SubTiltle from "../utility/subTitle";
import CategoryCard from "../category/CategoryCard";

import { useGetCategoryQuery } from "../../redux/features/category/categorySlice";

const HomeCategory = () => {
  const { isError, error, data, isLoading } = useGetCategoryQuery({});

  console.log(data);
  console.log(isLoading);

  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#FFD93D",
    "#6C5CE7",
    "#1DD1A1",
    "#54A0FF",
  ];

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
      <SubTiltle title="التصنيفات" btntitle="المزيد" pathText="/allcategory" />

      <Row className="my-2 d-flex justify-content-between">
        {data?.data?.length > 0 ? (
          data.data
            .slice(0, 5)
            .map((category, index) => (
              <CategoryCard
                key={category._id}
                title={category.name}
                img={category.image}
                background={colors[index]}
              />
            ))
        ) : (
          <div>لا يوجد بيانات</div>
        )}
      </Row>
    </Container>
  );
};

export default HomeCategory;
