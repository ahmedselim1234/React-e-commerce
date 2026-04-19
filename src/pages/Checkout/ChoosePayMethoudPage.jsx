import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CreditCard, Banknote, Shield, ChevronRight, Check, Lock } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export default function ChoosePayMethoudPage() {
  const { totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [method, setMethod] = useState('cash');
  const [loading, setLoading] = useState(false);

  const handleOrder = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    clearCart();
    toast.success('تم تأكيد طلبك بنجاح! 🎉');
    navigate('/order/confirmation');
    setLoading(false);
  };

  const methods = [
    {
      id: 'cash',
      label: 'الدفع عند الاستلام',
      desc: 'ادفع نقداً عند وصول طلبك',
      icon: Banknote,
      badge: 'الأكثر شيوعاً',
      badgeColor: 'bg-green-100 text-green-700',
    },
    {
      id: 'card',
      label: 'بطاقة ائتمان / فيزا',
      desc: 'ادفع بأمان بواسطة Stripe',
      icon: CreditCard,
      badge: 'مدفوع مسبقاً',
      badgeColor: 'bg-blue-100 text-blue-700',
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/cart" className="hover:text-primary">العربة</Link>
          <ChevronRight size={14} className="rotate-180" />
          <Link to="/checkout" className="hover:text-primary">عنوان الشحن</Link>
          <ChevronRight size={14} className="rotate-180" />
          <span className="text-gray-700 font-medium">طريقة الدفع</span>
        </nav>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-8">
          {['عنوان الشحن', 'طريقة الدفع', 'تأكيد الطلب'].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                ${i === 0 ? 'bg-green-500 text-white' : i === 1 ? 'bg-gradient-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                {i === 0 ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${i === 1 ? 'text-gray-800' : i === 0 ? 'text-green-600' : 'text-gray-400'}`}>{step}</span>
              {i < 2 && <div className={`w-6 h-px ${i === 0 ? 'bg-green-300' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-5">اختر طريقة الدفع</h2>

            <div className="space-y-4">
              {methods.map(m => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`w-full text-right p-5 rounded-2xl border-2 transition-all ${method === m.id ? 'border-primary bg-primary/5' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${method === m.id ? 'bg-gradient-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                        <m.icon size={22} />
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-gray-800">{m.label}</p>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${m.badgeColor}`}>{m.badge}</span>
                        </div>
                        <p className="text-sm text-gray-500">{m.desc}</p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 transition-all flex-shrink-0 ${method === m.id ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                      {method === m.id && <Check size={12} className="text-white m-auto" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Card Form (placeholder) */}
            {method === 'card' && (
              <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Lock size={16} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-700">بيانات البطاقة (تجريبية)</span>
                </div>
                <div className="space-y-3">
                  <input type="text" placeholder="1234 5678 9012 3456" maxLength={19} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" dir="ltr" />
                  <div className="flex gap-3">
                    <input type="text" placeholder="MM/YY" maxLength={5} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" dir="ltr" />
                    <input type="text" placeholder="CVV" maxLength={3} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" dir="ltr" />
                  </div>
                  <input type="text" placeholder="اسم حامل البطاقة" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" />
                </div>
              </div>
            )}

            {/* Security */}
            <div className="mt-5 flex items-center gap-3 p-4 bg-gray-50 rounded-2xl">
              <Shield size={20} className="text-green-600 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-gray-700">دفع آمن 100%</p>
                <p className="text-xs text-gray-500">بياناتك محمية بتشفير SSL 256-bit</p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">إجمالي الطلب</h3>
              <div className="text-3xl font-black text-gradient mb-5 text-center py-3 bg-gray-50 rounded-2xl">
                {totalPrice} ج.م
              </div>
              <div className="text-xs text-gray-400 text-center mb-5">شامل الضريبة والشحن</div>

              <button
                onClick={handleOrder}
                disabled={loading}
                className="w-full py-4 bg-gradient-primary text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-70"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    جاري تأكيد الطلب...
                  </span>
                ) : (
                  method === 'card' ? 'ادفع الآن' : 'تأكيد الطلب'
                )}
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">بالمتابعة، أنت توافق على شروط الاستخدام</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
