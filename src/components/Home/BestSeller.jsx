


import { Container, Row } from "react-bootstrap";
import { useGetProductsByFilterQuery } from "../../redux/features/product/productSlice";
import ProductCard from "../Products/ProductCard";
import SubTiltle from "../utility/subTitle";

const BestSeller = () => {
  const { data, isError, isLoading } = useGetProductsByFilterQuery({
    sort: "-sold",
  });


  const products = data?.data || [];

  if (isLoading) return <div>جارٍ التحميل...</div>;
  if (isError) return <div>حدث خطأ أثناء تحميل المنتجات</div>;
  if (products.length === 0) return <div>لا يوجد منتجات للعرض</div>;

  return (
    <Container>
      <SubTiltle
        title={"الاكثر مبيعا"}
        btntitle={"المزيد"}
        pathText={"/products"}
      />
      <Row className="my-2 d-flex justify-content-between">
        {products.slice(0, 4).map((prod) => (
          <ProductCard
            key={prod._id}
            description={prod.description}
            price={prod.price}
            rating={prod.ratingsQuantity}
            img={prod.imageCover}
          />
        ))}
      </Row>
    </Container>
  );
};

export default BestSeller;
