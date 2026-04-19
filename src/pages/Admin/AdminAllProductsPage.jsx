import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Trash2, Edit3, Star } from 'lucide-react';
import AdminSideBar from '../../components/Admin/AdminSideBar';
import { dummyProducts } from '../../data/dummyData';
import { useToast } from '../../contexts/ToastContext';

export default function AdminAllProductsPage() {
  const toast = useToast();
  const [products, setProducts] = useState(dummyProducts);
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setProducts(prev => prev.filter(p => p._id !== id));
    toast.success('تم حذف المنتج');
  };

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 flex-shrink-0"><AdminSideBar /></aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-black text-gray-900">إدارة المنتجات</h1>
                <p className="text-gray-500 text-sm mt-1">{products.length} منتج</p>
              </div>
              <Link to="/admin/addproduct" className="flex items-center gap-2 px-4 py-2.5 bg-gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                <Plus size={16} /> إضافة منتج
              </Link>
            </div>

            <div className="relative mb-5">
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث عن منتج..." className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">المنتج</th>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">القسم</th>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">السعر</th>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">المخزون</th>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">التقييم</th>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map(product => (
                      <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-50 rounded-xl p-1.5 flex items-center justify-center flex-shrink-0">
                              <img src={product.imageCover} alt={product.title} className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 max-w-[180px] truncate">{product.title}</p>
                              <p className="text-xs text-gray-400">{product.brand?.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-600">{product.category.name}</td>
                        <td className="px-5 py-4">
                          <p className="font-bold text-gray-800">{product.priceAfterDiscount || product.price} ج.م</p>
                          {product.priceAfterDiscount && <p className="text-xs text-gray-400 line-through">{product.price} ج.م</p>}
                        </td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${product.quantity > 5 ? 'bg-green-100 text-green-700' : product.quantity > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                            {product.quantity > 0 ? product.quantity : 'نفد'}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-1">
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            <span className="font-medium text-gray-700">{product.Averagerating}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-1">
                            <Link to="/admin/addproduct" className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-colors">
                              <Edit3 size={15} />
                            </Link>
                            <button onClick={() => handleDelete(product._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filtered.length === 0 && (
                  <div className="py-12 text-center text-gray-400">
                    <Search size={36} className="mx-auto mb-3 opacity-30" />
                    <p>لا توجد منتجات مطابقة</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
