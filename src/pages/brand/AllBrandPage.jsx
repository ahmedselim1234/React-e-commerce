import { Link } from 'react-router-dom';
import { dummyBrands } from '../../data/dummyData';

export default function AllBrandPage() {
  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900">جميع الماركات</h1>
          <p className="text-gray-500 text-sm mt-1">{dummyBrands.length} ماركة عالمية</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {dummyBrands.map(brand => (
            <Link
              key={brand._id}
              to={`/products?brand=${brand._id}`}
              className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all"
            >
              <div className="h-40 overflow-hidden bg-gray-50 flex items-center justify-center p-6">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${brand.name}&background=f8fafc&color=6366f1&size=200`; }}
                />
              </div>
              <div className="p-4 text-center">
                <h2 className="font-black text-gray-800 text-base group-hover:text-primary transition-colors">{brand.name}</h2>
                <p className="text-xs text-gray-400 mt-1">تصفح منتجات {brand.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
