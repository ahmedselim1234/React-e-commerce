import { useState } from 'react';
import { Tag, Plus, Trash2, Save, Upload } from 'lucide-react';
import AdminSideBar from '../../components/Admin/AdminSideBar';
import { dummyBrands } from '../../data/dummyData';
import { useToast } from '../../contexts/ToastContext';

export default function AdminAddBrandPage() {
  const toast = useToast();
  const [brands, setBrands] = useState(dummyBrands);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 500));
    const newBrand = { _id: 'b_' + Date.now(), name, slug: name.toLowerCase().replace(/\s+/g, '-'), image: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=6366f1&color=fff&size=200` };
    setBrands(prev => [newBrand, ...prev]);
    setName('');
    setSaving(false);
    toast.success('تم إضافة الماركة');
  };

  const handleDelete = (id) => {
    setBrands(prev => prev.filter(b => b._id !== id));
    toast.success('تم حذف الماركة');
  };

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 flex-shrink-0"><AdminSideBar /></aside>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-900 mb-6">إدارة الماركات</h1>

            {/* Add Form */}
            <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
              <h2 className="font-bold text-gray-800 mb-4">إضافة ماركة جديدة</h2>
              <div className="flex gap-3">
                <div className="flex-1">
                  <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="اسم الماركة (مثال: Apple)" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" required />
                </div>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-3 bg-gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
                  <Save size={16} /> {saving ? '...' : 'إضافة'}
                </button>
              </div>
            </form>

            {/* Brands List */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {brands.map(brand => (
                <div key={brand._id} className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col items-center gap-3 hover:border-gray-200 transition-colors group">
                  <div className="w-16 h-16 rounded-2xl bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img src={brand.image} alt={brand.name} className="w-full h-full object-cover" onError={e => { e.target.src = `https://ui-avatars.com/api/?name=${brand.name}&background=6366f1&color=fff`; }} />
                  </div>
                  <p className="font-bold text-gray-800 text-sm">{brand.name}</p>
                  <button onClick={() => handleDelete(brand._id)} className="opacity-0 group-hover:opacity-100 p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
