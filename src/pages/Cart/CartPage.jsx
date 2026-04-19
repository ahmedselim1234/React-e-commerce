import { Link } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Minus, Plus, Trash2, Tag, X, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

export default function CartPage() {
  const { cartItems, totalItems, subtotal, taxPrice, shippingPrice, discountAmount, totalPrice, appliedCoupon, removeFromCart, updateQuantity, applyCoupon, removeCoupon } = useCart();
  const toast = useToast();
  const [couponInput, setCouponInput] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return;
    setCouponLoading(true);
    await new Promise(r => setTimeout(r, 500));
    const result = applyCoupon(couponInput.trim());
    setCouponLoading(false);
    if (result.success) {
      toast.success(`تم تطبيق الكوبون! خصم ${result.discount}%`);
      setCouponInput('');
    } else {
      toast.error(result.message);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4" dir="rtl">
        <div className="text-center max-w-md">
          <ShoppingCart size={64} className="mx-auto mb-6 text-gray-200" />
          <h2 className="text-2xl font-black text-gray-800 mb-3">عربتك فارغة</h2>
          <p className="text-gray-500 mb-8">ابدأ التسوق واستمتع بأفضل العروض</p>
          <Link to="/products" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-primary text-white rounded-2xl font-bold hover:opacity-90 transition-opacity">
            تصفح المنتجات <ArrowLeft size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-primary">الرئيسية</Link>
          <ChevronRight size={14} className="rotate-180" />
          <span className="text-gray-700 font-medium">عربة التسوق</span>
        </nav>

        <h1 className="text-2xl font-black text-gray-900 mb-2">عربة التسوق</h1>
        <p className="text-gray-500 text-sm mb-8">{totalItems} منتج في عربتك</p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 hover:border-gray-200 transition-colors">
                <Link to={`/products/${item.product._id}`} className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-2">
                  <img src={item.product.imageCover} alt={item.product.title} className="w-full h-full object-contain mix-blend-multiply" />
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-primary font-medium mb-0.5">{item.product.category?.name}</p>
                      <Link to={`/products/${item.product._id}`} className="font-semibold text-gray-800 text-sm hover:text-primary transition-colors line-clamp-2">
                        {item.product.title}
                      </Link>
                      {item.color && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-xs text-gray-400">اللون:</span>
                          <div className="w-3.5 h-3.5 rounded-full border border-gray-200" style={{ backgroundColor: item.color }} />
                        </div>
                      )}
                    </div>
                    <button onClick={() => { removeFromCart(item._id); toast.success('تم حذف المنتج'); }} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl overflow-hidden">
                      <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="text-left">
                      <p className="font-black text-gray-900">{(item.price * item.quantity).toFixed(0)} ج.م</p>
                      {item.quantity > 1 && <p className="text-xs text-gray-400">{item.price} × {item.quantity}</p>}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Tag size={16} className="text-primary" /> كود الخصم</h3>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl p-3">
                  <div>
                    <p className="text-sm font-bold text-green-700">{appliedCoupon.name}</p>
                    <p className="text-xs text-green-600">خصم {appliedCoupon.discount}%</p>
                  </div>
                  <button onClick={removeCoupon} className="p-1.5 text-green-700 hover:bg-green-100 rounded-lg transition-colors">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value.toUpperCase())}
                    onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                    placeholder="WELCOME10"
                    className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                  <button onClick={handleApplyCoupon} disabled={couponLoading} className="px-4 py-2.5 bg-gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60 whitespace-nowrap">
                    {couponLoading ? '...' : 'تطبيق'}
                  </button>
                </div>
              )}
              <p className="text-xs text-gray-400 mt-2">جرب: WELCOME10 أو SUMMER20 أو TECH15</p>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 text-lg mb-5 pb-4 border-b border-gray-100">ملخص الطلب</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>المجموع الفرعي ({totalItems} منتج)</span>
                  <span className="font-semibold text-gray-800">{subtotal} ج.م</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>الضريبة (14%)</span>
                  <span className="font-semibold text-gray-800">{taxPrice} ج.م</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>الشحن</span>
                  <span className="font-semibold text-gray-800">{shippingPrice} ج.م</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>الخصم ({appliedCoupon?.discount}%)</span>
                    <span className="font-semibold">-{discountAmount} ج.م</span>
                  </div>
                )}
                <div className="flex justify-between font-black text-gray-900 text-lg border-t border-gray-100 pt-3">
                  <span>الإجمالي</span>
                  <span className="text-gradient">{totalPrice} ج.م</span>
                </div>
              </div>

              <Link to="/checkout" className="mt-6 block w-full py-4 bg-gradient-primary text-white text-center font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                المتابعة للدفع
              </Link>
              <Link to="/products" className="mt-3 block w-full py-3 border border-gray-200 text-gray-600 text-center font-semibold rounded-2xl hover:bg-gray-50 transition-colors text-sm">
                متابعة التسوق
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
