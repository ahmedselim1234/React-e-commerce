import { Row } from "react-bootstrap";
import { useGetCategoryQuery } from "../../redux/features/category/categorySlice";
import { useGetbrandQuery } from "../../redux/features/brand/brandSlice";

const SideFilter = ({ onCategoryChange, onBrandChange }) => {
  const { data: categories } = useGetCategoryQuery({});
  const { data: brands } = useGetbrandQuery({});
  console.log(categories);
  console.log(brands);
  return (
    <div className="mt-3">
      <Row>
        <div className="d-flex flex-column mt-2 text-end">
          <div className="filter-title">الفئة</div>
          <div className="d-flex mt-3">
            <input type="checkbox" value="" />
            <div className="filter-sub me-2 ">الكل</div>
          </div>

          {categories?.data?.map((cat) => (
            <div className="d-flex mt-2" key={cat._id}>
              <input
                type="checkbox"
                onChange={(e) => onCategoryChange(cat._id, e.target.checked)}
              />
              <div className="filter-sub me-2 ">{cat?.name}</div>
            </div>
          ))}
        </div>

        <div className="d-flex flex-column mt-2">
          <div className="filter-title mt-3">الماركة</div>

          <div className="d-flex mt-3">
            <input type="checkbox" value="" />
            <div className="filter-sub me-2 ">الكل</div>
          </div>

          {brands?.data?.map((brand) => (
            <div className="d-flex mt-2" key={brand._id}>
              <input
                type="checkbox"
                onChange={(e) => onBrandChange(brand._id, e.target.checked)}
              />
              <div className="filter-sub me-2 ">{brand?.name}</div>
            </div>
          ))}
        </div>

        {/* السعر */}
      </Row>
    </div>
  );
};

export default SideFilter;

{
  /* <div className="filter-title my-3">السعر</div>
        <div className="d-flex">
          <p className="filter-sub my-2">من:</p>
          <input
            className="m-2 text-center"
            type="number"
            style={{ width: "50px", height: "25px" }}
          />
        </div>
        <div className="d-flex">
          <p className="filter-sub my-2">الي:</p>
          <input
            className="m-2 text-center"
            type="number"
            style={{ width: "50px", height: "25px" }}
          />
        </div> */
}
