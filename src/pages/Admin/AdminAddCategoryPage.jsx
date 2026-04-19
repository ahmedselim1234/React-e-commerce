import { useState } from 'react';
import { FolderPlus, Trash2, Save } from 'lucide-react';
import AdminSideBar from '../../components/Admin/AdminSideBar';
import { dummyCategories } from '../../data/dummyData';
import { useToast } from '../../contexts/ToastContext';

const CATEGORY_IMAGES = [
  'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=400',
  'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400',
];

export default function AdminAddCategoryPage() {
  const toast = useToast();
  const [categories, setCategories] = useState(dummyCategories);
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    await new Promise(r => setTimeout(r, 500));
    const newCat = {
      _id: 'c_' + Date.now(),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      image: CATEGORY_IMAGES[Math.floor(Math.random() * CATEGORY_IMAGES.length)],
    };
    setCategories(prev => [newCat, ...prev]);
    setName('');
    setSaving(false);
    toast.success('تم إضافة التصنيف');
  };

  const handleDelete = (id) => {
    setCategories(prev => prev.filter(c => c._id !== id));
    toast.success('تم حذف التصنيف');
  };

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 flex-shrink-0"><AdminSideBar /></aside>
          <div className="flex-1">
            <h1 className="text-2xl font-black text-gray-900 mb-6">إدارة التصنيفات</h1>

            <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
              <h2 className="font-bold text-gray-800 mb-4">إضافة تصنيف جديد</h2>
              <div className="flex gap-3">
                <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="اسم التصنيف (مثال: إلكترونيات)" className="flex-1 px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" required />
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-3 bg-gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
                  <Save size={16} /> {saving ? '...' : 'إضافة'}
                </button>
              </div>
            </form>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {categories.map(cat => (
                <div key={cat._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors group">
                  <div className="h-28 overflow-hidden">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-3 flex items-center justify-between">
                    <p className="font-bold text-gray-800 text-sm">{cat.name}</p>
                    <button onClick={() => handleDelete(cat._id)} className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
