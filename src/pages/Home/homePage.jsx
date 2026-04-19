import Silder from "../../components/Home/slider";
import HomeCategory from "../../components/Home/HomeCategory";
import CartContainer from "../../components/Products/CartContainer";
import DiscountSection from "../../components/Home/DiscountSection";
import BrandContainer from "../../components/brand/BrandContainer";
import { dummyProducts } from "../../data/dummyData";

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen pb-10">
      <Silder />
      <HomeCategory />
      <CartContainer
        title={"الأكثر مبيعاً"}
        btntitle={"المزيد"}
        pathText={"/products"}
        products={dummyProducts.slice(0, 4)}
      />
      <DiscountSection />
      <CartContainer
        title={"أحدث المنتجات"}
        btntitle={"المزيد"}
        pathText={"/products"}
        products={dummyProducts.slice(0, 4).reverse()}
      />
      {/* Dimmed out older sections until they are replaced */}
      <div className="opacity-50 pointer-events-none grayscale">
        <BrandContainer />
      </div>
    </div>
  );
}
