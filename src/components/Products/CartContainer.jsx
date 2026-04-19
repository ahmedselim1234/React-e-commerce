import SubTiltle from "../utility/subTitle";
import ProductCard from "./ProductCard";

const CartContainer = ({ title, btntitle, pathText, products = [] }) => {
  return (
    <section className="mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SubTiltle title={title} btntitle={btntitle} pathText={pathText} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
            {products.length > 0 ? (
                products.map((item, index) => (
                    <ProductCard key={index} product={item} />
                ))
            ) : (
                <div className="col-span-full text-center py-10 text-gray-500 font-medium">لا توجد منتجات حالياً</div>
            )}
        </div>
      </div>
    </section>
  );
};

export default CartContainer;
