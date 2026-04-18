import { Col, Container, Row } from "react-bootstrap";
import CategoryHeader from "../../components/category/CategoryHeader";
import OrderBy from "../../components/utility/OrderBy";
import SideFilter from "../../components/utility/SideFilter";
import Pagination from "../../components/utility/Pagination";
import ProductCard from "../../components/Products/ProductCard";
import { useGetProductsByFilterQuery } from "../../redux/features/product/productSlice";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

const ShopProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  console.log(selectedCategories)
  console.log(selectedBrands)

  const keyword = searchParams.get("keyword") || "";
const { data, isLoading } = useGetProductsByFilterQuery({
  limit: 3,
  page: currentPage,
  keyword,
  sort,
   category: [...selectedCategories],
  brand: [...selectedBrands],
});

  const changePage = (page) => {
    setCurrentPage(page);
  };
  const Products = data?.data;
  console.log(data);

  const handleCategoryChange = (id, checked) => {
    setCurrentPage(1);
    setSelectedCategories((prev) =>
      checked ? [...prev, id] : prev.filter((c) => c !== id),
    );
  };

  const handleBrandChange = (id, checked) => {
    setCurrentPage(1);
    setSelectedBrands((prev) =>
      checked ? [...prev, id] : prev.filter((b) => b !== id),
    );
  };

  if (isLoading) {
    return (
      <>
        <div>loading....</div>
      </>
    );
  }
  return (
    <div style={{ minHeight: "670px" }}>
      <CategoryHeader />

      <Container>
        <OrderBy
          title={`${Products?.length || 0} منتج....`}
          onSort={(value) => {
            setSort(value);
            setCurrentPage(1);
          }}
        />

        <Row className="d-flex flex-row">
          <Col sm="2" xs="2" md="1" className="d-flex">
            <SideFilter
              onCategoryChange={handleCategoryChange}
              onBrandChange={handleBrandChange}
            />
          </Col>
          <Col sm="10" xs="10" md="11">
            <Container>
              <Row className="my-2 d-flex justify-content-between">
                {Products?.length > 0 ? (
                  Products?.map((prod) => (
                    <ProductCard
                      id={prod._id}
                      key={prod._id}
                      img={prod.imageCover}
                      title={prod.title}
                      price={prod.price}
                    />
                  ))
                ) : (
                  <h1 className="flex items-center">لايوجد بيانات مطابقه </h1>
                )}
              </Row>
            </Container>
          </Col>
          <Pagination
            pageCount={data?.paginatetionResult.NumberOfPages}
            onPress={changePage}
          />
        </Row>
      </Container>
    </div>
  );
};

export default ShopProductPage;
