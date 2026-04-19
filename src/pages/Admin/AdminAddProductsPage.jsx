import { useState } from 'react';
import { Save, X, Plus } from 'lucide-react';
import AdminSideBar from '../../components/Admin/AdminSideBar';
import { dummyCategories, dummyBrands, dummySubCategories } from '../../data/dummyData';
import { useToast } from '../../contexts/ToastContext';

const PRESET_COLORS = ['#000000', '#ffffff', '#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#8b5cf6', '#ec4899', '#c0c0c0', '#d2b48c'];

export default function AdminAddProductsPage() {
  const toast = useToast();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', price: '', priceAfterDiscount: '',
    quantity: '', category: '', subcategory: '', brand: '',
    colors: [], imageCover: '',
  });

  const toggleColor = (color) => {
    setForm(prev => ({
      ...prev,
      colors: prev.colors.includes(color) ? prev.colors.filter(c => c !== color) : [...prev.colors, color]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price || !form.category) {
      toast.error('يرجى ملء الحقول المطلوبة');
      return;
    }
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    toast.success('تم إضافة المنتج بنجاح!');
    setForm({ title: '', description: '', price: '', priceAfterDiscount: '', quantity: '', category: '', subcategory: '', brand: '', colors: [], imageCover: '' });
  };

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white";

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 flex-shrink-0"><AdminSideBar /></aside>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-900 mb-6">إضافة منتج جديد</h1>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Basic Info */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                <h2 className="font-bold text-gray-800 text-base">المعلومات الأساسية</h2>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">اسم المنتج *</label>
                  <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="مثال: iPhone 15 Pro" className={inputClass} required />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">وصف المنتج *</label>
                  <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} placeholder="اكتب وصفاً تفصيلياً للمنتج..." rows={4} className={`${inputClass} resize-none`} />
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                <h2 className="font-bold text-gray-800 text-base">التسعير والمخزون</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">السعر الأصلي *</label>
                    <input type="number" value={form.price} onChange={e => setForm({...form, price: e.target.value})} placeholder="999" min={0} className={inputClass} required />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">سعر التخفيض</label>
                    <input type="number" value={form.priceAfterDiscount} onChange={e => setForm({...form, priceAfterDiscount: e.target.value})} placeholder="799" min={0} className={inputClass} />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">الكمية *</label>
                    <input type="number" value={form.quantity} onChange={e => setForm({...form, quantity: e.target.value})} placeholder="50" min={0} className={inputClass} />
                  </div>
                </div>
              </div>

              {/* Category & Brand */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
                <h2 className="font-bold text-gray-800 text-base">التصنيف والماركة</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">التصنيف *</label>
                    <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className={inputClass} required>
                      <option value="">اختر التصنيف</option>
                      {dummyCategories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">التصنيف الفرعي</label>
                    <select value={form.subcategory} onChange={e => setForm({...form, subcategory: e.target.value})} className={inputClass}>
                      <option value="">اختر التصنيف الفرعي</option>
                      {dummySubCategories.filter(s => !form.category || s.category === form.category).map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">الماركة</label>
                    <select value={form.brand} onChange={e => setForm({...form, brand: e.target.value})} className={inputClass}>
                      <option value="">اختر الماركة</option>
                      {dummyBrands.map(b => <option key={b._id} value={b._id}>{b.name}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h2 className="font-bold text-gray-800 text-base mb-4">الألوان المتاحة</h2>
                <div className="flex flex-wrap gap-3">
                  {PRESET_COLORS.map(color => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => toggleColor(color)}
                      style={{ backgroundColor: color }}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${form.colors.includes(color) ? 'border-primary scale-110 shadow-lg ring-2 ring-primary/30' : 'border-gray-200 hover:scale-110'}`}
                      title={color}
                    />
                  ))}
                </div>
                {form.colors.length > 0 && (
                  <p className="text-xs text-gray-500 mt-2">اخترت: {form.colors.join(', ')}</p>
                )}
              </div>

              {/* Image */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h2 className="font-bold text-gray-800 text-base mb-4">صورة المنتج</h2>
                <input type="url" value={form.imageCover} onChange={e => setForm({...form, imageCover: e.target.value})} placeholder="رابط الصورة الرئيسية" className={inputClass} />
                {form.imageCover && (
                  <div className="mt-3 w-24 h-24 bg-gray-50 rounded-xl overflow-hidden">
                    <img src={form.imageCover} alt="preview" className="w-full h-full object-contain" onError={e => e.target.src = ''} />
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-8 py-3.5 bg-gradient-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-60 shadow-lg shadow-primary/20">
                  <Save size={18} /> {saving ? 'جاري الحفظ...' : 'حفظ المنتج'}
                </button>
                <button type="button" onClick={() => setForm({ title: '', description: '', price: '', priceAfterDiscount: '', quantity: '', category: '', subcategory: '', brand: '', colors: [], imageCover: '' })} className="px-6 py-3.5 border border-gray-200 rounded-xl font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                  إعادة تعيين
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
