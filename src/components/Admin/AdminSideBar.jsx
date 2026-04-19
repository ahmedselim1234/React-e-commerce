import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Box, Tag, FolderPlus, Layers, PlusSquare } from 'lucide-react';

const AdminSideBar = () => {
    const location = useLocation();

    const links = [
        { path: "/admin/allorders", label: "إدارة الطلبات", icon: <ShoppingBag size={20} /> },
        { path: "/admin/allproducts", label: "إدارة المنتجات", icon: <Box size={20} /> },
        { path: "/admin/addbrand", label: "أضف ماركة", icon: <Tag size={20} /> },
        { path: "/admin/addcategory", label: "أضف تصنيف", icon: <FolderPlus size={20} /> },
        { path: "/admin/addsubcategory", label: "أضف تصنيف فرعي", icon: <Layers size={20} /> },
        { path: "/admin/addproduct", label: "أضف منتج", icon: <PlusSquare size={20} /> },
    ];

    return (
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col gap-2 relative z-10 sticky top-24" dir="rtl">
             <div className="px-4 py-4 border-b border-gray-100 mb-2">
                <h3 className="font-black text-gray-900 text-lg">لوحة الإدارة</h3>
            </div>
            {links.map((link, idx) => {
                const isActive = location.pathname.includes(link.path);
                return (
                    <Link key={idx} to={link.path} className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${isActive ? 'bg-gray-900 text-white shadow-md font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'}`}>
                        <div className={isActive ? 'text-white' : 'text-gray-400'}>
                            {link.icon}
                        </div>
                        {link.label}
                    </Link>
                )
            })}
        </div>
    )
}

export default AdminSideBar;
