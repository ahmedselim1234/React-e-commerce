import { Link } from 'react-router-dom';
import { dummyCategories, dummySubCategories } from '../../data/dummyData';

export default function AllCategoryPage() {
  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-gray-900">جميع الأقسام</h1>
          <p className="text-gray-500 text-sm mt-1">{dummyCategories.length} قسم رئيسي</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {dummyCategories.map(cat => {
            const subCats = dummySubCategories.filter(s => s.category === cat._id);
            return (
              <Link
                key={cat._id}
                to={`/products?category=${cat._id}`}
                className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all"
              >
                <div className="relative h-36 overflow-hidden">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                  <h2 className="absolute bottom-3 right-3 text-white font-black text-base">{cat.name}</h2>
                </div>
                <div className="p-4">
                  {subCats.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {subCats.slice(0, 3).map(sub => (
                        <span key={sub._id} className="text-[10px] font-medium px-2 py-1 bg-gray-50 text-gray-600 rounded-full border border-gray-100">
                          {sub.name}
                        </span>
                      ))}
                      {subCats.length > 3 && (
                        <span className="text-[10px] font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">+{subCats.length - 3}</span>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400">تصفح المنتجات</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
