import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Eye, CheckCircle, Truck, Search } from 'lucide-react';
import AdminSideBar from '../../components/Admin/AdminSideBar';
import { dummyOrders } from '../../data/dummyData';
import { useToast } from '../../contexts/ToastContext';

export default function AdminAllOrdersPage() {
  const toast = useToast();
  const [orders, setOrders] = useState(dummyOrders);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = orders.filter(o => {
    const matchSearch = o._id.includes(search) || o.user?.first_name?.includes(search);
    const matchFilter = filter === 'all' || (filter === 'paid' && o.isPaid) || (filter === 'pending' && !o.isPaid) || (filter === 'delivered' && o.isDelivered);
    return matchSearch && matchFilter;
  });

  const markPaid = (id) => {
    setOrders(prev => prev.map(o => o._id === id ? { ...o, isPaid: true, paidAt: new Date().toISOString() } : o));
    toast.success('تم تأكيد الدفع');
  };

  const markDelivered = (id) => {
    setOrders(prev => prev.map(o => o._id === id ? { ...o, isDelivered: true, deliveredAt: new Date().toISOString() } : o));
    toast.success('تم تأكيد التوصيل');
  };

  const filterTabs = [
    { id: 'all', label: 'الكل', count: orders.length },
    { id: 'pending', label: 'معلقة', count: orders.filter(o => !o.isPaid).length },
    { id: 'paid', label: 'مدفوعة', count: orders.filter(o => o.isPaid).length },
    { id: 'delivered', label: 'تم التوصيل', count: orders.filter(o => o.isDelivered).length },
  ];

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 flex-shrink-0"><AdminSideBar /></aside>

          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-900 mb-2">إدارة الطلبات</h1>
            <p className="text-gray-500 text-sm mb-6">{orders.length} طلب إجمالي</p>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-5 flex-wrap">
              {filterTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFilter(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${filter === tab.id ? 'bg-gradient-primary text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                >
                  {tab.label}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === tab.id ? 'bg-white/20' : 'bg-gray-100'}`}>{tab.count}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative mb-5">
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="ابحث برقم الطلب أو اسم العميل..." className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">رقم الطلب</th>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">العميل</th>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">الإجمالي</th>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">الدفع</th>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">التوصيل</th>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map(order => (
                      <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <Package size={16} className="text-primary" />
                            <span className="font-bold text-gray-800">#{order._id.slice(-6).toUpperCase()}</span>
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString('ar-EG')}</p>
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-medium text-gray-800">{order.user?.first_name}</p>
                          <p className="text-xs text-gray-400">{order.paymentMethodType === 'cash' ? 'نقدي' : 'بطاقة'}</p>
                        </td>
                        <td className="px-5 py-4 font-bold text-gray-800">{order.totalOrderPrice} ج.م</td>
                        <td className="px-5 py-4">
                          {order.isPaid ? (
                            <span className="text-xs font-semibold px-2.5 py-1 bg-green-100 text-green-700 rounded-full">مدفوع</span>
                          ) : (
                            <button onClick={() => markPaid(order._id)} className="text-xs font-semibold px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full hover:bg-orange-200 transition-colors">
                              تأكيد الدفع
                            </button>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          {order.isDelivered ? (
                            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full">تم التوصيل</span>
                          ) : (
                            <button onClick={() => markDelivered(order._id)} disabled={!order.isPaid} className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-40">
                              تأكيد التوصيل
                            </button>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <Link to={`/admin/orders/${order._id}`} className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-colors inline-flex">
                            <Eye size={16} />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filtered.length === 0 && (
                  <div className="py-12 text-center text-gray-400">
                    <Package size={36} className="mx-auto mb-3 opacity-30" />
                    <p>لا توجد طلبات مطابقة</p>
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
