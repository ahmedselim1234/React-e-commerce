import { useSelector } from "react-redux";
import rate from "../../images/rate.png";
import { useDeleteReviewMutation } from "../../redux/features/reviews/reviewSlice";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import ToastServerSError from "../../utils/errorHandler";

const RateItem = ({ review }) => {
  const user = useSelector(selectCurrentUser);
  const [deleteReview, { isLoading }] = useDeleteReviewMutation();

  const handleDelete = async () => {
    try {
      await deleteReview({
        reviewId: review._id,
      }).unwrap();
      toast.success("تم الحذف بنجاح", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (err) {
      ToastServerSError(err);
    }
  };

  const canDelete =
    user && (user.id === review.user?._id);

  return (
    <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200">
      {/* User Info & Rating */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {/* User Avatar */}
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-['Almarai'] font-bold text-sm">
            {review.user?.first_name?.[0]?.toUpperCase() || "م"}
          </div>

          {/* User Name & Rating */}
          <div className="flex flex-col">
            <span className="text-gray-800 font-['Almarai'] text-sm font-bold">
              {review.user?.first_name || "مستخدم"}
            </span>
            <div className="flex items-center gap-1">
              <img src={rate} alt="rating" className="w-3 h-3" />
              <span className="text-yellow-600 font-['Almarai'] text-xs font-bold">
                {review.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Delete Button */}
        {canDelete && (
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-['Almarai'] font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
          >
            {isLoading ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>جاري الحذف...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                <span>حذف</span>
              </>
            )}
          </button>
        )}

      </div>

      {/* Review Content */}
      <div className="mr-12">
        <p className="text-gray-700 font-['Almarai'] text-sm leading-relaxed mb-2">
          {review.content }
        </p>
      </div>
    </div>
  );
};

export default RateItem;
