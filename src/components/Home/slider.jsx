import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { dummyProducts } from "../../data/dummyData";

const Silder = () => {
  const featuredProduct = dummyProducts[0] || {};
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-8 pb-16 sm:pt-16 sm:pb-24 lg:pb-32 xl:pb-40 rounded-3xl mx-4 sm:mx-6 lg:mx-8 my-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-8">
        
        {/* Content Side */}
        <div className="w-full lg:w-1/2 text-center lg:text-right z-10 animate-fade-in" dir="rtl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-gray-100 text-primary text-sm font-semibold mb-6">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
            أحدث الإصدارات لعام 2024
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 tracking-tight leading-tight mb-6">
            عصر جديد من <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">التكنولوجيا</span>
          </h1>
          
          <p className="mt-4 text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed font-medium">
            استكشف أحدث المنتجات التقنية مع خصومات لا تقبل المنافسة. تسوق الآن واحصل على أفضل العروض الحصرية.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link to="/products" className="w-full sm:w-auto px-8 py-4 bg-gray-900 hover:bg-primary text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-3 group">
              تسوق الآن
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </Link>
            <Link to="/offers" className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 border border-gray-200 hover:border-gray-300 rounded-2xl font-bold text-lg shadow-sm hover:shadow-md transition-all duration-300 text-center">
              عروض اليوم
            </Link>
          </div>
        </div>

        {/* Image Side */}
        <div className="w-full lg:w-1/2 relative z-10 flex justify-center animate-fade-up">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[450px] lg:h-[450px]">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full mix-blend-multiply"></div>
              <img
                src={featuredProduct.imageCover || 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800'}
                alt="Featured"
                className="w-full h-full object-contain relative z-20 drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
              />
              
              <div className="absolute -top-6 left-0 lg:-left-6 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white z-30 animate-fade-in" style={{animationDelay: '0.5s'}}>
                  <div className="flex items-center gap-3">
                      <div className="bg-red-100 text-red-600 p-2 rounded-xl font-black">خصم</div>
                      <div dir="rtl">
                          <p className="text-xs text-gray-500 font-bold">توفير حتى</p>
                          <p className="text-xl font-black text-gray-900">50%</p>
                      </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Silder;
