import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Users, Tag, TrendingUp, ArrowUpRight, Star, DollarSign } from 'lucide-react';
import AdminSideBar from '../../components/Admin/AdminSideBar';
import { dummyProducts, dummyOrders, dummyUsers, dummyCoupons } from '../../data/dummyData';

const StatCard = ({ icon: Icon, label, value, sub, color, link }) => (
  <Link to={link} className={`bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-4 hover:shadow-md transition-all hover:border-gray-200 group`}>
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
      <Icon size={22} className="text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs text-gray-500 font-medium">{label}</p>
      <p className="text-2xl font-black text-gray-900">{value}</p>
      {sub && <p className="text-xs text-green-600 font-medium">{sub}</p>}
    </div>
    <ArrowUpRight size={18} className="text-gray-300 group-hover:text-primary transition-colors" />
  </Link>
);

export default function AdminDashboardPage() {
  const totalRevenue = dummyOrders.filter(o => o.isPaid).reduce((s, o) => s + o.totalOrderPrice, 0);
  const pendingOrders = dummyOrders.filter(o => !o.isPaid).length;
  const deliveredOrders = dummyOrders.filter(o => o.isDelivered).length;
  const avgRating = (dummyProducts.reduce((s, p) => s + (p.Averagerating || 0), 0) / dummyProducts.length).toFixed(1);

  const recentOrders = [...dummyOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 flex-shrink-0">
            <AdminSideBar />
          </aside>

          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-black text-gray-900">لوحة التحكم</h1>
              <p className="text-gray-500 text-sm mt-1">مرحباً بك في لوحة إدارة متجرك</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard icon={DollarSign} label="إجمالي الإيرادات" value={`${totalRevenue.toLocaleString()} ج.م`} sub="من الطلبات المدفوعة" color="bg-gradient-primary" link="/admin/allorders" />
              <StatCard icon={ShoppingCart} label="إجمالي الطلبات" value={dummyOrders.length} sub={`${pendingOrders} بانتظار المعالجة`} color="bg-orange-400" link="/admin/allorders" />
              <StatCard icon={Package} label="المنتجات" value={dummyProducts.length} sub="منتج نشط" color="bg-blue-500" link="/admin/allproducts" />
              <StatCard icon={Users} label="المستخدمون" value={dummyUsers.length} sub="مستخدم مسجل" color="bg-purple-500" link="/admin/users" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Quick Stats */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="font-bold text-gray-800 mb-4">إحصاءات سريعة</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'طلبات مدفوعة', value: dummyOrders.filter(o => o.isPaid).length, color: 'text-green-600' },
                      { label: 'طلبات معلقة', value: pendingOrders, color: 'text-orange-500' },
                      { label: 'تم التوصيل', value: deliveredOrders, color: 'text-blue-600' },
                      { label: 'متوسط التقييم', value: avgRating + ' ⭐', color: 'text-yellow-600' },
                      { label: 'كوبونات نشطة', value: dummyCoupons.length, color: 'text-purple-600' },
                    ].map((stat, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                        <span className="text-sm text-gray-600">{stat.label}</span>
                        <span className={`text-sm font-bold ${stat.color}`}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="font-bold text-gray-800 mb-3">إجراءات سريعة</h3>
                  <div className="space-y-2">
                    {[
                      { label: 'إضافة منتج', to: '/admin/addproduct', color: 'text-primary' },
                      { label: 'إضافة تصنيف', to: '/admin/addcategory', color: 'text-blue-600' },
                      { label: 'إضافة ماركة', to: '/admin/addbrand', color: 'text-purple-600' },
                      { label: 'إدارة الكوبونات', to: '/admin/coupons', color: 'text-green-600' },
                    ].map((link, i) => (
                      <Link key={i} to={link.to} className={`flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors ${link.color}`}>
                        <span className="text-sm font-semibold">{link.label}</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">آخر الطلبات</h3>
                  <Link to="/admin/allorders" className="text-xs text-primary hover:underline font-medium">عرض الكل</Link>
                </div>
                <div className="space-y-3">
                  {recentOrders.map(order => (
                    <Link key={order._id} to={`/admin/orders/${order._id}`} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Package size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">#{order._id.slice(-6).toUpperCase()}</p>
                          <p className="text-xs text-gray-400">{order.user?.first_name}</p>
                        </div>
                      </div>
                      <div className="text-left flex items-center gap-3">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full
                          ${order.isDelivered ? 'bg-green-100 text-green-700' : order.isPaid ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {order.isDelivered ? 'تم التوصيل' : order.isPaid ? 'مدفوع' : 'معلق'}
                        </span>
                        <span className="text-sm font-bold text-gray-800">{order.totalOrderPrice} ج.م</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-800">أفضل المنتجات مبيعاً</h3>
                <Link to="/admin/allproducts" className="text-xs text-primary hover:underline font-medium">عرض الكل</Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-50">
                      <th className="text-right pb-3 text-xs text-gray-400 font-medium">المنتج</th>
                      <th className="text-right pb-3 text-xs text-gray-400 font-medium">القسم</th>
                      <th className="text-right pb-3 text-xs text-gray-400 font-medium">السعر</th>
                      <th className="text-right pb-3 text-xs text-gray-400 font-medium">المبيعات</th>
                      <th className="text-right pb-3 text-xs text-gray-400 font-medium">التقييم</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {[...dummyProducts].sort((a, b) => b.sold - a.sold).slice(0, 5).map(product => (
                      <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center p-1">
                              <img src={product.imageCover} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                            </div>
                            <span className="font-medium text-gray-800 max-w-[140px] truncate">{product.title}</span>
                          </div>
                        </td>
                        <td className="py-3 text-gray-500">{product.category.name}</td>
                        <td className="py-3 font-semibold text-gray-800">{product.priceAfterDiscount || product.price} ج.م</td>
                        <td className="py-3 text-gray-700 font-medium">{product.sold}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            <span className="text-gray-700 font-medium">{product.Averagerating}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
