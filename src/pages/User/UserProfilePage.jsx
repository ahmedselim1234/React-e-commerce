import { useState } from 'react';
import { User, Mail, Phone, Lock, Camera, Save, Eye, EyeOff } from 'lucide-react';
import UserSideBar from '../../components/User/UserSideBar';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export default function UserProfilePage() {
  const { user, updateProfile, changePassword } = useAuth();
  const toast = useToast();

  const [profileForm, setProfileForm] = useState({
    first_name: user?.first_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [passForm, setPassForm] = useState({ current: '', newPass: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [saving, setSaving] = useState(false);
  const [savingPass, setSavingPass] = useState(false);
  const [tab, setTab] = useState('profile');

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    await new Promise(r => setTimeout(r, 700));
    updateProfile(profileForm);
    setSaving(false);
    toast.success('تم تحديث الملف الشخصي');
  };

  const handleChangePass = async (e) => {
    e.preventDefault();
    if (passForm.newPass !== passForm.confirm) {
      toast.error('كلمتا المرور غير متطابقتين');
      return;
    }
    if (passForm.newPass.length < 6) {
      toast.error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    setSavingPass(true);
    await new Promise(r => setTimeout(r, 700));
    changePassword(passForm.current, passForm.newPass);
    setSavingPass(false);
    setPassForm({ current: '', newPass: '', confirm: '' });
    toast.success('تم تغيير كلمة المرور');
  };

  const inputClass = "w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white";

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64 flex-shrink-0">
            <UserSideBar />
          </aside>

          <div className="flex-1">
            {/* Avatar Card */}
            <div className="bg-white rounded-3xl border border-gray-100 p-6 mb-6">
              <div className="flex items-center gap-5">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-3xl font-black">
                    {user?.first_name?.charAt(0) || 'U'}
                  </div>
                  <button className="absolute -bottom-1 -left-1 w-7 h-7 bg-primary rounded-full flex items-center justify-center text-white shadow-md hover:opacity-90 transition-opacity">
                    <Camera size={14} />
                  </button>
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900">{user?.first_name}</h2>
                  <p className="text-gray-500 text-sm">{user?.email}</p>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full mt-1 inline-block
                    ${user?.role === 'admin' ? 'bg-red-100 text-red-700' : user?.role === 'manager' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                    {user?.role === 'admin' ? 'مدير' : user?.role === 'manager' ? 'مشرف' : 'عميل'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-5 bg-white rounded-2xl border border-gray-100 p-1.5">
              <button onClick={() => setTab('profile')} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${tab === 'profile' ? 'bg-gradient-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
                بيانات الحساب
              </button>
              <button onClick={() => setTab('password')} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${tab === 'password' ? 'bg-gradient-primary text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}>
                تغيير كلمة المرور
              </button>
            </div>

            {/* Profile Form */}
            {tab === 'profile' && (
              <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl border border-gray-100 p-6 space-y-5">
                <h3 className="font-bold text-gray-800 text-lg mb-5">البيانات الشخصية</h3>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">الاسم الكامل</label>
                  <div className="relative">
                    <User size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="text" value={profileForm.first_name} onChange={e => setProfileForm({...profileForm, first_name: e.target.value})} className={inputClass} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="email" value={profileForm.email} onChange={e => setProfileForm({...profileForm, email: e.target.value})} className={inputClass} dir="ltr" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 block mb-2">رقم الهاتف</label>
                  <div className="relative">
                    <Phone size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input type="tel" value={profileForm.phone} onChange={e => setProfileForm({...profileForm, phone: e.target.value})} className={inputClass} dir="ltr" />
                  </div>
                </div>
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
                  <Save size={18} /> {saving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
                </button>
              </form>
            )}

            {/* Password Form */}
            {tab === 'password' && (
              <form onSubmit={handleChangePass} className="bg-white rounded-3xl border border-gray-100 p-6 space-y-5">
                <h3 className="font-bold text-gray-800 text-lg mb-5">تغيير كلمة المرور</h3>
                {[
                  { label: 'كلمة المرور الحالية', key: 'current', placeholder: '••••••••' },
                  { label: 'كلمة المرور الجديدة', key: 'newPass', placeholder: '6 أحرف على الأقل' },
                  { label: 'تأكيد كلمة المرور', key: 'confirm', placeholder: 'أعد إدخال كلمة المرور' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="text-sm font-semibold text-gray-700 block mb-2">{field.label}</label>
                    <div className="relative">
                      <Lock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPass ? 'text' : 'password'}
                        value={passForm[field.key]}
                        onChange={e => setPassForm({...passForm, [field.key]: e.target.value})}
                        placeholder={field.placeholder}
                        className={`${inputClass} pl-10`}
                        dir="ltr"
                      />
                      {field.key === 'current' && (
                        <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                          {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button type="submit" disabled={savingPass} className="flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
                  <Lock size={18} /> {savingPass ? 'جاري التغيير...' : 'تغيير كلمة المرور'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
