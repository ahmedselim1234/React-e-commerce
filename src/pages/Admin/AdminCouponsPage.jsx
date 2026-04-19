import { useState } from 'react';
import { Ticket, Plus, Trash2, Edit3, Save, X } from 'lucide-react';
import AdminSideBar from '../../components/Admin/AdminSideBar';
import { dummyCoupons } from '../../data/dummyData';
import { useToast } from '../../contexts/ToastContext';

export default function AdminCouponsPage() {
  const toast = useToast();
  const [coupons, setCoupons] = useState(dummyCoupons);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', discount: '', expire: '' });
  const [editForm, setEditForm] = useState({});

  const isExpired = (date) => new Date(date) < new Date();

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.name || !form.discount || !form.expire) {
      toast.error('يرجى ملء جميع الحقول');
      return;
    }
    const newCoupon = {
      _id: 'cp_' + Date.now(),
      name: form.name.toUpperCase(),
      discount: Number(form.discount),
      expire: new Date(form.expire).toISOString(),
      createdAt: new Date().toISOString(),
    };
    setCoupons(prev => [newCoupon, ...prev]);
    setForm({ name: '', discount: '', expire: '' });
    setShowForm(false);
    toast.success('تم إضافة الكوبون');
  };

  const handleDelete = (id) => {
    setCoupons(prev => prev.filter(c => c._id !== id));
    toast.success('تم حذف الكوبون');
  };

  const handleEditSave = (id) => {
    setCoupons(prev => prev.map(c => c._id === id ? { ...c, ...editForm, name: editForm.name.toUpperCase() } : c));
    setEditingId(null);
    toast.success('تم تحديث الكوبون');
  };

  const inputClass = "w-full px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary";

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 flex-shrink-0"><AdminSideBar /></aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-black text-gray-900">إدارة الكوبونات</h1>
                <p className="text-gray-500 text-sm mt-1">{coupons.length} كوبون</p>
              </div>
              <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                <Plus size={16} /> إضافة كوبون
              </button>
            </div>

            {/* Add Form */}
            {showForm && (
              <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-gray-100 p-5 mb-5">
                <h3 className="font-bold text-gray-800 mb-4">إضافة كوبون جديد</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">اسم الكوبون *</label>
                    <input type="text" placeholder="SAVE20" value={form.name} onChange={e => setForm({...form, name: e.target.value.toUpperCase()})} className={inputClass} required />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">نسبة الخصم % *</label>
                    <input type="number" placeholder="20" min={1} max={100} value={form.discount} onChange={e => setForm({...form, discount: e.target.value})} className={inputClass} required />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">تاريخ الانتهاء *</label>
                    <input type="date" value={form.expire} onChange={e => setForm({...form, expire: e.target.value})} className={inputClass} required />
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <button type="submit" className="flex items-center gap-2 px-5 py-2.5 bg-gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                    <Save size={16} /> حفظ
                  </button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">إلغاء</button>
                </div>
              </form>
            )}

            {/* Coupons List */}
            <div className="space-y-3">
              {coupons.map(coupon => {
                const expired = isExpired(coupon.expire);
                const isEditing = editingId === coupon._id;

                return (
                  <div key={coupon._id} className={`bg-white rounded-2xl border p-5 transition-all ${expired ? 'border-red-100 opacity-60' : 'border-gray-100 hover:border-gray-200'}`}>
                    {isEditing ? (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input type="text" value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value.toUpperCase()})} className={inputClass} placeholder="اسم الكوبون" />
                        <input type="number" value={editForm.discount || ''} onChange={e => setEditForm({...editForm, discount: Number(e.target.value)})} className={inputClass} placeholder="الخصم %" min={1} max={100} />
                        <input type="date" value={editForm.expire ? editForm.expire.split('T')[0] : ''} onChange={e => setEditForm({...editForm, expire: new Date(e.target.value).toISOString()})} className={inputClass} />
                        <div className="col-span-1 sm:col-span-3 flex gap-2">
                          <button onClick={() => handleEditSave(coupon._id)} className="flex items-center gap-1.5 px-4 py-2 bg-primary text-white rounded-xl text-xs font-semibold hover:opacity-90"><Save size={14} /> حفظ</button>
                          <button onClick={() => setEditingId(null)} className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl text-xs text-gray-600 hover:bg-gray-50"><X size={14} /> إلغاء</button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${expired ? 'bg-gray-100' : 'bg-primary/10'}`}>
                            <Ticket size={20} className={expired ? 'text-gray-400' : 'text-primary'} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-black text-gray-800 text-base tracking-wider">{coupon.name}</p>
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${expired ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}`}>
                                {expired ? 'منتهي' : 'نشط'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">خصم <span className="font-bold text-primary">{coupon.discount}%</span> — ينتهي: {new Date(coupon.expire).toLocaleDateString('ar-EG')}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingId(coupon._id); setEditForm({ name: coupon.name, discount: coupon.discount, expire: coupon.expire }); }} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-colors">
                            <Edit3 size={16} />
                          </button>
                          <button onClick={() => handleDelete(coupon._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                            <Trash2 size={16} />
                          </button>
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
