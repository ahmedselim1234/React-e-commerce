import { Star, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';
import { dummyProducts } from "../../data/dummyData";

const ProductText = () => {
    const product = dummyProducts[0];

    return (
        <div className="flex flex-col h-full py-4 text-right" dir="rtl">
            <div className="mb-2">
                <span className="text-secondary font-semibold text-sm bg-secondary/10 px-3 py-1.5 rounded-full">{product?.category?.name || 'الالكترونيات'}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mt-4 leading-tight">
                {product?.title || 'آيفون XR بذاكرة سعة 128 جيجابايت'}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 mt-4">
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full">
                    <Star size={18} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-yellow-700">{product?.ratingsAverage || 4.5}</span>
                    <span className="text-sm text-yellow-600">({product?.ratingsQuantity || 124} تقييم)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-gray-500 font-medium">الماركة:</span>
                    <span className="font-bold text-gray-900">{product?.brand?.name || 'سامسونج'}</span>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-gray-900 font-bold mb-3">الألوان المتاحة:</h3>
                <div className="flex items-center gap-3">
                    {product?.colors?.map((color, idx) => (
                         <div
                            key={idx}
                            className="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-200 ring-offset-2 hover:ring-2 ring-primary transition-all"
                            style={{ backgroundColor: color }}
                         ></div>
                    ))}
                </div>
            </div>

            <div className="mt-8 mb-8 border-t border-b border-gray-100 py-6">
                <h3 className="text-gray-900 font-bold mb-3 text-lg">المواصفات والتفاصيل:</h3>
                <p className="text-gray-600 leading-relaxed font-medium">
                    {product?.description || 'يتميز بوجود بطاقة SIM مزدوجة بطاقة فعلية وبطاقة e-SIM يمكنك فتح قفل هاتفك وتسجيل الدخول إلى التطبيقات والحسابات وغيرها بسهولة.'}
                </p>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 w-full flex items-center justify-between sm:justify-start gap-4">
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-500 line-through text-left">{product?.price} ج.م</span>
                        <div className="flex items-end gap-1">
                            <span className="text-3xl font-black text-gray-900">{product?.priceAfterDiscount || product?.price}</span>
                            <span className="text-lg font-bold text-gray-500 mb-1">ج.م</span>
                        </div>
                    </div>
                </div>
                
                <button className="w-full sm:w-auto bg-gray-900 hover:bg-primary text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-lg shadow-primary/20">
                    <ShoppingCart size={20} />
                    إضافة للعربة
                </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3 text-gray-600">
                    <div className="p-2 bg-green-50 text-green-600 rounded-full">
                        <ShieldCheck size={20} />
                    </div>
                    <span className="font-semibold text-sm">ضمان سنة كاملة</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                        <Truck size={20} />
                    </div>
                    <span className="font-semibold text-sm">توصيل مجاني</span>
                </div>
            </div>
        </div>
    )
}

export default ProductText;
