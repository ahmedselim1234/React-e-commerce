
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
// import mobile from '../../images/mobile.png'
import LeftButton from './LeftButton';
import RightButton from './RightButton';
const ProductGallery = ({product}) => {
    console.log(product)
  const images = [
    {
      original: product?.imageCover 
    },
    ...(product?.availableImages?.map((img) => ({
      original: img,
    })) || []),
  ];
    console.log(images)

    return (
        <div className="product-gallary-card d-flex justfiy-content-center  align-items-center
        pt-2">
            <ImageGallery items={images}
                // defaultImage={}
                showFullscreenButton={false}
                isRTL={true}
                showPlayButton={false}
                showThumbnails={false}
                renderRightNav={RightButton}
                renderLeftNav={LeftButton}
            />
        </div>
    )
}

export default ProductGallery