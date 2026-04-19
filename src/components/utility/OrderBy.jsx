const OrderBy = ({ title }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-4 mb-2 border-b border-gray-100" dir="rtl">
      <h2 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">{title}</h2>
      <div className="flex items-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-gray-200 shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
        <label htmlFor="sort" className="text-sm font-medium text-gray-500 whitespace-nowrap">ترتيب حسب:</label>
        <select id="sort" className="bg-transparent text-sm font-bold text-gray-800 focus:outline-none cursor-pointer">
            <option>الاكثر مبيعا</option>
            <option>الاعلي تقييما</option>
            <option>السعر من الاقل للاعلي</option>
            <option>السعر من الاعلي للاقل</option>
        </select>
      </div>
    </div>
  );
};

export default OrderBy;
