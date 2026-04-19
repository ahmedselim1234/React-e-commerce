import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import UserSideBar from '../../components/User/UserSideBar';
import ProductCard from '../../components/Products/ProductCard';
import { useWishlist } from '../../contexts/WishlistContext';

export default function UserFavoriteProductsPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="lg:w-64"><UserSideBar /></aside>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-gray-900 mb-6">المفضلة ({wishlist.length})</h2>
            {wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-gray-100">
                <Heart size={56} className="text-gray-200 mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">لا توجد منتجات في المفضلة</h3>
                <p className="text-gray-400 mb-6">اضغط على ♥ على أي منتج لحفظه هنا</p>
                <Link to="/products" className="px-6 py-3 bg-gradient-primary text-white rounded-2xl font-semibold hover:opacity-90 transition-opacity">تصفح المنتجات</Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {wishlist.map(product => <ProductCard key={product._id} product={product} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
