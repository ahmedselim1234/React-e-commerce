import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-100 mt-10" dir="rtl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    
                    {/* Links */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-6">
                        <Link to="#" className="text-gray-500 hover:text-primary transition-colors text-sm font-medium">الشروط والأحكام</Link>
                        <Link to="#" className="text-gray-500 hover:text-primary transition-colors text-sm font-medium">سياسة الخصوصية</Link>
                        <Link to="#" className="text-gray-500 hover:text-primary transition-colors text-sm font-medium">اتصل بنا</Link>
                    </div>

                    {/* Contact & Socials */}
                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end gap-6">
                        <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-full">
                            <Phone size={18} className="text-primary" />
                            <span className="font-semibold text-sm" dir="ltr">0122 455 3463</span>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-primary hover:bg-primary/10 transition-all duration-300">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-pink-500 hover:bg-pink-50 transition-all duration-300">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="p-2 bg-gray-50 rounded-full text-gray-500 hover:text-blue-400 hover:bg-blue-50 transition-all duration-300">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>
                    
                </div>
                
                <div className="mt-8 pt-8 border-t border-gray-100 flex justify-center items-center">
                    <p className="text-gray-400 text-sm">
                        &copy; {new Date().getFullYear()} TechStore. جميع الحقوق محفوظة.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
