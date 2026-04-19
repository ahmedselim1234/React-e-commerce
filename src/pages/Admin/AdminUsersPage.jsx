import { useState } from 'react';
import { Users, Search, Trash2, ShieldCheck, User } from 'lucide-react';
import AdminSideBar from '../../components/Admin/AdminSideBar';
import { dummyUsers } from '../../data/dummyData';
import { useToast } from '../../contexts/ToastContext';

const roleLabel = { admin: 'مدير', manager: 'مشرف', client: 'عميل' };
const roleColor = { admin: 'bg-red-100 text-red-700', manager: 'bg-blue-100 text-blue-700', client: 'bg-green-100 text-green-700' };

export default function AdminUsersPage() {
  const toast = useToast();
  const [users, setUsers] = useState(dummyUsers);
  const [search, setSearch] = useState('');

  const filtered = users.filter(u =>
    u.first_name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    setUsers(prev => prev.filter(u => u._id !== id));
    toast.success('تم حذف المستخدم');
  };

  const handleToggleActive = (id) => {
    setUsers(prev => prev.map(u => u._id === id ? { ...u, active: !u.active } : u));
    toast.success('تم تحديث حالة المستخدم');
  };

  const handleRoleChange = (id, role) => {
    setUsers(prev => prev.map(u => u._id === id ? { ...u, role } : u));
    toast.success('تم تغيير الدور');
  };

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 flex-shrink-0"><AdminSideBar /></aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-black text-gray-900">إدارة المستخدمين</h1>
                <p className="text-gray-500 text-sm mt-1">{users.length} مستخدم مسجل</p>
              </div>
            </div>

            {/* Search */}
            <div className="relative mb-5">
              <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ابحث عن مستخدم..."
                className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">المستخدم</th>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">الدور</th>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">الحالة</th>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">تاريخ التسجيل</th>
                      <th className="text-right px-5 py-4 font-semibold text-gray-600">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filtered.map(u => (
                      <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                              {u.first_name?.charAt(0)}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{u.first_name}</p>
                              <p className="text-xs text-gray-400">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={u.role}
                            onChange={e => handleRoleChange(u._id, e.target.value)}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border-0 outline-none cursor-pointer ${roleColor[u.role]}`}
                          >
                            <option value="client">عميل</option>
                            <option value="manager">مشرف</option>
                            <option value="admin">مدير</option>
                          </select>
                        </td>
                        <td className="px-5 py-4">
                          <button onClick={() => handleToggleActive(u._id)} className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${u.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>
                            {u.active ? 'نشط' : 'معطل'}
                          </button>
                        </td>
                        <td className="px-5 py-4 text-gray-500 text-xs">
                          {new Date(u.createdAt).toLocaleDateString('ar-EG')}
                        </td>
                        <td className="px-5 py-4">
                          <button onClick={() => handleDelete(u._id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filtered.length === 0 && (
                  <div className="py-12 text-center text-gray-400">
                    <Users size={36} className="mx-auto mb-3 opacity-30" />
                    <p>لا يوجد مستخدمون مطابقون</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
