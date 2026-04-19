import { Link } from 'react-router-dom';
import { CheckCircle, Package, ShoppingBag, Home } from 'lucide-react';

export default function OrderConfirmationPage() {
  const orderId = '#ORD-' + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12" dir="rtl">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="relative inline-flex mb-8">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle size={48} className="text-green-500" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-white text-lg">
            🎉
          </div>
        </div>

        <h1 className="text-2xl font-black text-gray-900 mb-3">تم تأكيد طلبك بنجاح!</h1>
        <p className="text-gray-500 mb-2">شكراً لك على طلبك. سنقوم بمعالجته في أقرب وقت.</p>
        <p className="text-sm font-semibold text-primary mb-8">رقم الطلب: {orderId}</p>

        {/* Steps */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 mb-8">
          <h2 className="font-bold text-gray-800 mb-5">ما الذي سيحدث بعد ذلك؟</h2>
          <div className="space-y-4">
            {[
              { icon: '📧', title: 'تأكيد بالبريد', desc: 'ستصلك رسالة تأكيد على بريدك الإلكتروني' },
              { icon: '📦', title: 'تجهيز الطلب', desc: 'سيتم تجهيز طلبك خلال 24-48 ساعة' },
              { icon: '🚚', title: 'الشحن والتوصيل', desc: 'سيتم شحن طلبك وإرسال رقم التتبع إليك' },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-4 text-right">
                <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-xl flex-shrink-0">
                  {step.icon}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{step.title}</p>
                  <p className="text-xs text-gray-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/user/allorders" className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-primary text-white rounded-2xl font-bold hover:opacity-90 transition-opacity">
            <Package size={18} /> تتبع طلبك
          </Link>
          <Link to="/products" className="flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-colors">
            <ShoppingBag size={18} /> تسوق المزيد
          </Link>
          <Link to="/" className="flex items-center justify-center gap-2 px-6 py-3.5 border border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-colors">
            <Home size={18} /> الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
