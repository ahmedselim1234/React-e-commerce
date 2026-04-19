import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapPin, Save } from 'lucide-react';
import UserSideBar from '../../components/User/UserSideBar';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export default function UserEditAddressPage() {
  const [searchParams] = useSearchParams();
  const addrId = searchParams.get('id');
  const { addresses, updateAddress } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const existingAddr = addresses.find(a => a.id === addrId);
  const [form, setForm] = useState(existingAddr || { alias: '', details: '', phone: '', city: '', postalCode: '' });

  useEffect(() => {
    if (existingAddr) setForm(existingAddr);
  }, [addrId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 500));
    updateAddress(addrId, form);
    toast.success('تم تحديث العنوان بنجاح');
    navigate('/user/addresses');
  };

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white";

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64"><UserSideBar /></aside>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-gray-900 mb-6">تعديل العنوان</h2>
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-6 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MapPin size={20} className="text-primary" />
                </div>
                <h3 className="font-bold text-gray-800">تعديل بيانات العنوان</h3>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">الاسم المختصر</label>
                <input type="text" value={form.alias} onChange={e => setForm({...form, alias: e.target.value})} className={inputClass} />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">العنوان التفصيلي</label>
                <textarea value={form.details} onChange={e => setForm({...form, details: e.target.value})} rows={2} className={`${inputClass} resize-none`} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">المدينة</label>
                  <input type="text" value={form.city} onChange={e => setForm({...form, city: e.target.value})} className={inputClass} />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">الكود البريدي</label>
                  <input type="text" value={form.postalCode} onChange={e => setForm({...form, postalCode: e.target.value})} className={inputClass} />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 block mb-2">رقم الهاتف</label>
                <input type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className={inputClass} dir="ltr" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
                  <Save size={18} /> {loading ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </button>
                <button type="button" onClick={() => navigate('/user/addresses')} className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                  إلغاء
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
