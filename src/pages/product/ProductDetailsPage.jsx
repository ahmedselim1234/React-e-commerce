import CategoryHeader from '../../components/category/CategoryHeader'
import CartContainer from '../../components/Products/CartContainer'
import ProductDetalis from './ProductsDetails'
import RateContainer from '../../components/Rate/RateContainer'
import { dummyProducts } from '../../data/dummyData'

const ProductDetalisPage = () => {
    return (
        <div className="min-h-screen bg-background pb-16">
            <CategoryHeader />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
                <ProductDetalis />
                <RateContainer />
                <CartContainer title={"منتجات قد تعجبك"} products={dummyProducts.slice(0, 4)} />
            </div>
        </div>
    )
}

export default ProductDetalisPage;
