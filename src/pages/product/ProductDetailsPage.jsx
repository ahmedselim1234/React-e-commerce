import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, Check, Minus, Plus, ChevronRight } from 'lucide-react';
import { dummyProducts, getProductReviews } from '../../data/dummyData';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import CartContainer from '../../components/Products/CartContainer';
import ReviewsSection from '../../components/Rate/RateContainer';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const product = dummyProducts.find(p => p._id === id) || dummyProducts[0];
  const reviews = getProductReviews(product._id);
  const related = dummyProducts.filter(p => p._id !== product._id && p.category._id === product.category._id).slice(0, 4);

  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();
  const toast = useToast();

  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product.imageCover);

  const inCart = isInCart(product._id);
  const inWishlist = isInWishlist(product._id);
  const hasDiscount = product.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discountPercent = hasDiscount ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100) : 0;

  const allImages = [product.imageCover, ...(product.availableImages || [])].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i);

  const handleAddToCart = () => {
    if (inCart) return;
    addToCart(product, selectedColor, quantity);
    toast.success('تم إضافة المنتج للعربة ✓');
  };

  const handleWishlist = () => {
    const { added } = toggleWishlist(product);
    added ? toast.info('تم الإضافة للمفضلة ❤️') : toast.info('تم الحذف من المفضلة');
  };

  return (
    <div className="min-h-screen bg-background pb-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
          <Link to="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <ChevronRight size={14} className="rotate-180" />
          <Link to="/products" className="hover:text-primary transition-colors">المنتجات</Link>
          <ChevronRight size={14} className="rotate-180" />
          <span className="text-gray-600 font-medium truncate max-w-[200px]">{product.title}</span>
        </nav>

        {/* Main Product Section */}
        <div className="bg-white rounded-3xl border border-gray-100 p-6 lg:p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Images */}
            <div className="lg:w-1/2 flex-shrink-0">
              <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden mb-4 p-8 flex items-center justify-center">
                <img src={mainImage} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
              </div>
              {allImages.length > 1 && (
                <div className="flex gap-3 flex-wrap">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setMainImage(img)}
                      className={`w-16 h-16 rounded-xl border-2 overflow-hidden bg-gray-50 p-1 transition-all
                        ${mainImage === img ? 'border-primary shadow-md' : 'border-transparent hover:border-gray-300'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="lg:w-1/2 flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <span className="text-xs text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full">{product.category.name}</span>
                  <h1 className="text-xl lg:text-2xl font-black text-gray-900 mt-3 leading-tight">{product.title}</h1>
                </div>
                <div className="flex gap-2">
                  <button onClick={handleWishlist} className={`p-2.5 rounded-xl border transition-colors ${inWishlist ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500 hover:bg-red-50'}`}>
                    <Heart size={20} fill={inWishlist ? '#ef4444' : 'none'} />
                  </button>
                  <button onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.info('تم نسخ الرابط'); }} className="p-2.5 rounded-xl border border-gray-200 text-gray-400 hover:border-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={16} className={s <= Math.round(product.Averagerating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-700">{product.Averagerating?.toFixed(1)}</span>
                <span className="text-sm text-gray-400">({product.ratingsQuantity} تقييم)</span>
                <span className="text-sm text-gray-400">·</span>
                <span className="text-sm text-green-600 font-medium">{product.sold} مبيع</span>
              </div>

              {/* Price */}
              <div className="flex items-end gap-3 mb-6 p-4 bg-gray-50 rounded-2xl">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-black text-gray-900">{product.priceAfterDiscount || product.price}</span>
                    <span className="text-base text-gray-500 font-medium">ج.م</span>
                  </div>
                  {hasDiscount && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-400 line-through">{product.price} ج.م</span>
                      <span className="text-xs font-bold text-white bg-red-500 px-2 py-0.5 rounded-lg">وفر {discountPercent}%</span>
                    </div>
                  )}
                </div>
                <div className="mr-auto text-left">
                  <span className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg ${product.quantity > 5 ? 'bg-green-50 text-green-700' : product.quantity > 0 ? 'bg-orange-50 text-orange-700' : 'bg-red-50 text-red-700'}`}>
                    {product.quantity > 5 ? 'متاح في المخزن' : product.quantity > 0 ? `متبقي ${product.quantity} فقط` : 'نفد من المخزن'}
                  </span>
                </div>
              </div>

              {/* Brand */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm text-gray-500">الماركة:</span>
                <span className="text-sm font-semibold text-gray-800">{product.brand?.name}</span>
              </div>

              {/* Colors */}
              {product.colors?.length > 0 && (
                <div className="mb-5">
                  <p className="text-sm font-semibold text-gray-700 mb-2">اللون: <span className="font-normal text-gray-500">{selectedColor || 'اختر لوناً'}</span></p>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        style={{ backgroundColor: color }}
                        className={`w-9 h-9 rounded-full border-2 transition-all ${selectedColor === color ? 'border-primary scale-110 shadow-lg' : 'border-gray-200 hover:scale-105'}`}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">الكمية:</p>
                <div className="flex items-center gap-3">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40" disabled={quantity <= 1}>
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-bold text-gray-800">{quantity}</span>
                  <button onClick={() => setQuantity(q => Math.min(product.quantity, q + 1))} className="w-9 h-9 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-40" disabled={quantity >= product.quantity}>
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={handleAddToCart}
                  disabled={inCart || product.quantity === 0}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-sm transition-all
                    ${inCart ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gradient-primary text-white shadow-lg shadow-primary/20 hover:opacity-90'}`}
                >
                  {inCart ? <><Check size={18} /> في العربة</> : <><ShoppingCart size={18} /> أضف للعربة</>}
                </button>
                <Link to="/cart" className="px-6 py-3.5 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-gray-800 transition-colors">
                  اشتري الآن
                </Link>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-3">وصف المنتج</h2>
            <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
          </div>
        </div>

        {/* Reviews */}
        <ReviewsSection product={product} reviews={reviews} />

        {/* Related Products */}
        {related.length > 0 && (
          <CartContainer title="منتجات ذات صلة" products={related} pathText="/products" btntitle="المزيد" />
        )}
      </div>
    </div>
  );
}
