import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex bg-background" dir="rtl">
      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
            
          <div className="mb-10 text-center lg:text-right">
            <h2 className="mt-6 text-3xl font-black text-gray-900">مرحباً بك مجدداً</h2>
            <p className="mt-2 text-sm text-gray-600">
              قم بتسجيل الدخول للوصول إلى حسابك
            </p>
          </div>

          <div className="mt-8">
            <form action="#" method="POST" className="space-y-6">
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
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700">كلمة المرور</label>
                  <Link to="#" className="text-sm font-medium text-primary hover:text-primary-hover transition-colors">نسيت كلمة المرور؟</Link>
                </div>
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
                تسجيل الدخول
              </button>
            </form>

            <div className="mt-8 text-center text-sm">
                <span className="text-gray-600">ليس لديك حساب؟ </span>
                <Link to="/register" className="font-bold text-primary hover:text-primary-hover">
                    سجل الآن
                </Link>
            </div>

            {/* Admin / User demo links from original */}
            <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col gap-3 text-center">
                <p className="text-xs text-gray-400 font-medium">روابط سريعة للتجربة:</p>
                <div className="flex justify-center gap-4">
                    <Link to="/admin/allproducts" className="text-sm font-bold text-gray-600 hover:text-primary bg-gray-100 px-4 py-2 rounded-lg transition-colors">
                        دخول كأدمن
                    </Link>
                    <Link to="/user/allorders" className="text-sm font-bold text-gray-600 hover:text-primary bg-gray-100 px-4 py-2 rounded-lg transition-colors">
                        دخول كمستخدم
                    </Link>
                </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Image Section */}
      <div className="hidden lg:block relative w-1/2">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary mix-blend-multiply opacity-20"></div>
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=1600"
          alt="Login Background"
        />
        <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]"></div>
        <div className="absolute bottom-0 left-0 right-0 p-16 text-white text-right">
            <h3 className="text-4xl font-black mb-4">تسوق أحدث التقنيات</h3>
            <p className="text-lg text-gray-200 font-medium max-w-md mr-auto">انضم إلى آلاف المستخدمين واستمتع بتجربة تسوق لا مثيل لها مع أفضل العروض والخصومات الحصرية.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
