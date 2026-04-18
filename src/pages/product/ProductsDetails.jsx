

import { Row, Col } from 'react-bootstrap'
import ProductGallery from './ProductGallery'
import ProductText from './ProductText'

import {useGetSpeceficProductQuery} from '../../redux/features/product/productSlice'
import { useParams } from 'react-router-dom'

const ProductDetalis = () => {
    const { id } = useParams();
    // console.log(id)

    const {data}=useGetSpeceficProductQuery(id)
    // console.log(prod)

    const product =data?.data;

    return (
        <div>
            <Row className='py-3'>
                <Col lg="4">
                    <ProductGallery product={product} />
                </Col>

                <Col lg="8">

                       <ProductText product={product}  />
                </Col>
            </Row>
        </div>
    )
}

export default ProductDetalis
