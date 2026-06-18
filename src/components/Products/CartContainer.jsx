import SubTiltle from "../utility/subTitle";
import ProductCard from "./ProductCard";

const CartContainer = ({ title, btntitle, pathText, products = [] }) => {
  return (
    <section className="mb-12 sm:mb-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mt-4 sm:mt-6">
          {products.length > 0 ? (
            products.map((item, index) => (
              <ProductCard key={index} product={item} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500 font-medium">
              لا توجد منتجات حالياً
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartContainer;
