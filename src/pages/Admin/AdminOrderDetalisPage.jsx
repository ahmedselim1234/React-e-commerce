import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Package, ChevronRight, CheckCircle, Truck, CreditCard, MapPin } from 'lucide-react';
import AdminSideBar from '../../components/Admin/AdminSideBar';
import { dummyOrders } from '../../data/dummyData';
import { useToast } from '../../contexts/ToastContext';

export default function AdminOrderDetalisPage() {
  const { id } = useParams();
  const toast = useToast();
  const [order, setOrder] = useState(dummyOrders.find(o => o._id === id) || dummyOrders[0]);

  const markPaid = () => {
    setOrder(prev => ({ ...prev, isPaid: true, paidAt: new Date().toISOString() }));
    toast.success('تم تأكيد الدفع');
  };

  const markDelivered = () => {
    setOrder(prev => ({ ...prev, isDelivered: true, deliveredAt: new Date().toISOString() }));
    toast.success('تم تأكيد التوصيل');
  };

  const fmt = (date) => date ? new Date(date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'غير محدد';

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 flex-shrink-0"><AdminSideBar /></aside>

          <div className="flex-1">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
              <Link to="/admin/allorders" className="hover:text-primary">الطلبات</Link>
              <ChevronRight size={14} className="rotate-180" />
              <span className="text-gray-700 font-medium">#{order._id.slice(-6).toUpperCase()}</span>
            </nav>

            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-black text-gray-900">تفاصيل الطلب</h1>
              <div className="flex gap-2">
                {!order.isPaid && (
                  <button onClick={markPaid} className="flex items-center gap-2 px-4 py-2.5 bg-green-500 text-white rounded-xl text-sm font-semibold hover:bg-green-600 transition-colors">
                    <CheckCircle size={16} /> تأكيد الدفع
                  </button>
                )}
                {order.isPaid && !order.isDelivered && (
                  <button onClick={markDelivered} className="flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors">
                    <Truck size={16} /> تأكيد التوصيل
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Order Items */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
                <h2 className="font-bold text-gray-800 mb-4">منتجات الطلب</h2>
                <div className="space-y-4">
                  {order.cartItems.map(item => (
                    <div key={item._id} className="flex items-center gap-4 pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                      <div className="w-16 h-16 bg-gray-50 rounded-xl p-2 flex items-center justify-center flex-shrink-0">
                        <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-contain mix-blend-multiply" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">{item.product.title}</p>
                        <p className="text-xs text-gray-400">اللون: <span className="inline-block w-3 h-3 rounded-full border mr-1" style={{ backgroundColor: item.color }} /></p>
                        <p className="text-xs text-gray-400">الكمية: {item.quantity}</p>
                      </div>
                      <div className="text-left">
                        <p className="font-black text-gray-900">{item.price * item.quantity} ج.م</p>
                        <p className="text-xs text-gray-400">{item.price} × {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="mt-5 pt-4 border-t border-gray-100 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600"><span>المجموع الفرعي</span><span>{order.cartItems.reduce((s, i) => s + i.price * i.quantity, 0)} ج.م</span></div>
                  <div className="flex justify-between text-gray-600"><span>الضريبة</span><span>{order.taxPrice} ج.م</span></div>
                  <div className="flex justify-between text-gray-600"><span>الشحن</span><span>{order.shippingPrice} ج.م</span></div>
                  <div className="flex justify-between font-black text-gray-900 text-base border-t border-gray-100 pt-2"><span>الإجمالي</span><span>{order.totalOrderPrice} ج.م</span></div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="space-y-4">
                {/* Status */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="font-bold text-gray-800 mb-3">حالة الطلب</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${order.isPaid ? 'bg-green-500' : 'bg-gray-200'}`}>
                        {order.isPaid && <CheckCircle size={12} className="text-white" />}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${order.isPaid ? 'text-green-700' : 'text-gray-400'}`}>مدفوع</p>
                        {order.isPaid && <p className="text-xs text-gray-400">{fmt(order.paidAt)}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${order.isDelivered ? 'bg-blue-500' : 'bg-gray-200'}`}>
                        {order.isDelivered && <Truck size={12} className="text-white" />}
                      </div>
                      <div>
                        <p className={`text-sm font-semibold ${order.isDelivered ? 'text-blue-700' : 'text-gray-400'}`}>تم التوصيل</p>
                        {order.isDelivered && <p className="text-xs text-gray-400">{fmt(order.deliveredAt)}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="font-bold text-gray-800 mb-3">معلومات العميل</h3>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                      {order.user?.first_name?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{order.user?.first_name}</p>
                      <p className="text-xs text-gray-400">{order.user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-600">{order.paymentMethodType === 'cash' ? 'دفع عند الاستلام' : 'بطاقة ائتمان'}</span>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-2xl border border-gray-100 p-5">
                  <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2"><MapPin size={16} className="text-primary" /> عنوان الشحن</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-semibold text-gray-800">{order.shippingAddress?.alias}</p>
                    <p>{order.shippingAddress?.details}</p>
                    <p>{order.shippingAddress?.city} {order.shippingAddress?.postalCode}</p>
                    {order.shippingAddress?.phone && <p className="text-gray-400">{order.shippingAddress.phone}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
