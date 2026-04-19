import { Link, useLocation } from 'react-router-dom';
import { Package, Heart, MapPin, User } from 'lucide-react';

const UserSideBar = () => {
    const location = useLocation();

    const links = [
        { path: "/user/allorders", label: "إدارة الطلبات", icon: <Package size={20} /> },
        { path: "/user/favoriteproducts", label: "المنتجات المفضلة", icon: <Heart size={20} /> },
        { path: "/user/addresses", label: "العناوين الشخصية", icon: <MapPin size={20} /> },
        { path: "/user/profile", label: "الملف الشخصي", icon: <User size={20} /> }
    ];

    return (
        <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 flex flex-col gap-2 relative z-10 sticky top-24" dir="rtl">
            <div className="px-4 py-4 border-b border-gray-100 mb-2">
                <h3 className="font-black text-gray-900 text-lg">لوحة التحكم</h3>
            </div>
            {links.map((link, idx) => {
                const isActive = location.pathname.includes(link.path);
                return (
                    <Link key={idx} to={link.path} className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${isActive ? 'bg-primary text-white shadow-md shadow-primary/20 font-bold' : 'text-gray-600 hover:bg-gray-50 hover:text-primary font-medium'}`}>
                        <div className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-primary'}>
                            {link.icon}
                        </div>
                        {link.label}
                    </Link>
                )
            })}
        </div>
    )
}

export default UserSideBar;
