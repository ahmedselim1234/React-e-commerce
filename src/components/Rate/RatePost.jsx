
import { useState } from "react";
import { useSelector } from "react-redux";
import ReactStars from "react-rating-stars-component";
import { useAddReviewMutation } from "../../redux/features/reviews/reviewSlice";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import ToastServerSError from "../../utils/errorHandler";

const RatePost = ({ productId: product }) => {
  const user = useSelector(selectCurrentUser);
  const [addReview, { isLoading }] = useAddReviewMutation();

  const [formData, setFormData] = useState({
    content: "",
    rating: 0,
    product,
    user: user?.id,
  });

  const [touched, setTouched] = useState({
    rating: false,
    content: false,
  });

  const handleRatingChange = (newRating) => {
    console.log("Rating changed to:", newRating); // 🔍 للتأكد
    setFormData({ ...formData, rating: newRating });
    setTouched({ ...touched, rating: true });
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error("يجب تسجيل الدخول أولاً!", { autoClose: 2000 });
      return;
    }

    if (formData.rating === 0) {
      toast.warning("يرجى اختيار تقييم من النجوم", { autoClose: 2000 });
      setTouched({ ...touched, rating: true });
      return;
    }

    try {
      const reviewPayload = {
        product: formData.product,
        rating: formData.rating,
        user: formData.user,
      };

      if (formData.content.trim()) {
        reviewPayload.content = formData.content.trim();
      }

      await addReview({
        reviewData: reviewPayload,
      }).unwrap();

      setFormData({ content: "", rating: 0, product, user: user?.id });
      setTouched({ rating: false, content: false });
      
      toast.success("تم إضافة التقييم بنجاح!", { autoClose: 2000 });
    } catch (err) {
      console.error(err);
      ToastServerSError(err);
    }
  };

  // 🔥 الحل: تأكد من الإعدادات الصحيحة
  const setting = {
    size: 28,
    count: 5,
    color: "#d1d5db",
    activeColor: "#fbbf24",
    value: formData.rating,
    a11y: true,
    isHalf: false,
    edit: true, // 🔥 مهم جداً
    emptyIcon: <i className="far fa-star" />,
    halfIcon: <i className="fa fa-star-half-alt" />,
    filledIcon: <i className="fa fa-star" />,
    onChange: handleRatingChange, // 🔥 تأكد من الاسم صحيح
  };

  const isSubmitDisabled = 
    isLoading || 
    !user || 
    formData.rating === 0;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 md:p-6 mb-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-['Almarai'] font-bold shadow-lg">
          {user?.name?.[0]?.toUpperCase() || "ض"}
        </div>

        <div className="flex-1">
          <p className="text-gray-800 font-['Almarai'] text-sm font-bold mb-1">
            {user?.name || "ضيف"}
          </p>
          <div className="flex flex-col gap-1">
            {/* 🔥 تأكد من عدم وجود أي wrapper يمنع الـ clicks */}
            <div className="inline-block">
              <ReactStars {...setting} />
            </div>
            
            {touched.rating && formData.rating === 0 && (
              <span className="text-red-500 font-['Almarai'] text-xs flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                يرجى اختيار تقييم
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div className="mb-4">
        <label className="block text-gray-700 font-['Almarai'] text-xs font-medium mb-2">
          التعليق <span className="text-gray-400">(اختياري)</span>
        </label>
        <textarea
          className="w-full px-4 py-3 border border-gray-300 rounded-lg font-['Almarai'] text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none transition-all duration-200"
          rows="3"
          maxLength={500}
          placeholder="شاركنا تجربتك مع هذا المنتج... (اختياري)"
          value={formData.content}
          onChange={(e) => {
            setFormData({ ...formData, content: e.target.value });
            setTouched({ ...touched, content: true });
          }}
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-gray-400 font-['Almarai'] text-xs">
            {formData.content.length} / 500 حرف
          </span>
          {formData.content.trim() && (
            <button
              type="button"
              onClick={() => setFormData({ ...formData, content: "" })}
              className="text-gray-500 hover:text-gray-700 font-['Almarai'] text-xs flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              مسح
            </button>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-3">
        <div className="flex-1 flex items-center gap-2 text-gray-500 font-['Almarai'] text-xs">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          {formData.rating === 0 
            ? "اختر تقييم للمتابعة" 
            : `تقييمك: ${formData.rating} نجوم`}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitDisabled}
          className="px-6 py-2.5 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-['Almarai'] text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>جاري الإضافة...</span>
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span>نشر التقييم</span>
            </>
          )}
        </button>
      </div>

      {!user && (
        <div className="mt-4 bg-blue-50 border-r-4 border-blue-500 p-3 rounded-lg">
          <p className="text-blue-800 font-['Almarai'] text-xs flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            يجب تسجيل الدخول لإضافة تقييم
          </p>
        </div>
      )}
    </div>
  );
};

export default RatePost;