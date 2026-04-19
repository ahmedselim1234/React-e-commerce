import { Link } from 'react-router-dom';
import { MapPin, Plus, Trash2, Edit2 } from 'lucide-react';
import UserSideBar from '../../components/User/UserSideBar';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export default function UserAllAddresPage() {
  const { addresses, removeAddress } = useAuth();
  const toast = useToast();

  const handleDelete = (id) => {
    removeAddress(id);
    toast.success('تم حذف العنوان');
  };

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64"><UserSideBar /></aside>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900">عناوين التوصيل</h2>
              <Link to="/user/add-address" className="flex items-center gap-2 px-4 py-2.5 bg-gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
                <Plus size={16} /> إضافة عنوان
              </Link>
            </div>
            {addresses.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-gray-100">
                <MapPin size={56} className="text-gray-200 mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">لا توجد عناوين</h3>
                <p className="text-gray-400 mb-6">أضف عنوان توصيل لتسهيل عملية الشراء</p>
                <Link to="/user/add-address" className="px-6 py-3 bg-gradient-primary text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity">إضافة عنوان</Link>
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((addr, i) => (
                  <div key={addr.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start justify-between gap-4 hover:border-gray-200 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-bold text-gray-800">{addr.alias}</p>
                          {i === 0 && <span className="text-[10px] font-semibold px-2 py-0.5 bg-green-100 text-green-700 rounded-full">افتراضي</span>}
                        </div>
                        <p className="text-sm text-gray-600">{addr.details}</p>
                        <p className="text-sm text-gray-500">{addr.city}{addr.postalCode && ` - ${addr.postalCode}`}</p>
                        {addr.phone && <p className="text-sm text-gray-500 mt-0.5">{addr.phone}</p>}
                      </div>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <Link to={`/user/edit-address?id=${addr.id}`} className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-colors">
                        <Edit2 size={16} />
                      </Link>
                      <button onClick={() => handleDelete(addr.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
