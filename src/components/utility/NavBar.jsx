import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, Heart, LogOut, Settings, Package, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useWishlist } from '../../contexts/WishlistContext';

const TechStoreLogo = () => (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
            <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366f1" />
                <stop offset="1" stopColor="#ec4899" />
            </linearGradient>
        </defs>
        <rect width="36" height="36" rx="10" fill="url(#logoGrad)" />
        <path d="M14 17v-3a4 4 0 018 0v3" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        <rect x="10" y="17" width="16" height="11" rx="3" fill="white" fillOpacity="0.9" />
        <circle cx="15" cy="22" r="1.5" fill="url(#logoGrad)" />
        <circle cx="21" cy="22" r="1.5" fill="url(#logoGrad)" />
        <path d="M18 21v2.5" stroke="url(#logoGrad)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const NavBar = () => {
    const { totalItems } = useCart();
    const { wishlistCount } = useWishlist();
    const { user, logout, isAdminOrManager } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const currentSearch = searchParams.get('search') || '';
    const [searchQuery, setSearchQuery] = useState(currentSearch);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Sync search input with URL search param
    useEffect(() => {
        setSearchQuery(currentSearch);
    }, [currentSearch]);

    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const clearSearch = () => {
        setSearchQuery('');
        navigate('/products');
    };

    const handleLogout = () => {
        logout();
        setUserMenuOpen(false);
        navigate('/');
    };

    return (
        <nav className="sticky top-0 z-50 glass w-full px-4 py-3 sm:px-6 lg:px-8 border-b border-card-border animate-fade-in" dir="rtl">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

                {/* Logo */}
                <div className="flex-shrink-0 flex items-center gap-3">
                    <button
                        className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <Link to='/' className="flex items-center gap-2 hover-lift">
                        <TechStoreLogo />
                        <span className="hidden sm:block font-bold text-xl text-gradient">TechStore</span>
                    </Link>
                </div>

                {/* Nav Links - Desktop */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
                    <Link to="/products" className="hover:text-primary transition-colors">المنتجات</Link>
                    <Link to="/allcategory" className="hover:text-primary transition-colors">الأقسام</Link>
                    <Link to="/allbrand" className="hover:text-primary transition-colors">الماركات</Link>
                    <Link to="/offers" className="hover:text-secondary transition-colors text-secondary font-semibold">العروض</Link>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="flex-1 max-w-md px-4 hidden md:block">
                    <div className="relative group">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <Search className="h-4 w-4 text-gray-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pr-11 pl-10 py-2.5 border border-gray-200 rounded-2xl text-sm bg-white/50 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white transition-all"
                            placeholder="ابحث عن منتج..."
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={clearSearch}
                                className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={15} />
                            </button>
                        )}
                    </div>
                </form>

                {/* Actions */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Wishlist */}
                    {user && (
                        <Link to='/user/favoriteproducts' className="relative p-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors">
                            <Heart size={22} />
                            {wishlistCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                                    {wishlistCount}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Cart */}
                    <Link to='/cart' className="relative p-2 text-gray-600 hover:text-primary hover:bg-primary/5 rounded-xl transition-colors group">
                        <ShoppingCart size={22} />
                        {totalItems > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center rounded-full bg-secondary text-[9px] font-bold text-white">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    {/* User Menu */}
                    {user ? (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                            >
                                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold">
                                    {user.first_name?.charAt(0) || 'U'}
                                </div>
                                <span className="hidden sm:block text-sm font-medium text-gray-700 max-w-[80px] truncate">
                                    {user.first_name}
                                </span>
                                <ChevronDown size={14} className={`text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {userMenuOpen && (
                                <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-scale-in z-50">
                                    <div className="px-4 py-3 border-b border-gray-50">
                                        <p className="text-xs text-gray-400">مرحباً،</p>
                                        <p className="font-semibold text-gray-800">{user.first_name}</p>
                                        <p className="text-xs text-gray-400 truncate">{user.email}</p>
                                    </div>
                                    <Link to="/user/profile" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                                        <User size={16} /> حسابي
                                    </Link>
                                    <Link to="/user/allorders" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                                        <Package size={16} /> طلباتي
                                    </Link>
                                    {isAdminOrManager && (
                                        <Link to="/admin" onClick={() => setUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-indigo-600 hover:bg-indigo-50 transition-colors">
                                            <Settings size={16} /> لوحة التحكم
                                        </Link>
                                    )}
                                    <div className="border-t border-gray-50 mt-2 pt-2">
                                        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                            <LogOut size={16} /> تسجيل الخروج
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to='/login' className="flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
                            <User size={16} />
                            <span className="hidden sm:block">دخول</span>
                        </Link>
                    )}
                </div>
            </div>

            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-3 relative md:hidden">
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pr-10 pl-10 py-2 border border-gray-200 rounded-xl text-sm bg-white/50 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="ابحث عن منتج..."
                />
                {searchQuery && (
                    <button
                        type="button"
                        onClick={clearSearch}
                        className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={15} />
                    </button>
                )}
            </form>

            {/* Mobile Nav Menu */}
            {mobileMenuOpen && (
                <div className="mt-3 pb-2 border-t border-gray-100 pt-3 flex flex-col gap-2 md:hidden">
                    <Link to="/products" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors">المنتجات</Link>
                    <Link to="/allcategory" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors">الأقسام</Link>
                    <Link to="/allbrand" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-xl transition-colors">الماركات</Link>
                    <Link to="/offers" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm font-semibold text-secondary hover:bg-pink-50 rounded-xl transition-colors">العروض</Link>
                    {user && isAdminOrManager && (
                        <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">لوحة التحكم</Link>
                    )}
                </div>
            )}
        </nav>
    );
};

export default NavBar;
