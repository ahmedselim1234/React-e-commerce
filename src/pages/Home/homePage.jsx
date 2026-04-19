import Silder from "../../components/Home/slider";
import HomeCategory from "../../components/Home/HomeCategory";
import CartContainer from "../../components/Products/CartContainer";
import DiscountSection from "../../components/Home/DiscountSection";
import BrandContainer from "../../components/brand/BrandContainer";
import { dummyProducts } from "../../data/dummyData";

export default function HomePage() {
  const bestsellers = [...dummyProducts].sort((a, b) => b.sold - a.sold).slice(0, 4);
  const latest = [...dummyProducts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

  return (
    <div className="bg-background min-h-screen pb-10">
      <Silder />
      <HomeCategory />
      <CartContainer
        title="الأكثر مبيعاً"
        btntitle="عرض الكل"
        pathText="/products?sort=bestseller"
        products={bestsellers}
      />
      <DiscountSection />
      <CartContainer
        title="أحدث المنتجات"
        btntitle="عرض الكل"
        pathText="/products?sort=newest"
        products={latest}
      />
      <BrandContainer />
    </div>
  );
}
