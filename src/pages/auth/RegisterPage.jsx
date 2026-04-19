import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex bg-background" dir="rtl">
      
      {/* Image Section (Reversed) */}
      <div className="hidden lg:block relative w-1/2">
        <div className="absolute inset-0 bg-gradient-to-bl from-primary to-secondary mix-blend-multiply opacity-20"></div>
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1491897554428-130a60dd4757?auto=format&fit=crop&q=80&w=1600"
          alt="Register Background"
        />
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]"></div>
        <div className="absolute top-0 right-0 p-16 text-white text-right">
            <h3 className="text-4xl font-black mb-4">ابدأ رحلتك معنا</h3>
            <p className="text-lg text-gray-200 font-medium max-w-md">إنشاء حساب جديد يستغرق أقل من دقيقة. ابدأ الآن وتتبع طلباتك المتميزة بسهولة.</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
            
          <div className="mb-10 text-center lg:text-right">
            <h2 className="mt-6 text-3xl font-black text-gray-900">تسجيل حساب جديد</h2>
            <p className="mt-2 text-sm text-gray-600">
              قم بملء البيانات الآتية لإنشاء حسابك
            </p>
          </div>

          <div className="mt-8">
            <form action="#" method="POST" className="space-y-6">
               <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  اسم المستخدم
                </label>
                <input
                  type="text"
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none"
                  placeholder="محمد أحمد"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none"
                  placeholder="example@email.com"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">كلمة المرور</label>
                <input
                  type="password"
                  className="block w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors outline-none"
                  placeholder="••••••••"
                  dir="ltr"
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-primary/20 text-sm font-bold text-white bg-gray-900 hover:bg-primary transition-all duration-300 transform hover:-translate-y-1"
              >
                تسجيل الحساب
              </button>
            </form>

            <div className="mt-8 text-center text-sm border-t border-gray-100 pt-6">
                <span className="text-gray-600">لديك حساب بالفعل؟ </span>
                <Link to="/login" className="font-bold text-primary hover:text-primary-hover">
                    تسجيل الدخول
                </Link>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default RegisterPage;
