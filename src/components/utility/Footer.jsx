import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, ShieldCheck, Truck, RefreshCcw, HeadphonesIcon } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100 mt-10" dir="rtl">
      {/* Features Strip */}
      <div className="border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Truck, label: 'توصيل مجاني', sub: 'للطلبات فوق 500 ج.م', color: 'text-blue-500' },
              { icon: RefreshCcw, label: 'إرجاع مجاني', sub: 'خلال 30 يوم', color: 'text-green-500' },
              { icon: ShieldCheck, label: 'دفع آمن', sub: 'تشفير SSL', color: 'text-purple-500' },
              { icon: HeadphonesIcon, label: 'دعم 24/7', sub: 'خدمة عملاء متميزة', color: 'text-orange-500' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 ${f.color}`}>
                  <f.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{f.label}</p>
                  <p className="text-xs text-gray-400">{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-black text-gradient mb-3">TechStore</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">وجهتك الأولى لأحدث التقنيات والإلكترونيات بأفضل الأسعار وخدمة عملاء متميزة.</p>
            <div className="flex gap-3">
              <a href="#" className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Facebook size={18} /></a>
              <a href="#" className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-pink-500 hover:bg-pink-50 transition-colors"><Instagram size={18} /></a>
              <a href="#" className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-blue-400 hover:bg-blue-50 transition-colors"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">روابط سريعة</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'الرئيسية', to: '/' },
                { label: 'المنتجات', to: '/products' },
                { label: 'الأقسام', to: '/allcategory' },
                { label: 'الماركات', to: '/allbrand' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className="text-sm text-gray-500 hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">حسابي</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'تسجيل الدخول', to: '/login' },
                { label: 'إنشاء حساب', to: '/signup' },
                { label: 'طلباتي', to: '/user/allorders' },
                { label: 'المفضلة', to: '/user/favoriteproducts' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className="text-sm text-gray-500 hover:text-primary transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-gray-800 mb-4">تواصل معنا</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-gray-500">
                <Phone size={15} className="text-primary flex-shrink-0" />
                <span dir="ltr">0122 455 3463</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-500">
                <Mail size={15} className="text-primary flex-shrink-0" />
                <span>support@techstore.com</span>
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-500">
                <MapPin size={15} className="text-primary flex-shrink-0" />
                <span>القاهرة، مصر</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">© {new Date().getFullYear()} TechStore. جميع الحقوق محفوظة.</p>
          <div className="flex items-center gap-4">
            <Link to="#" className="text-xs text-gray-400 hover:text-primary transition-colors">الشروط والأحكام</Link>
            <Link to="#" className="text-xs text-gray-400 hover:text-primary transition-colors">سياسة الخصوصية</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
