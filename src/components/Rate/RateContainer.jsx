
import { useParams } from "react-router-dom";
import rate from "../../images/rate.png";
import Pagination from "../utility/Pagination";
import RateItem from "./RateItem";
import RatePost from "./RatePost";
import { useGetProductReviewsQuery } from "../../redux/features/reviews/reviewSlice";
import { useGetSpeceficProductQuery } from "../../redux/features/product/productSlice.js";

const RateContainer = () => {
  const { id: productId } = useParams();
  
  const { data: product } = useGetSpeceficProductQuery(productId);
  const { data: reviews, isLoading, error } = useGetProductReviewsQuery(productId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-600 font-['Almarai'] text-sm">جاري تحميل التقييمات...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-lg shadow-sm">
        <p className="text-red-800 font-['Almarai'] text-sm">حدث خطأ في تحميل التقييمات</p>
      </div>
    );
  }

  const reviewsData = reviews?.data || [];
  const totalReviews = reviews?.result || 0;
  const avgRating = product?.data?.Averagerating || 0;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
      {/* Header Section */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
        <h2 className="text-gray-800 font-['Almarai'] text-lg md:text-xl font-bold">
          التقييمات
        </h2>
        <img src={rate} alt="rating" className="w-4 h-4 mt-1" />
        <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
          <span className="text-yellow-600 font-['Almarai'] text-sm font-bold">
            {avgRating.toFixed(1)}
          </span>
        </div>
        <span className="text-gray-500 font-['Almarai'] text-xs">
          ({totalReviews} تقييم)
        </span>
      </div>

      {/* Add Review Section */}
      <RatePost productId={productId} />

      {/* Reviews List */}
      <div className="mt-6 space-y-4">
        {reviewsData.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
            </div>
            <p className="text-gray-500 font-['Almarai'] text-sm">لا توجد تقييمات حتى الآن</p>
            <p className="text-gray-400 font-['Almarai'] text-xs mt-1">كن أول من يضيف تقييم</p>
          </div>
        ) : (
          reviewsData.map((review) => (
            <RateItem key={review._id} review={review} productId={productId} />
          ))
        )}
      </div>

      {/* Pagination */}
      {reviews?.paginatetionResult && reviews.paginatetionResult.NumberOfPages > 1 && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Pagination pageCount={reviews.paginatetionResult.NumberOfPages} />
        </div>
      )}
    </div>
  );
};

export default RateContainer;