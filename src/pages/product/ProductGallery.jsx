import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { dummyProducts } from "../../data/dummyData";

const ProductGallery = () => {
    const product = dummyProducts[0];
    const images = product?.images?.map(img => ({
        original: img,
        thumbnail: img
    })) || [{ original: 'https://via.placeholder.com/600', thumbnail: 'https://via.placeholder.com/150' }];

    return (
        <div className="bg-white rounded-3xl p-4 border border-gray-50 h-full flex flex-col justify-center items-center">
            <ImageGallery 
                items={images}
                showFullscreenButton={true}
                showPlayButton={false}
                isRTL={true}
                showThumbnails={images.length > 1}
                slideDuration={300}
                showNav={images.length > 1}
            />
        </div>
    )
}

export default ProductGallery;