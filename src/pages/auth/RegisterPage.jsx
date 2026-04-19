import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ first_name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }
    if (form.password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const result = register(form);
    setLoading(false);
    if (result.success) {
      toast.success('تم إنشاء حسابك بنجاح!');
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  const inputClass = "block w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none text-sm";

  return (
    <div className="min-h-screen flex bg-background" dir="rtl">
      {/* Image Section */}
      <div className="hidden lg:block relative w-1/2">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1491897554428-130a60dd4757?auto=format&fit=crop&q=80&w=1600"
          alt="Register Background"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/70 to-indigo-900/60" />
        <div className="absolute top-0 right-0 p-16 text-white text-right">
          <h3 className="text-4xl font-black mb-4">ابدأ رحلتك معنا 🚀</h3>
          <p className="text-base text-gray-200 max-w-md leading-relaxed">
            إنشاء حساب جديد يستغرق أقل من دقيقة. ابدأ الآن وتتبع طلباتك المتميزة بسهولة.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-sm">

          <div className="mb-8">
            <Link to="/" className="text-2xl font-black text-gradient">TechStore</Link>
            <h2 className="mt-6 text-2xl font-black text-gray-900">إنشاء حساب جديد</h2>
            <p className="mt-2 text-sm text-gray-500">أكمل بياناتك للانضمام إلينا</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">الاسم الكامل</label>
              <div className="relative">
                <User size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="first_name" type="text" required value={form.first_name} onChange={handleChange} placeholder="محمد أحمد" className={inputClass} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="example@email.com" className={inputClass} dir="ltr" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">رقم الهاتف</label>
              <div className="relative">
                <Phone size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="010xxxxxxxx" className={inputClass} dir="ltr" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">كلمة المرور</label>
              <div className="relative">
                <Lock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="password" type={showPass ? 'text' : 'password'} required value={form.password} onChange={handleChange} placeholder="6 أحرف على الأقل" className={`${inputClass} pl-10`} dir="ltr" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">تأكيد كلمة المرور</label>
              <div className="relative">
                <Lock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="confirmPassword" type="password" required value={form.confirmPassword} onChange={handleChange} placeholder="أعد إدخال كلمة المرور" className={inputClass} dir="ltr" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-60 mt-2"
            >
              {loading ? 'جاري الإنشاء...' : 'إنشاء الحساب'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            لديك حساب بالفعل؟{' '}
            <Link to="/login" className="font-bold text-primary hover:underline">تسجيل الدخول</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
