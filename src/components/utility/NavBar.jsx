import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import logo from '../../images/logo.png';

const NavBar = () => {
    return (
        <nav className="sticky top-0 z-50 glass w-full px-4 py-3 sm:px-6 lg:px-8 border-b border-card-border animate-fade-in" dir="rtl">
            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
                
                {/* Logo Section */}
                <div className="flex-shrink-0 flex items-center gap-4">
                    <button className="md:hidden p-2 text-foreground hover:text-primary transition-colors">
                        <Menu size={24} />
                    </button>
                    <Link to='/' className="flex items-center gap-2 hover-lift">
                        <img src={logo} className='h-10 w-11 object-contain' alt="Logo" />
                        <span className="hidden sm:block font-bold text-xl text-gradient">TechStore</span>
                    </Link>
                </div>

                {/* Search Bar */}
                <div className="flex-1 max-w-2xl px-6 hidden md:block">
                    <div className="relative group">
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pr-11 pl-3 py-2.5 border border-gray-200 rounded-2xl leading-5 bg-white/50 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary focus:bg-white transition-all duration-300"
                            placeholder="ابحث عن المنتجات..."
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 sm:gap-6">
                    <Link to='/login' className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group p-2 rounded-xl hover:bg-gray-100/50">
                        <div className="p-2 bg-gray-100 rounded-full group-hover:bg-primary/10 transition-colors">
                            <User size={20} className="group-hover:text-primary" />
                        </div>
                        <span className="hidden sm:block font-medium">دخول</span>
                    </Link>
                    
                    <Link to='/cart' className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group p-2 rounded-xl hover:bg-gray-100/50 relative">
                        <div className="p-2 bg-gray-100 rounded-full group-hover:bg-primary/10 transition-colors relative">
                            <ShoppingCart size={20} className="group-hover:text-primary" />
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white shadow-sm">
                                2
                            </span>
                        </div>
                        <span className="hidden sm:block font-medium">العربة</span>
                    </Link>
                </div>

            </div>
            
            {/* Mobile Search */}
            <div className="mt-3 relative md:hidden">
                 <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    className="block w-full pr-10 pl-3 py-2 border border-gray-200 rounded-xl leading-5 bg-white/50 backdrop-blur-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary focus:bg-white"
                    placeholder="ابحث عن المنتجات..."
                />
            </div>
        </nav>
    );
}

export default NavBar;
