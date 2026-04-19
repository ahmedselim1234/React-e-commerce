import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DiscountSection = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
            <div className="relative overflow-hidden bg-gray-900 rounded-3xl shadow-2xl border border-gray-800">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary blur-3xl"></div>
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary blur-3xl"></div>
                </div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:p-16 gap-8">
                    <div className="w-full md:w-1/2 text-center md:text-right" dir="rtl">
                        <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 text-white text-xs font-bold tracking-wider mb-6 border border-white/20 backdrop-blur-sm">
                            عرض حصري
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
                            خصم يصل حتى <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-400">٣٠٪</span><br/>
                            على أجهزة اللاب توب
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto md:mx-0 leading-relaxed font-medium">
                            احصل على أفضل الأجهزة بأقوى المواصفات وأقل الأسعار. العرض ساري لفترة محدودة. تسوق الآن!
                        </p>
                        <Link to="/products" className="inline-flex items-center gap-2 bg-primary hover:bg-white text-white hover:text-gray-900 px-8 py-4 rounded-2xl font-bold transition-all duration-300 group shadow-lg hover:shadow-xl">
                            تسوق العرض
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </Link>
                    </div>
                    
                    <div className="w-full md:w-1/2 flex justify-center lg:justify-end shrink-0">
                        <img 
                            className="w-full max-w-[300px] md:max-w-md object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-500" 
                            src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=600" 
                            alt="Laptops Discount" 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiscountSection;
