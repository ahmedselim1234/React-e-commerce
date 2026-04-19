import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const SubTiltle = ({ title, btntitle, pathText }) => {
    return (
        <div className="flex justify-between items-center py-6 mb-4" dir="rtl">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{title}</h2>
            {btntitle && (
                <Link to={pathText} className="group flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all duration-300">
                    <span className="text-sm font-semibold text-gray-600 group-hover:text-primary transition-colors">{btntitle}</span>
                    <ArrowLeft size={16} className="text-gray-400 group-hover:text-primary transition-colors group-hover:-translate-x-1 duration-300" />
                </Link>
            )}
        </div>
    )
}

export default SubTiltle;
