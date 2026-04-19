import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, ChevronDown, ChevronUp, Eye } from 'lucide-react';
import UserSideBar from '../../components/User/UserSideBar';
import { dummyOrders } from '../../data/dummyData';
import { useAuth } from '../../contexts/AuthContext';

const statusInfo = {
  pending: { label: 'قيد المعالجة', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  paid: { label: 'مدفوع', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  delivered: { label: 'تم التوصيل', color: 'bg-green-50 text-green-700 border-green-200' },
};

function getStatus(order) {
  if (order.isDelivered) return 'delivered';
  if (order.isPaid) return 'paid';
  return 'pending';
}

export default function UserAllOrdersPage() {
  const { user } = useAuth();
  const orders = dummyOrders.filter(o => o.user._id === user?._id);
  const [expanded, setExpanded] = useState(null);

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background pb-16" dir="rtl">
        <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <aside className="lg:w-64"><UserSideBar /></aside>
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
              <Package size={56} className="text-gray-200 mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">لا توجد طلبات</h3>
              <p className="text-gray-400 mb-6">لم تقم بإجراء أي طلبات بعد</p>
              <Link to="/products" className="px-6 py-3 bg-gradient-primary text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity">تسوق الآن</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64"><UserSideBar /></aside>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-gray-900 mb-6">طلباتي ({orders.length})</h2>
            <div className="space-y-4">
              {orders.map(order => {
                const status = getStatus(order);
                const { label, color } = statusInfo[status];
                const isExpanded = expanded === order._id;

                return (
                  <div key={order._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors">
                    {/* Order Header */}
                    <div className="flex items-center justify-between p-5 flex-wrap gap-3">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Package size={20} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">طلب #{order._id.slice(-6).toUpperCase()}</p>
                          <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${color}`}>{label}</span>
                        <span className="font-black text-gray-900">{order.totalOrderPrice} ج.م</span>
                        <button
                          onClick={() => setExpanded(isExpanded ? null : order._id)}
                          className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                        >
                          {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                      </div>
                    </div>

                    {/* Order Items (Expanded) */}
                    {isExpanded && (
                      <div className="border-t border-gray-50 px-5 pb-5 pt-4">
                        <div className="space-y-3 mb-4">
                          {order.cartItems.map(item => (
                            <div key={item._id} className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center p-1.5 flex-shrink-0">
                                <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-contain mix-blend-multiply" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">{item.product.title}</p>
                                <p className="text-xs text-gray-400">الكمية: {item.quantity}</p>
                              </div>
                              <span className="text-sm font-bold text-gray-800">{item.price * item.quantity} ج.م</span>
                            </div>
                          ))}
                        </div>

                        <div className="bg-gray-50 rounded-xl p-4 space-y-1.5 text-xs text-gray-600">
                          <div className="flex justify-between"><span>طريقة الدفع</span><span className="font-medium">{order.paymentMethodType === 'cash' ? 'دفع عند الاستلام' : 'بطاقة ائتمان'}</span></div>
                          <div className="flex justify-between"><span>عنوان الشحن</span><span className="font-medium">{order.shippingAddress?.alias} - {order.shippingAddress?.city}</span></div>
                          <div className="flex justify-between font-bold text-gray-800 text-sm pt-1 border-t border-gray-100">
                            <span>الإجمالي</span><span>{order.totalOrderPrice} ج.م</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
