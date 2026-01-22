import Silder from "../../components/Home/slider";
import HomeCategory from "../../components/Home/HomeCategory";
import CartContainer from "../../components/Products/CartContainer";
import DiscountSection from "../../components/Home/DiscountSection";

import BrandSection from "../../components/Home/BrandSection";
import BestSeller from "../../components/Home/bestSeller";

export default function HomePage() {
  return (
    <div className="font" style={{ minHeight: "670px" }}>
      <Silder />
      <HomeCategory />
      <BestSeller/>
      <CartContainer
        title={"احدث الازياء"}
        btntitle={"المزيد"}
        pathText={"/products"}
      />
      <DiscountSection />
      <BrandSection />
    </div>
  );
}
