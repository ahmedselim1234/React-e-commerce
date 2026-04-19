import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus } from 'lucide-react';

const CartItem = ({ item }) => {
    return (
        <div className="bg-white rounded-3xl p-4 sm:p-6 mb-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 hover:shadow-md transition-shadow relative group" dir="rtl">
            <button className="absolute top-4 left-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                <Trash2 size={20} />
            </button>
            
            <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-2xl flex items-center justify-center p-4">
                <img src={item?.product?.imageCover || 'https://via.placeholder.com/150'} alt="product" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
            
            <div className="flex-1 flex flex-col">
                <div className="pr-1">
                    <span className="text-secondary font-semibold text-xs bg-secondary/10 px-2 py-1 rounded-md">{item?.product?.category?.name || 'الالكترونيات'}</span>
                    <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1 w-11/12 line-clamp-2">
                        {item?.product?.title || 'آيفون XR بذاكرة سعة 128 جيجابايت'}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-500 font-medium">الماركة:</span>
                        <span className="text-sm font-bold text-gray-800">{item?.product?.brand?.name || 'ابل'}</span>
                    </div>
                     <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs text-gray-500 font-medium">اللون:</span>
                        <div
                            className="w-4 h-4 rounded-full border border-gray-200"
                            style={{ backgroundColor: item?.color || "#E52C2C" }}
                        ></div>
                    </div>
                </div>
                
                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-xl p-1 border border-gray-200">
                        <button className="p-1 hover:bg-white rounded-lg transition-colors text-gray-600">
                            <Plus size={16} />
                        </button>
                        <span className="font-bold text-gray-900 w-6 text-center">{item?.count || 1}</span>
                        <button className="p-1 hover:bg-white rounded-lg transition-colors text-gray-600">
                            <Minus size={16} />
                        </button>
                    </div>
                    
                    <div className="flex items-end gap-1">
                        <span className="text-xl sm:text-2xl font-black text-gray-900">{item?.price || 3000}</span>
                        <span className="text-xs font-bold text-gray-500 mb-1">ج.م</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem;
