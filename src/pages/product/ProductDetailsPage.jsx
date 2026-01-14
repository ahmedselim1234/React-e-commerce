
import { Container } from 'react-bootstrap'
import CategoryHeader from '../../components/category/CategoryHeader'
import CartContainer from '../../components/Products/CartContainer'
import ProductDetalis from './ProductsDetails'
import RateContainer from '../../components/Rate/RateContainer'

const ProductDetalisPage = () => {
    return (
        <div style={{ minHeight: '670px' }}>
            <CategoryHeader />
            <Container>
                <ProductDetalis />
                <RateContainer />
                <CartContainer title="منتجات قد تعجبك" />
            </Container>
        </div>
    )
}

export default ProductDetalisPage



