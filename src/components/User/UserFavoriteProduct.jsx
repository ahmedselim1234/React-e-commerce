
import { Row } from 'react-bootstrap';
import ProductCard from '../Products/ProductCard';
import Pagination1 from '../utility/Pagination';
const UserFavoriteProduct = () => {
    return (
        <div>
            <div className="admin-content-text pb-4">قائمة المفضلة</div>
            <Row className='justify-content-start'>
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
            </Row>
            <Pagination1 />
        </div>
    )
}

export default UserFavoriteProduct
