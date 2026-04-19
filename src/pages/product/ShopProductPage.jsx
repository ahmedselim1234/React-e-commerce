import CategoryHeader from "../../components/category/CategoryHeader";
import OrderBy from "../../components/utility/OrderBy";
import SideFilter from "../../components/utility/SideFilter";
import CartContainer from "../../components/Products/CartContainer";
import Pagination1 from "../../components/utility/Pagination";
import { dummyProducts } from "../../data/dummyData";

const ShopProductPage = () => {
  return (
    <div className="min-h-screen bg-background pb-10">
      <CategoryHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <OrderBy title={`${dummyProducts.length} منتج متاح`} />

        <div className="flex flex-col md:flex-row gap-8 mt-6" dir="rtl">
          {/* Sidebar */}
          <div className="w-full md:w-1/4 lg:w-1/5 shrink-0">
            <SideFilter />
          </div>
          
          {/* Products Grid */}
          <div className="w-full md:w-3/4 lg:w-4/5">
            <CartContainer
              products={dummyProducts}
            />
            {/* Pagination Component kept from old logic */}
            <div className="mt-10 flex justify-center">
              <Pagination1 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProductPage;
