import { useState } from 'react';
import { Layers, Trash2, Save } from 'lucide-react';
import AdminSideBar from '../../components/Admin/AdminSideBar';
import { dummySubCategories, dummyCategories } from '../../data/dummyData';
import { useToast } from '../../contexts/ToastContext';

export default function AdminAddSubCategoryPage() {
  const toast = useToast();
  const [subCats, setSubCats] = useState(dummySubCategories);
  const [form, setForm] = useState({ name: '', categoryId: '' });
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.categoryId) { toast.error('يرجى ملء جميع الحقول'); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 500));
    const newSub = { _id: 'sc_' + Date.now(), name: form.name, slug: form.name.toLowerCase().replace(/\s+/g, '-'), category: form.categoryId };
    setSubCats(prev => [newSub, ...prev]);
    setForm({ name: '', categoryId: '' });
    setSaving(false);
    toast.success('تم إضافة التصنيف الفرعي');
  };

  const handleDelete = (id) => {
    setSubCats(prev => prev.filter(s => s._id !== id));
    toast.success('تم الحذف');
  };

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 flex-shrink-0"><AdminSideBar /></aside>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-900 mb-6">إدارة التصنيفات الفرعية</h1>

            <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-gray-100 p-5 mb-6 space-y-4">
              <h2 className="font-bold text-gray-800">إضافة تصنيف فرعي جديد</h2>
              <div className="flex gap-3">
                <input type="text" value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="اسم التصنيف الفرعي" className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" required />
                <select value={form.categoryId} onChange={e => setForm({...form, categoryId: e.target.value})} className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white" required>
                  <option value="">اختر التصنيف</option>
                  {dummyCategories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-3 bg-gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
                  <Save size={16} /> {saving ? '...' : 'إضافة'}
                </button>
              </div>
            </form>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-right px-5 py-3 font-semibold text-gray-600">الاسم</th>
                    <th className="text-right px-5 py-3 font-semibold text-gray-600">التصنيف الرئيسي</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {subCats.map(sub => {
                    const parent = dummyCategories.find(c => c._id === sub.category);
                    return (
                      <tr key={sub._id} className="hover:bg-gray-50">
                        <td className="px-5 py-3 font-medium text-gray-800">{sub.name}</td>
                        <td className="px-5 py-3 text-gray-500">{parent?.name || '-'}</td>
                        <td className="px-5 py-3 text-left">
                          <button onClick={() => handleDelete(sub._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
