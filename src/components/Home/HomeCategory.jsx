import SubTiltle from '../utility/subTitle';
import CategoryCard from '../category/CategoryCard';
import { dummyCategories } from '../../data/dummyData';

const HomeCategory = () => {
    return (
        <section className="bg-white/50 backdrop-blur-md py-4 my-8 rounded-3xl mx-4 sm:mx-6 lg:mx-8 border border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <SubTiltle title="اكتشف التصنيفات" btntitle="عرض الكل" pathText="/allcategory" />
                
                <div className="flex overflow-x-auto pb-6 pt-2 gap-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] md:justify-center">
                    {dummyCategories.map((cat, index) => (
                        <div key={index} className="snap-center">
                            <CategoryCard title={cat.name} img={cat.image} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HomeCategory;
