import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Box, Tag, FolderPlus, Layers, PlusSquare, Users, Ticket } from 'lucide-react';

const AdminSideBar = () => {
    const location = useLocation();

    const links = [
        { path: "/admin", label: "لوحة التحكم", icon: <LayoutDashboard size={18} />, exact: true },
        { path: "/admin/allorders", label: "إدارة الطلبات", icon: <ShoppingBag size={18} /> },
        { path: "/admin/allproducts", label: "إدارة المنتجات", icon: <Box size={18} /> },
        { path: "/admin/users", label: "إدارة المستخدمين", icon: <Users size={18} /> },
        { path: "/admin/coupons", label: "الكوبونات", icon: <Ticket size={18} /> },
        { path: "/admin/addbrand", label: "إدارة الماركات", icon: <Tag size={18} /> },
        { path: "/admin/addcategory", label: "إدارة التصنيفات", icon: <FolderPlus size={18} /> },
        { path: "/admin/addsubcategory", label: "التصنيفات الفرعية", icon: <Layers size={18} /> },
        { path: "/admin/addproduct", label: "إضافة منتج", icon: <PlusSquare size={18} /> },
    ];

    return (
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col gap-1 relative z-10 sticky top-24" dir="rtl">
            <div className="px-4 py-3 border-b border-gray-100 mb-2">
                <h3 className="font-black text-gray-900 text-base">الإدارة</h3>
            </div>
            {links.map((link, idx) => {
                const isActive = link.exact ? location.pathname === link.path : location.pathname.startsWith(link.path);
                return (
                    <Link
                        key={idx}
                        to={link.path}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm
                            ${isActive
                                ? 'bg-gradient-primary text-white shadow-md font-bold'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                            }`}
                    >
                        <div className={isActive ? 'text-white' : 'text-gray-400'}>
                            {link.icon}
                        </div>
                        {link.label}
                    </Link>
                );
            })}
        </div>
    );
};

export default AdminSideBar;
