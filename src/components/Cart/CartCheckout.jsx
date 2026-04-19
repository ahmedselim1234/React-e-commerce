import { Link } from 'react-router-dom'
import { Tag } from 'lucide-react'

const CartCheckout = ({ items }) => {
    return (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 sticky top-24" dir="rtl">
            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">ملخص الطلب</h3>
            
            <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        className="block w-full pr-10 pl-3 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                        placeholder="كود الخصم"
                    />
                </div>
                <button className="px-4 py-3 bg-gray-900 hover:bg-primary text-white rounded-xl text-sm font-bold transition-colors shrink-0">
                    تطبيق
                </button>
            </div>
            
            <div className="space-y-3 mb-6 border-b border-gray-100 pb-6">
                <div className="flex justify-between text-gray-600 font-medium">
                    <span>المجموع الفرعي</span>
                    <span>34,000 ج.م</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                    <span>الخصم</span>
                    <span className="text-red-500">- 4,000 ج.م</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                    <span>التوصيل</span>
                    <span className="text-secondary">مجاني</span>
                </div>
            </div>

            <div className="flex justify-between items-end mb-8">
                <span className="text-gray-900 font-bold text-lg">الإجمالي:</span>
                <div className="flex items-end gap-1">
                    <span className="text-3xl font-black text-gray-900">30,000</span>
                    <span className="text-sm font-bold text-gray-500 mb-1">ج.م</span>
                </div>
            </div>

            <Link
                to="/order/paymethoud"
                className="w-full flex justify-center py-4 px-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg shadow-lg shadow-primary/30 transition-transform transform hover:-translate-y-1 block text-center"
            >
                إتمام الشراء
            </Link> 
        </div>
    )
}               

export default CartCheckout;
