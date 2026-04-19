import { Link } from "react-router-dom";
import { Heart, Star, ShoppingCart, Check } from "lucide-react";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishlistContext";
import { useToast } from "../../contexts/ToastContext";

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const toast = useToast();

  const inCart = isInCart(product?._id);
  const inWishlist = isInWishlist(product?._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCart) return;
    addToCart(product, product?.colors?.[0] || '', 1);
    toast.success('تم إضافة المنتج للعربة ✓');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { added } = toggleWishlist(product);
    added ? toast.info('تم الإضافة للمفضلة ❤️') : toast.info('تم الحذف من المفضلة');
  };

  const hasDiscount = product?.priceAfterDiscount && product.priceAfterDiscount < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.priceAfterDiscount) / product.price) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 flex flex-col h-full relative" dir="rtl">

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className={`absolute top-3 left-3 p-2 rounded-full transition-all z-10 shadow-sm border border-gray-100
          ${inWishlist
            ? 'bg-red-50 text-red-500 opacity-100'
            : 'bg-white/80 backdrop-blur-sm text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100'
          }`}
      >
        <Heart size={18} fill={inWishlist ? '#ef4444' : 'none'} />
      </button>

      {/* Discount Badge */}
      {hasDiscount && (
        <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
          -{discountPercent}%
        </div>
      )}

      {/* Image */}
      <Link to={`/products/${product?._id}`} className="block relative aspect-square overflow-hidden bg-gray-50 p-6 flex-shrink-0">
        <img
          src={product?.imageCover || 'https://via.placeholder.com/400'}
          alt={product?.title || 'Product'}
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
        />
      </Link>

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-primary font-medium mb-1">{product?.category?.name || ''}</p>
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[40px] text-sm group-hover:text-primary transition-colors">
          {product?.title || 'اسم المنتج'}
        </h3>

        <div className="mt-auto space-y-3">
          {/* Rating */}
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map((s) => (
              <Star
                key={s}
                size={11}
                className={s <= Math.round(product?.Averagerating || 0)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-200 fill-gray-200"}
              />
            ))}
            <span className="text-xs font-bold text-gray-700 mr-1">{product?.Averagerating?.toFixed(1) || '0.0'}</span>
            <span className="text-[10px] text-gray-400">({product?.ratingsQuantity || 0})</span>
          </div>

          {/* Price + Cart */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-base font-black text-gray-900">
                  {product?.priceAfterDiscount || product?.price || 0}
                </span>
                <span className="text-xs text-gray-500 font-medium">ج.م</span>
              </div>
              {hasDiscount && (
                <span className="text-[10px] text-gray-400 line-through">{product?.price} ج.م</span>
              )}
            </div>

            <button
              onClick={handleAddToCart}
              disabled={inCart}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all
                ${inCart
                  ? 'bg-green-50 text-green-600 border border-green-200'
                  : 'bg-gradient-primary text-white hover:opacity-90 shadow-sm hover:shadow-md'
                }`}
            >
              {inCart ? <><Check size={13} /> في العربة</> : <><ShoppingCart size={13} /> أضف</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
