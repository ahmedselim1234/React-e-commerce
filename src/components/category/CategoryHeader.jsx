import { dummyCategories } from "../../data/dummyData";

const CategoryHeader = () => {
    return (
        <div className="bg-white border-b border-gray-100 py-3 shadow-sm" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-8 overflow-x-auto hide-scrollbar whitespace-nowrap text-sm font-semibold text-gray-500">
                    <div className="hover:text-primary cursor-pointer transition-colors text-primary border-b-2 border-primary pb-1">الكل</div>
                    {dummyCategories.map((cat, index) => (
                        <div key={index} className="hover:text-primary cursor-pointer transition-colors pb-1">
                            {cat.name}
                        </div>
                    ))}
                    <div className="hover:text-primary cursor-pointer transition-colors pb-1">المزيد</div>
                </div>
            </div>
        </div>
    )
}

export default CategoryHeader;
