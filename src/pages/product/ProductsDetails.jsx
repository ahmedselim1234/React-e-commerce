import ProductGallery from './ProductGallery'
import ProductText from './ProductText'

const ProductDetalis = () => {
    return (
        <div className="bg-white rounded-[40px] p-4 sm:p-8 shadow-sm border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-10">
                <div className="w-full lg:w-5/12">
                    <ProductGallery />
                </div>

                <div className="w-full lg:w-7/12">
                   <ProductText />
                </div>
            </div>
        </div>
    )
}

export default ProductDetalis;
