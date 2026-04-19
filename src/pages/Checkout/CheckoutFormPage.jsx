import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Plus, ChevronRight, Check } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export default function CheckoutFormPage() {
  const { totalPrice, subtotal, taxPrice, shippingPrice, discountAmount, cartItems } = useCart();
  const { user, addresses, addAddress } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [selectedAddress, setSelectedAddress] = useState(addresses[0]?.id || null);
  const [addingNew, setAddingNew] = useState(addresses.length === 0);
  const [newAddr, setNewAddr] = useState({ alias: '', details: '', phone: '', city: '', postalCode: '' });

  const handleSaveAddress = () => {
    if (!newAddr.alias || !newAddr.details || !newAddr.city) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    const result = addAddress(newAddr);
    if (result.success) {
      toast.success('تم إضافة العنوان');
      setAddingNew(false);
      setNewAddr({ alias: '', details: '', phone: '', city: '', postalCode: '' });
    }
  };

  const handleContinue = () => {
    if (!selectedAddress && !addingNew) {
      toast.error('يرجى اختيار عنوان الشحن');
      return;
    }
    navigate('/order/paymethoud');
  };

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all";

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/cart" className="hover:text-primary">العربة</Link>
          <ChevronRight size={14} className="rotate-180" />
          <span className="text-gray-700 font-medium">عنوان الشحن</span>
        </nav>

        {/* Steps */}
        <div className="flex items-center gap-3 mb-8">
          {['عنوان الشحن', 'طريقة الدفع', 'تأكيد الطلب'].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-gradient-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                {i === 0 ? <Check size={14} /> : i + 1}
              </div>
              <span className={`text-sm font-medium hidden sm:block ${i === 0 ? 'text-gray-800' : 'text-gray-400'}`}>{step}</span>
              {i < 2 && <div className="w-6 h-px bg-gray-200" />}
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Address Selection */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-5">اختر عنوان الشحن</h2>

            {addresses.length > 0 && (
              <div className="space-y-3 mb-5">
                {addresses.map(addr => (
                  <button
                    key={addr.id}
                    onClick={() => { setSelectedAddress(addr.id); setAddingNew(false); }}
                    className={`w-full text-right p-5 rounded-2xl border-2 transition-all ${selectedAddress === addr.id ? 'border-primary bg-primary/5' : 'border-gray-100 bg-white hover:border-gray-200'}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin size={16} className={selectedAddress === addr.id ? 'text-primary' : 'text-gray-400'} />
                          <span className="font-semibold text-gray-800">{addr.alias}</span>
                        </div>
                        <p className="text-sm text-gray-600">{addr.details}</p>
                        <p className="text-sm text-gray-500">{addr.city} {addr.postalCode && `- ${addr.postalCode}`}</p>
                        {addr.phone && <p className="text-sm text-gray-500 mt-1">{addr.phone}</p>}
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 mt-1 transition-all ${selectedAddress === addr.id ? 'border-primary bg-primary' : 'border-gray-300'}`}>
                        {selectedAddress === addr.id && <Check size={12} className="text-white m-auto" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Add New Address */}
            {!addingNew ? (
              <button
                onClick={() => { setAddingNew(true); setSelectedAddress(null); }}
                className="flex items-center gap-2 w-full p-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-500 hover:border-primary/40 hover:text-primary transition-colors text-sm font-medium"
              >
                <Plus size={18} /> إضافة عنوان جديد
              </button>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                <h3 className="font-semibold text-gray-800">عنوان جديد</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="text-xs text-gray-500 mb-1 block">الاسم المختصر *</label>
                    <input type="text" placeholder="مثال: المنزل" value={newAddr.alias} onChange={e => setNewAddr({...newAddr, alias: e.target.value})} className={inputClass} />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-gray-500 mb-1 block">العنوان التفصيلي *</label>
                    <input type="text" placeholder="الشارع، المبنى، الشقة..." value={newAddr.details} onChange={e => setNewAddr({...newAddr, details: e.target.value})} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">المدينة *</label>
                    <input type="text" placeholder="القاهرة" value={newAddr.city} onChange={e => setNewAddr({...newAddr, city: e.target.value})} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">الكود البريدي</label>
                    <input type="text" placeholder="11431" value={newAddr.postalCode} onChange={e => setNewAddr({...newAddr, postalCode: e.target.value})} className={inputClass} />
                  </div>
                  <div className="col-span-2">
                    <label className="text-xs text-gray-500 mb-1 block">رقم الهاتف</label>
                    <input type="tel" placeholder="01xxxxxxxxx" value={newAddr.phone} onChange={e => setNewAddr({...newAddr, phone: e.target.value})} className={inputClass} />
                  </div>
                </div>
                <div className="flex gap-3">
                  <button onClick={handleSaveAddress} className="flex-1 py-3 bg-gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">حفظ العنوان</button>
                  {addresses.length > 0 && (
                    <button onClick={() => setAddingNew(false)} className="px-5 py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">إلغاء</button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100">ملخص الطلب</h3>
              <div className="space-y-2 text-sm mb-4">
                {cartItems.map(item => (
                  <div key={item._id} className="flex justify-between text-gray-600">
                    <span className="truncate max-w-[150px]">{item.product.title} ×{item.quantity}</span>
                    <span className="font-medium">{item.price * item.quantity} ج.م</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm border-t border-gray-100 pt-3">
                <div className="flex justify-between text-gray-600"><span>المجموع الفرعي</span><span>{subtotal} ج.م</span></div>
                <div className="flex justify-between text-gray-600"><span>الضريبة</span><span>{taxPrice} ج.م</span></div>
                <div className="flex justify-between text-gray-600"><span>الشحن</span><span>{shippingPrice} ج.م</span></div>
                {discountAmount > 0 && <div className="flex justify-between text-green-600"><span>الخصم</span><span>-{discountAmount} ج.م</span></div>}
                <div className="flex justify-between font-black text-gray-900 text-base border-t border-gray-100 pt-2">
                  <span>الإجمالي</span>
                  <span className="text-gradient">{totalPrice} ج.م</span>
                </div>
              </div>

              <button onClick={handleContinue} className="mt-5 w-full py-4 bg-gradient-primary text-white font-bold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                المتابعة لاختيار الدفع
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
