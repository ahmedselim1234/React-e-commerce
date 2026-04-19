import { dummyBrands, dummyCategories } from "../../data/dummyData";

const SideFilter = () => {
    return (
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm sticky top-24" dir="rtl">
            <div className="mb-8">
                <h3 className="font-bold text-lg text-gray-800 mb-4 border-b border-gray-100 pb-2">الفئة</h3>
                <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2" />
                        <span className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors">الكل</span>
                    </label>
                    {dummyCategories.map((cat, index) => (
                        <label key={index} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2" />
                            <span className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors">{cat.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="mb-8">
                <h3 className="font-bold text-lg text-gray-800 mb-4 border-b border-gray-100 pb-2">الماركة</h3>
                <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2" />
                        <span className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors">الكل</span>
                    </label>
                    {dummyBrands.map((brand, index) => (
                        <label key={index} className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2" />
                            <span className="text-sm font-medium text-gray-600 group-hover:text-primary transition-colors">{brand.name}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-bold text-lg text-gray-800 mb-4 border-b border-gray-100 pb-2">السعر</h3>
                <div className="flex items-center gap-2">
                    <div className="flex flex-col flex-1">
                        <span className="text-xs text-gray-500 mb-1">من</span>
                        <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="0" />
                    </div>
                    <span className="text-gray-400 mt-5">-</span>
                    <div className="flex flex-col flex-1">
                        <span className="text-xs text-gray-500 mb-1">إلى</span>
                        <input type="number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-primary" placeholder="10000" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SideFilter;
