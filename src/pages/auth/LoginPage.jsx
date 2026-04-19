import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const LoginPage = () => {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    const result = login(email, password);
    setLoading(false);
    if (result.success) {
      toast.success(`مرحباً ${result.user.first_name}!`);
      navigate('/');
    } else {
      setError(result.message);
    }
  };

  const quickLogin = (role) => {
    const creds = role === 'admin'
      ? { email: 'admin@techstore.com', password: 'admin123' }
      : { email: 'ahmed@example.com', password: 'client123' };
    setEmail(creds.email);
    setPassword(creds.password);
  };

  return (
    <div className="min-h-screen flex bg-background" dir="rtl">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-sm">

          <div className="mb-8">
            <Link to="/" className="text-2xl font-black text-gradient">TechStore</Link>
            <h2 className="mt-6 text-2xl font-black text-gray-900">مرحباً بك مجدداً 👋</h2>
            <p className="mt-2 text-sm text-gray-500">سجّل دخولك للوصول إلى حسابك</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">البريد الإلكتروني</label>
              <div className="relative">
                <Mail size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="block w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none text-sm"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700">كلمة المرور</label>
                <Link to="/forgot-password" className="text-xs font-medium text-primary hover:underline">نسيت كلمة المرور؟</Link>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="block w-full pr-10 pl-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all outline-none text-sm"
                  placeholder="••••••••"
                  dir="ltr"
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-60"
            >
              {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            ليس لديك حساب؟{' '}
            <Link to="/signup" className="font-bold text-primary hover:underline">سجّل الآن</Link>
          </p>

          {/* Quick Demo Login */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400 mb-3">حسابات تجريبية سريعة</p>
            <div className="flex gap-3">
              <button
                onClick={() => quickLogin('admin')}
                className="flex-1 py-2.5 text-xs font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors border border-gray-200"
              >
                🔧 أدمن
              </button>
              <button
                onClick={() => quickLogin('client')}
                className="flex-1 py-2.5 text-xs font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-pink-50 hover:text-pink-600 transition-colors border border-gray-200"
              >
                🛍️ مستخدم
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400 mt-2">اضغط على الحساب ثم "تسجيل الدخول"</p>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block relative w-1/2">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1600"
          alt="Login Background"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/80 to-pink-900/60" />
        <div className="absolute bottom-0 left-0 right-0 p-16 text-white text-right">
          <h3 className="text-4xl font-black mb-4">تسوق أحدث التقنيات</h3>
          <p className="text-base text-gray-200 max-w-md mr-auto leading-relaxed">
            انضم إلى آلاف المستخدمين واستمتع بتجربة تسوق لا مثيل لها مع أفضل العروض والخصومات الحصرية.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
