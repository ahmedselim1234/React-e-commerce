import RateItem from './RateItem';
import RatePost from './RatePost';
import { Star } from 'lucide-react';
import Pagination1 from '../utility/Pagination';

const RateContainer = () => {
    return (
        <div className="bg-white rounded-[40px] p-6 sm:p-10 shadow-sm border border-gray-100 mt-8" dir="rtl">
            <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">التقييمات والمراجعات</h2>
                <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                    <Star size={20} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-black text-gray-900 text-lg">4.3</span>
                    <span className="text-sm font-medium text-gray-500">(160 تقييم)</span>
                </div>
            </div>
            
            <RatePost />
            
            <div className="mt-8 space-y-6">
                <RateItem />
                <RateItem />
                <RateItem />
                <RateItem />
            </div>

            <div className="mt-10 flex justify-center">
                <Pagination1 />
            </div>
        </div>
    )
}

export default RateContainer;
