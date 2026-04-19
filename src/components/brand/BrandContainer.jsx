import { Link } from "react-router-dom";
import { dummyBrands } from "../../data/dummyData";
import SubTiltle from "../utility/subTitle";

const BrandContainer = () => {
  return (
    <section className="mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SubTiltle title="أشهر الماركات" btntitle="عرض الكل" pathText="/allbrand" />
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mt-6">
          {dummyBrands.map(brand => (
            <Link
              key={brand._id}
              to={`/products?brand=${brand._id}`}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col items-center gap-2 hover:border-primary/20 hover:shadow-md transition-all group"
            >
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${brand.name}&background=6366f1&color=fff`; }}
                />
              </div>
              <span className="text-xs font-bold text-gray-700 group-hover:text-primary transition-colors">{brand.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandContainer;
