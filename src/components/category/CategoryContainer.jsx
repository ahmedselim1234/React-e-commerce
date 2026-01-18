import { Container, Row } from "react-bootstrap";
import CategoryCard from "./CategoryCard";


const CategoryContainer = ({data}) => {


  return (
    <Container>
      <div className="admin-content-text mt-2 ">كل التصنيفات</div>
      <Row className="my-2 d-flex justify-content-between">
        {data?.data?.length > 0 ? (
          data.data.map((category, index) => (
            <CategoryCard
              key={category._id}
              title={category.name}
              img={category.image}
              background={colors[index % colors.length]}
            />
          ))
        ) : (
          <div>لا يوجد تصنيفات</div>
        )}
      </Row>
    </Container>
  );
};

export default CategoryContainer;

const colors = [
  "#FF6B6B",
  "#4ECDC4",
  "#FFD93D",
  "#6C5CE7",
  "#1DD1A1",
  "#54A0FF",
];
