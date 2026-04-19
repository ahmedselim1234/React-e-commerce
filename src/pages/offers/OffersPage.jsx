import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Tag, Zap, ArrowLeft } from 'lucide-react';
import ProductCard from '../../components/Products/ProductCard';
import { dummyProducts } from '../../data/dummyData';

// Compute time remaining until end of day
function getTimeLeft() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diff = Math.max(0, end - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s };
}

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl px-4 py-3 min-w-16 text-center">
        <span className="text-3xl font-black text-white tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-white/70 text-xs mt-1.5 font-medium">{label}</span>
    </div>
  );
}

export default function OffersPage() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const discountedProducts = dummyProducts.filter(
    p => p.priceAfterDiscount && p.priceAfterDiscount < p.price
  );

  return (
    <div className="min-h-screen bg-background" dir="rtl">

      {/* Hero Banner */}
      <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 40%, #ec4899 100%)' }}>
        {/* Decorative circles */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10" />
        <div className="absolute -bottom-20 -left-10 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute top-8 left-1/3 w-32 h-32 rounded-full bg-white/10" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 mb-6">
            <Zap size={14} className="text-yellow-300" />
            <span className="text-white text-sm font-semibold">عروض محدودة الوقت</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-white mb-3">
            عروض حصرية
          </h1>
          <p className="text-white/80 text-lg mb-10 max-w-md mx-auto">
            أفضل الأسعار على منتجاتنا المختارة — لفترة محدودة فقط!
          </p>

          {/* Countdown */}
          <div className="flex items-end justify-center gap-3 mb-2">
            <div className="flex items-center gap-2 text-white/60 text-sm font-medium mb-1">
              <Clock size={16} />
              ينتهي خلال:
            </div>
            <CountdownUnit value={timeLeft.h} label="ساعة" />
            <span className="text-white/60 text-2xl font-bold pb-5">:</span>
            <CountdownUnit value={timeLeft.m} label="دقيقة" />
            <span className="text-white/60 text-2xl font-bold pb-5">:</span>
            <CountdownUnit value={timeLeft.s} label="ثانية" />
          </div>
        </div>
      </div>

      {/* Offers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Tag size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-black text-gray-900">المنتجات المخفضة</h2>
              <p className="text-gray-500 text-sm">{discountedProducts.length} منتج بأسعار مخفضة</p>
            </div>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            جميع المنتجات <ArrowLeft size={16} />
          </Link>
        </div>

        {discountedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-5xl mb-4">🏷️</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">لا توجد عروض حالياً</h3>
            <p className="text-gray-400 text-sm mb-6">تابعنا للاطلاع على أحدث العروض والتخفيضات</p>
            <Link to="/products" className="px-5 py-2.5 bg-gradient-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
              تصفح المنتجات
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {discountedProducts.map(product => {
              const discountPct = Math.round(
                (1 - product.priceAfterDiscount / product.price) * 100
              );
              return (
                <div key={product._id} className="relative">
                  {/* Discount badge overlay */}
                  <div className="absolute top-3 right-3 z-10 bg-secondary text-white text-xs font-black px-2 py-1 rounded-full shadow-md">
                    -{discountPct}%
                  </div>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom CTA */}
        {discountedProducts.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-4">هل تريد المزيد؟</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity shadow-md"
            >
              تصفح جميع المنتجات <ArrowLeft size={18} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
