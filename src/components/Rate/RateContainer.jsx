import { useState } from 'react';
import { Star, Trash2, Edit3, Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const StarRating = ({ value, onChange, size = 20 }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map(s => (
      <button
        key={s}
        type="button"
        onClick={() => onChange && onChange(s)}
        className="transition-transform hover:scale-110"
      >
        <Star
          size={size}
          className={s <= value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 fill-gray-100'}
        />
      </button>
    ))}
  </div>
);

export default function ReviewsSection({ product, reviews: initialReviews }) {
  const { user } = useAuth();
  const toast = useToast();

  const [reviews, setReviews] = useState(initialReviews || []);
  const [myRating, setMyRating] = useState(5);
  const [myContent, setMyContent] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [editRating, setEditRating] = useState(5);

  const myReview = reviews.find(r => r.user._id === user?._id);
  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : product?.Averagerating?.toFixed(1) || '0.0';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) { toast.error('يجب تسجيل الدخول أولاً'); return; }
    if (myReview) { toast.info('لديك تقييم بالفعل'); return; }
    const newReview = {
      _id: 'r_' + Date.now(),
      product: product._id,
      user: { _id: user._id, name: user.first_name, profileImage: '' },
      rating: myRating,
      content: myContent,
      createdAt: new Date().toISOString(),
    };
    setReviews(prev => [newReview, ...prev]);
    setMyContent('');
    setMyRating(5);
    toast.success('تم إضافة تقييمك بنجاح!');
  };

  const handleDelete = (id) => {
    setReviews(prev => prev.filter(r => r._id !== id));
    toast.success('تم حذف التقييم');
  };

  const handleEdit = (review) => {
    setEditingId(review._id);
    setEditContent(review.content);
    setEditRating(review.rating);
  };

  const handleSaveEdit = (id) => {
    setReviews(prev => prev.map(r => r._id === id ? { ...r, content: editContent, rating: editRating } : r));
    setEditingId(null);
    toast.success('تم تحديث التقييم');
  };

  const formatDate = (date) => new Date(date).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 mb-8" dir="rtl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100 flex-wrap">
        <h2 className="text-xl font-bold text-gray-900">التقييمات والمراجعات</h2>
        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full border border-amber-100">
          <Star size={18} className="text-yellow-400 fill-yellow-400" />
          <span className="font-black text-gray-900">{avgRating}</span>
          <span className="text-sm text-gray-500">({reviews.length} تقييم)</span>
        </div>
      </div>

      {/* Add Review Form */}
      {user && !myReview && (
        <form onSubmit={handleSubmit} className="mb-8 p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <h3 className="font-semibold text-gray-800 mb-4">أضف تقييمك</h3>
          <div className="mb-3">
            <label className="text-sm text-gray-600 mb-2 block">تقييمك:</label>
            <StarRating value={myRating} onChange={setMyRating} size={24} />
          </div>
          <textarea
            value={myContent}
            onChange={e => setMyContent(e.target.value)}
            placeholder="شارك رأيك في هذا المنتج..."
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white"
          />
          <button type="submit" className="mt-3 flex items-center gap-2 px-5 py-2.5 bg-gradient-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">
            <Send size={16} /> نشر التقييم
          </button>
        </form>
      )}

      {!user && (
        <div className="mb-6 p-4 bg-indigo-50 rounded-2xl text-center border border-indigo-100">
          <p className="text-sm text-indigo-700">سجّل دخولك لإضافة تقييم</p>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-10 text-gray-400">
          <Star size={36} className="mx-auto mb-3 opacity-30" />
          <p>لا توجد تقييمات بعد. كن أول من يقيّم!</p>
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map(review => {
            const isOwner = user?._id === review.user._id;
            const isEditing = editingId === review._id;

            return (
              <div key={review._id} className="p-5 border border-gray-100 rounded-2xl hover:border-gray-200 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {review.user.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{review.user.name}</p>
                      <p className="text-xs text-gray-400">{formatDate(review.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StarRating value={isEditing ? editRating : review.rating} onChange={isEditing ? setEditRating : undefined} size={14} />
                    {isOwner && (
                      <div className="flex gap-1">
                        {!isEditing ? (
                          <>
                            <button onClick={() => handleEdit(review)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><Edit3 size={14} /></button>
                            <button onClick={() => handleDelete(review._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={14} /></button>
                          </>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>

                {isEditing ? (
                  <div className="mt-3">
                    <textarea
                      value={editContent}
                      onChange={e => setEditContent(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => handleSaveEdit(review._id)} className="px-4 py-1.5 bg-primary text-white rounded-lg text-xs font-semibold hover:opacity-90">حفظ</button>
                      <button onClick={() => setEditingId(null)} className="px-4 py-1.5 border border-gray-200 rounded-lg text-xs text-gray-600 hover:bg-gray-50">إلغاء</button>
                    </div>
                  </div>
                ) : (
                  review.content && <p className="mt-3 text-sm text-gray-600 leading-relaxed">{review.content}</p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
