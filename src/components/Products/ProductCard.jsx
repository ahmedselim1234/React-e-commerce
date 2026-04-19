import { Link } from "react-router-dom";
import { Heart, Star } from "lucide-react";

const ProductCard = ({ product }) => {
  return (
    <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary/20 flex flex-col h-full relative" dir="rtl">
        <button className="absolute top-3 left-3 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors z-10 opacity-0 group-hover:opacity-100 shadow-sm cursor-pointer border border-gray-100">
            <Heart size={18} />
        </button>

        <Link to={`/products/${product?._id || 1}`} className="block relative aspect-square overflow-hidden bg-gray-50 p-6 flex-shrink-0">
            <img 
                src={product?.imageCover || product?.img || 'https://via.placeholder.com/150'} 
                alt={product?.title || 'Product'} 
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
            />
            {product?.priceAfterDiscount && (
                 <div className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                    تخفيض
                </div>
            )}
        </Link>
        
        <div className="p-4 flex flex-col flex-grow">
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[48px] text-sm group-hover:text-primary transition-colors">
                {product?.title || 'سود كربون ساعة يد ذكية بيب إس أسود كربون'}
            </h3>
            
            <div className="mt-auto">
                <div className="flex items-center gap-1 mb-2">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-bold text-gray-700">{product?.ratingsAverage || 4.5}</span>
                    <span className="text-[10px] text-gray-400">({product?.ratingsQuantity || 120})</span>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-1">
                            <span className="text-lg font-black text-gray-900">{product?.priceAfterDiscount || product?.price || 880}</span>
                            <span className="text-xs text-gray-500 font-medium">ج.م</span>
                        </div>
                        {product?.priceAfterDiscount && (
                            <span className="text-[10px] text-gray-400 line-through">{product?.price} ج.م</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ProductCard;
