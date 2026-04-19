import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4" dir="rtl">
      <div className="text-center max-w-md">
        <div className="text-8xl font-black text-gradient mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">الصفحة غير موجودة</h1>
        <p className="text-gray-500 mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity">
            <Home size={18} /> الرئيسية
          </Link>
          <Link to="/products" className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-gray-700 rounded-2xl font-semibold hover:bg-gray-50 transition-colors">
            <Search size={18} /> تصفح المنتجات
          </Link>
        </div>
      </div>
    </div>
  );
}
