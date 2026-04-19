import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, KeyRound, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

export default function ForgotPasswordPage() {
  const { forgotPassword, verifyResetCode, resetPassword } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1=email, 2=code, 3=new password
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmail = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const res = forgotPassword(email);
    setLoading(false);
    if (res.success) {
      toast.success('تم إرسال كود التحقق على بريدك الإلكتروني');
      setStep(2);
    } else {
      setError(res.message);
    }
  };

  const handleCode = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const res = verifyResetCode(code);
    setLoading(false);
    if (res.success) {
      setStep(3);
    } else {
      setError(res.message);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    if (newPass !== confirmPass) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }
    if (newPass.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    resetPassword(email, newPass);
    setLoading(false);
    toast.success('تم تغيير كلمة المرور بنجاح');
    navigate('/login');
  };

  const steps = [
    { num: 1, label: 'البريد الإلكتروني' },
    { num: 2, label: 'كود التحقق' },
    { num: 3, label: 'كلمة مرور جديدة' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 flex items-center justify-center px-4 py-12" dir="rtl">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-black text-gradient mb-2">استعادة كلمة المرور</h1>
          <p className="text-gray-500 text-sm">اتبع الخطوات لاسترداد حسابك</p>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                ${step > s.num ? 'bg-green-500 text-white' : step === s.num ? 'bg-gradient-primary text-white' : 'bg-gray-100 text-gray-400'}`}>
                {step > s.num ? <CheckCircle size={16} /> : s.num}
              </div>
              <span className={`text-xs hidden sm:block ${step === s.num ? 'text-primary font-medium' : 'text-gray-400'}`}>{s.label}</span>
              {i < steps.length - 1 && <div className={`w-8 h-0.5 ${step > s.num ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">{error}</div>
          )}

          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleEmail} className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">أدخل بريدك الإلكتروني</h2>
                <p className="text-sm text-gray-500 mb-5">سنرسل لك كود التحقق</p>
                <label className="block text-sm font-medium text-gray-700 mb-2">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="example@email.com"
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">جرب: ahmed@example.com</p>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
                {loading ? 'جاري الإرسال...' : 'إرسال كود التحقق'}
              </button>
            </form>
          )}

          {/* Step 2: Code */}
          {step === 2 && (
            <form onSubmit={handleCode} className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">أدخل كود التحقق</h2>
                <p className="text-sm text-gray-500 mb-5">تم إرسال الكود إلى {email}</p>
                <label className="block text-sm font-medium text-gray-700 mb-2">الكود المكون من 6 أرقام</label>
                <div className="relative">
                  <KeyRound size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    placeholder="123456"
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm text-center tracking-[0.5em] font-mono"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">للتجربة استخدم الكود: 123456</p>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
                {loading ? 'جاري التحقق...' : 'تحقق من الكود'}
              </button>
              <button type="button" onClick={() => setStep(1)} className="w-full py-2.5 text-sm text-gray-500 hover:text-primary transition-colors">
                تغيير البريد الإلكتروني
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handleReset} className="space-y-5">
              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-1">كلمة مرور جديدة</h2>
                <p className="text-sm text-gray-500 mb-5">أدخل كلمة مرور قوية وآمنة</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور الجديدة</label>
                <div className="relative">
                  <Lock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={newPass}
                    onChange={e => setNewPass(e.target.value)}
                    placeholder="6 أحرف على الأقل"
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">تأكيد كلمة المرور</label>
                <div className="relative">
                  <Lock size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={confirmPass}
                    onChange={e => setConfirmPass(e.target.value)}
                    placeholder="أعد إدخال كلمة المرور"
                    className="w-full pr-10 pl-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-primary text-white rounded-xl font-semibold hover:opacity-90 transition-opacity disabled:opacity-60">
                {loading ? 'جاري التغيير...' : 'تغيير كلمة المرور'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-primary transition-colors">
              <ArrowRight size={16} /> العودة لتسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
